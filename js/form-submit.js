let availableDates = [];  // масив доступних дат
let availableTimes = {};  // об'єкт для зберігання доступних годин по кожній даті

// Функція для отримання доступних дат
async function fetchAvailableDates() {
  try {
    const response = await fetch("http://localhost:8080/api/bookings/available-dates");
    availableDates = await response.json(); // Наприклад: ["2025-04-25", "2025-04-28"]
    console.log("Available dates from server:", availableDates);
  } catch (err) {
    console.error("Error fetching available dates:", err);
  }
}

// Функція для перевірки доступних годин для конкретної дати
async function fetchAvailableTimes(selectedDate) {
  try {
    const response = await fetch(`http://localhost:8080/api/bookings/check-availability?preferredDate=${selectedDate}`);
    if (response.ok) {
      availableTimes[selectedDate] = await response.json();
      console.log(`Available times for ${selectedDate}:`, availableTimes[selectedDate]);
    } else {
      const errorMessage = await response.text();
      showToast(errorMessage, false);
    }
  } catch (err) {
    console.error("Error checking availability", err);
    showToast("Щось пішло не так. Спробуйте ще раз.", false);
  }
}

// Ініціалізація Flatpickr
flatpickr("#datePicker", {
  async onOpen() {
    await fetchAvailableDates(); // Оновлюємо доступні дати при кожному відкритті календаря
    this.redraw(); // Перемальовуємо календар після оновлення доступних дат
  },
  onDayCreate: function(dObj, dStr, fp, dayElem) {
    const year = dayElem.dateObj.getFullYear();
    const month = String(dayElem.dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dayElem.dateObj.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;

    console.log("Checking date:", date);

    if (availableDates.includes(date)) {
      console.log(`${date} is available.`);
      dayElem.classList.add("available-day");
      dayElem.classList.remove("flatpickr-disabled");
    } else {
      console.log(`${date} is unavailable.`);
      dayElem.classList.add("unavailable-day");
      dayElem.classList.add("flatpickr-disabled");
    }
  },
  minDate: "today", // не можна вибрати минулі дати
});

// Перевірка доступності часу при виборі дати
document.querySelector('input[name="date"]').addEventListener("change", async function () {
  const selectedDate = this.value;
  
  // Перевірка доступності часу для вибраної дати
  await fetchAvailableTimes(selectedDate);

  // Спочатку активуємо і повертаємо нормальний вигляд для обох
  resetTimeOption("time-9");
  resetTimeOption("time-14");

  // Блокуємо і візуально "топимо" ті варіанти, які зайняті
  if (!availableTimes[selectedDate]?.includes("09:00")) {
    disableTimeOption("time-9");
  }
  if (!availableTimes[selectedDate]?.includes("14:00")) {
    disableTimeOption("time-14");
  }

  // Якщо немає доступних годин на вибрану дату
  if (!availableTimes[selectedDate] || availableTimes[selectedDate].length === 0) {
    showToast("Немає доступних годин на цю дату. Будь ласка, оберіть інший день.", false);
  }
});

function disableTimeOption(timeId) {
  document.getElementById(timeId).disabled = true;
  document.getElementById(`${timeId}-container`).classList.add("disabled-time-option");
}

function resetTimeOption(timeId) {
  document.getElementById(timeId).disabled = false;
  document.getElementById(`${timeId}-container`).classList.remove("disabled-time-option");
}

// Функція для налаштування відправки форми
function setupFormSubmission() {
  const form = document.querySelector(".book-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const preferredDate = formData.get("preferred_date");
    const preferredTime = formData.get("preferred_time");

    if (!preferredTime) {
      showToast("❌ Please select a preferred time.");
      return;
    }

    if (availableTimes[preferredDate] && !availableTimes[preferredDate].includes(preferredTime)) {
      showToast("❌ Selected time is not available on this date.");
      return;
    }

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      photosessionTypeId: formData.get("photosession_type"),
      message: formData.get("message"),
    };

    console.log('Form data before submit:', data);

    if (!data.preferredDate || !data.preferredTime || !data.photosessionTypeId) {
      showToast("❌ Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Server error");

      showToast("✅ Booking submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("❌ Failed to submit booking.");
    }
  });
}

// Функція для відображення повідомлень
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

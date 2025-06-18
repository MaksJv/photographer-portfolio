let availableDates = [];  // масив доступних дат
let availableTimes = {};  // об'єкт для зберігання доступних годин по кожній даті

// Функція для отримання доступних дат
async function fetchAvailableDates() {
  try {
    const response = await fetch("http://localhost:8080/api/bookings/available-dates");
    const allDates = await response.json(); // наприклад: ["2025-04-25", "2025-04-28"]
    
    const filteredDates = [];

    for (const date of allDates) {
      const checkResponse = await fetch(`http://localhost:8080/api/bookings/check-availability?preferredDate=${date}`);
      if (checkResponse.ok) {
        // Дата має хоч один доступний час
        filteredDates.push(date);
      } else {
        console.log(`Date ${date} has no available times.`);
      }
    }

    availableDates = filteredDates;
    console.log("Filtered available dates:", availableDates);
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
    await fetchAvailableDates(); // Завантаження та фільтрація дат
    this.redraw(); // Перемальовуємо календар після оновлення
  },

  // Блокуємо всі дні, яких немає в availableDates
  disable: [
    function(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      return !availableDates.includes(formatted); // якщо дати немає — блокуємо
    }
  ],

  minDate: "today", // не дозволяємо вибирати минулі дні
});


// Перевірка доступності часу при виборі дати
document.querySelector('input[name="date"]').addEventListener("change", async function () {
  const selectedDate = this.value;

  // Визначаємо доступні слоти по часу
  const remainingSlots = getRemainingTimeSlots(selectedDate);

  // Якщо всі слоти вже минули
  if (remainingSlots.length === 0) {
    disableTimeOption("time-9");
    disableTimeOption("time-14");
    showToast("Цей день вже недоступний для бронювання.", false);
    return;
  }

  // Завантажуємо наявність з бекенду
  await fetchAvailableTimes(selectedDate);

  // Скидаємо стилі
  resetTimeOption("time-9");
  resetTimeOption("time-14");

  // Перевіряємо кожен слот
  if (!availableTimes[selectedDate]?.includes("09:00") || !remainingSlots.includes("09:00")) {
    disableTimeOption("time-9");
  }
  if (!availableTimes[selectedDate]?.includes("14:00") || !remainingSlots.includes("14:00")) {
    disableTimeOption("time-14");
  }

  // Якщо всі слоти зайняті або пройшли
  if (
    (!availableTimes[selectedDate]?.includes("09:00") && !availableTimes[selectedDate]?.includes("14:00")) ||
    remainingSlots.length === 0
  ) {
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


function getRemainingTimeSlots(dateStr) {
  const now = new Date();
  const selectedDate = new Date(dateStr + "T00:00:00");

  const remainingSlots = [];

  // Якщо дата в майбутньому — обидва слоти доступні
  if (selectedDate.toDateString() > now.toDateString()) {
    return ["09:00", "14:00"];
  }

  // Якщо дата сьогодні
  if (selectedDate.toDateString() === now.toDateString()) {
    if (now.getHours() < 9) remainingSlots.push("09:00");
    if (now.getHours() < 14) remainingSlots.push("14:00");
    return remainingSlots;
  }

  // Інакше (дата в минулому) — жодного слоту
  return [];
}

// Показ повідомлення
function showToast(message, isSuccess = true) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.backgroundColor = isSuccess ? "#4CAF50" : "#e74c3c";
    toast.className = "toast show";
    setTimeout(() => {
      toast.className = toast.className.replace("show", "");
    }, 3000);
  }
  
  // Перевірка доступності часу при виборі дати
  document.querySelector('input[name="date"]').addEventListener("change", async function () {
    const selectedDate = this.value;
  
    try {
      const response = await fetch(`http://localhost:8080/api/bookings/check-availability?preferredDate=${selectedDate}`);
      if (response.ok) {
        const availableTimes = await response.json();
  
        // Спочатку активуємо і повертаємо нормальний вигляд для обох
        resetTimeOption("time-9");
        resetTimeOption("time-14");
  
        // Блокуємо і візуально "топимо" ті варіанти, які зайняті
        if (!availableTimes.includes("09:00")) {
          disableTimeOption("time-9");
        }
        if (!availableTimes.includes("14:00")) {
          disableTimeOption("time-14");
        }
  
        if (availableTimes.length === 0) {
          showToast("Немає доступних годин на цю дату. Будь ласка, оберіть інший день.", false);
        }
      } else {
        const errorMessage = await response.text();
        showToast(errorMessage, false);
      }
    } catch (err) {
      console.error("Error checking availability", err);
      showToast("Щось пішло не так. Спробуйте ще раз.", false);
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
  

  
  // Обробка форми
  document.querySelector(".book-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const preferredTime = document.querySelector('input[name="time"]:checked')?.value;
    if (!preferredTime) {
      showToast("Please select a preferred time.", false);
      return;
    }
  
    const formData = {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      preferredDate: document.querySelector('input[name="date"]').value,
      preferredTime: preferredTime,
      photosessionType: document.querySelector('select[name="photosession_type"]').value,
      message: document.querySelector('textarea[name="message"]').value,
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        showToast("Reservation successfully sent!");
      
        // Очистити всі поля форми
        document.querySelector(".book-form").reset();
      
        // Показати обидва часи знову
        document.getElementById("time-9-container").style.display = "block";
        document.getElementById("time-14-container").style.display = "block";
      
        // Скинути активне вибране значення радіо-кнопки (на всякий випадок)
        document.querySelectorAll('input[name="time"]').forEach(r => r.checked = false);
        
      } else {
        const errorMessage = await response.text();
        showToast(errorMessage, false);
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", false);
    }
  });

let availableDates = [];  // масив доступних дат

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
  // Додатково: встановлюємо мінімальну та максимальну дату, якщо необхідно
  minDate: "today", // не можна вибрати минулі дати
});








  

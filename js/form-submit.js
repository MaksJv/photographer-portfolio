// Виклик для завантаження типів фотосесій
export async function fetchPhotosessionTypes() {
  try {
    const response = await fetch('http://localhost:8080/api/photosession-types');
    const types = await response.json();

    const photosessionSelect = document.getElementById('photosessionType');
    types.forEach(type => {
      const option = document.createElement('option');
      option.value = type.id;
      option.textContent = type.name;
      photosessionSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to load photosession types:', error);
  }
}

// Надсилання форми
function setupFormSubmission() {
  const form = document.querySelector(".book-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // не перезавантажуємо сторінку

    const formData = new FormData(form);

    // Перевірка, чи вибрано час
    const preferredTime = formData.get("preferred_time"); // використовуємо "preferred_time", а не "time"
    if (!preferredTime) {
      showToast("❌ Please select a preferred time.");
      return;
    }

    // Перетворюємо FormData в об’єкт
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      preferredDate: formData.get("preferred_date"),
      preferredTime: preferredTime,  // тепер передається правильне значення
      photosessionTypeId: formData.get("photosession_type"),
      message: formData.get("message"),
    };

    // Логування значень перед відправкою
    console.log('Form data before submit:', data);

    // Перевірка, чи є значення в обов'язкових полях
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






// Показ тост-повідомлення
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Запускаємо все при завантаженні DOM
window.addEventListener("DOMContentLoaded", () => {
  fetchPhotosessionTypes();
  setupFormSubmission();
});

flatpickr("#date", {
  dateFormat: "Y-m-d", // формат для бекенду
  minDate: "today",    // заборона вибору дати в минулому
});

flatpickr("#time", {
  enableTime: true,
  noCalendar: true,
  dateFormat: "H:i",  // час у форматі "години:хвилини"
  time_24hr: true     // використання 24-годинного формату
});

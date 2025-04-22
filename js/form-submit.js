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
        
        // Спочатку активуємо всі варіанти
        document.getElementById("time-9").disabled = false;
        document.getElementById("time-14").disabled = false;
        
        // Блокуємо ті, які зайняті
        if (!availableTimes.includes("09:00")) {
          document.getElementById("time-9").disabled = true;
        }
        if (!availableTimes.includes("14:00")) {
          document.getElementById("time-14").disabled = true;
        }
  
        // Якщо немає доступних годин
        if (availableTimes.length === 0) {
          showToast("No available times on this day. Please choose another day.", false);
        }
      } else {
        const errorMessage = await response.text();
        showToast(errorMessage, false);
      }
    } catch (err) {
      console.error("Error checking availability", err);
      showToast("Something went wrong. Please try again.", false);
    }
  });
  
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
  
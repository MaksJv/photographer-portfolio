document.querySelector(".book-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const formData = {
      name: document.querySelector('input[name="name"]').value,
      email: document.querySelector('input[name="email"]').value,
      preferredDate: document.querySelector('input[name="date"]').value,
      photosessionType: document.querySelector('select[name="photosession_type"]').value,
      message: document.querySelector('textarea[name="message"]').value,
    };
  
    const response = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      alert("Reservation has been successfully sent!");
    } else {
      alert("Error submitting the form.");
    }
  });
  
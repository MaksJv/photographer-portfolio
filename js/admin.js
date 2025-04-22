async function fetchBookings() {
    const response = await fetch("http://localhost:8080/api/bookings");
    const bookings = await response.json();

    const list = document.getElementById("bookingList");
    bookings.forEach(b => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        item.innerHTML = `
            <strong>Ім'я:</strong> ${b.name}<br>
            <strong>Email:</strong> ${b.email}<br>
            <strong>Дата:</strong> ${b.preferredDate}<br>
            <strong>Тип фотосесії:</strong> ${b.photosessionType}<br>
            <strong>Повідомлення:</strong> ${b.message}
        `;
        list.appendChild(item);
    });
}

fetchBookings();

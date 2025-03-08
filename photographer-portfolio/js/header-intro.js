const greetings = [
    { message: 'Fresh Angle on Familiar Things'},
    { message: 'Familiar Angle on Fresh Things'},
    { message: 'Fresh Things on Familiar Angle'},
    { message: 'Angle Things on Familiar Fresh'},
]

function getRandomEl(arr) {
    const randomIdx = Math.floor(Math.random() * arr.length);
    return arr[randomIdx];
}

function updateGreeting() {
    const headerText = document.querySelector('h1');
    const greeting = getRandomEl(greetings);
    headerText.style.color = greeting.color;
    headerText.innerText = greeting.message;
}

updateGreeting();
setInterval(updateGreeting, 3000);
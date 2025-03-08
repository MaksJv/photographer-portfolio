const theses = [
    { message: "Nature's Autonomy: The project explores untouched landscapes, questioning humanity's necessity within nature's realms." },
    { message: "Silent Majesty: Displaying uninhabited mountain peaks, it showcases nature's serene beauty, inviting reflection on human presence." },
    { message: "Eco-Consciousness: Through absence, it prompts contemplation on human impact, urging reconsideration of our ecological contributions." },
    { message: "Global Reflection: The project aims to ignite global conversations, fostering responsibility towards environmental preservation." },
    { message: "Nature's Timelessness: Illustrating nature's perpetual existence, it challenges the perceived significance of human activity within the natural world." }
];

function getRandomEl(arr) {
    const randomIdx = Math.floor(Math.random() * arr.length);
    return arr[randomIdx];
}

function updateTheses() {
    const thesesText = document.querySelector('.flex-text-contact__theses');
    const these = getRandomEl(theses);
    thesesText.innerText = these.message;
}

updateTheses();
setInterval(updateTheses, 3000);
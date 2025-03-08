const btn = document.querySelector(".person__release--btn");
const timer = document.querySelector(".person__release--timer");
timer.hidden = true;

const newDateTime = new Date(2023, 11, 7, 17);
function updateCountdown() {
    const currentTime = new Date();
    const diff = newDateTime - currentTime;
    let d = Math.floor(diff / 1000 / 60 / 60 / 24);
    let h = Math.floor(diff / 1000 / 60 / 60) % 24;
    let m = Math.floor(diff / 1000 / 60) % 60;
    let s = Math.floor(diff / 1000) % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    const count = `${d}d:${h}h:${m}m:${s}s`
    timer.innerHTML = count
}
setInterval(updateCountdown, 1000);

function toggleTimer() {
    if (timer.hidden === true) {
        timer.hidden = false;
        btn.innerHTML = "Hide time left to project release"
    } else {
        timer.hidden = true;
        btn.innerHTML = "Show time left to project release"
    }
}
btn.addEventListener("click", toggleTimer)
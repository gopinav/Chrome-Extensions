const clock = document.querySelector('.clock');
const focusMinutes = 25;
const toggle = document.getElementById('toggle');

const tick = () => {
    const endTime = JSON.parse(localStorage.getItem("endTime"));
    const now = new Date();
    if (endTime && endTime > now.getTime()) {
        // Show the remaining time and show a stop button.
        const deltaSeconds = Math.round((endTime - now.getTime()) / 1000);
        let m = Math.floor(deltaSeconds / 60).toString();
        let s = (deltaSeconds % 60).toString();
        if (m.length === 1) {
            m = "0" + m;
        }
        if (s.length === 1) {
            s = "0" + s;
        }
        clock.innerHTML = `<span>${m}:${s}</span>`;
        toggle.innerHTML = "<i class=\"fas fa-stop fa-lg\"></i>";
    } else {
        // Show the default time and show a start button.
        clock.innerHTML = `<span>${focusMinutes}:00</span>`;
        toggle.innerHTML = "<i class=\"fas fa-play fa-lg \"></i>\n";
    }
};

// Add a listener to the toggle icon and send a message when the website blocker should start.
const port = chrome.extension.connect({name: "Timer"});
toggle.addEventListener('click', e => {
    port.postMessage(e.target.classList.contains("fa-play"))
});

// Refresh the timer in the popup every 100 milliseconds.
setInterval(tick, 100);

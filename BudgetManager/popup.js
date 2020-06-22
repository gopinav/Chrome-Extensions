timer_active = localStorage.getItem("timer_activated")
is_activated = document.getElementById("is_activated")
timer_button = document.querySelector(".start_timer")
// stop_button = document.querySelector(".stop_timer")

if (timer_active) {
    is_activated.textContent = timer_active;
    console.log(is_activated.textContent)
    if (is_activated.textContent == "true") {
        timer_button.value = 'stop'
    }
} else {
    is_activated.textContent = "false"
}

timer_button.addEventListener('click', (e) => {
    timer_active = localStorage.getItem("timer_activated")
    if (timer_active == 'false' || timer_active == null) {
        localStorage.setItem("timer_activated", true)
        is_activated.textContent = true;
        timer_button.value = "stop"
        
    } else if (timer_active == 'true') {
        // already running
        is_activated.textContent = false;
        timer_button.value = "start"
        localStorage.setItem("timer_activated", false)
    } else {
        console.log('something else')
    }
});

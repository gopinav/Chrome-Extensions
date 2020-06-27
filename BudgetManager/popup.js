let timer_active = localStorage.getItem("timer_activated");
let is_activated = document.getElementById("is_activated");
let timer_button = document.querySelector(".start_timer");
// stop_button = document.querySelector(".stop_timer")

if (timer_active) {
    is_activated.textContent = timer_active;
    console.log(is_activated.textContent);
    if (is_activated.textContent == "true") {
        timer_button.value = 'stop'
    }
} else {
    is_activated.textContent = "false"
}

timer_button.addEventListener('click', (e) => {
    timer_active = localStorage.getItem("timer_activated");
    if (timer_active == 'false' || timer_active == null) {
        localStorage.setItem("timer_activated", true);
        is_activated.textContent = true;
        timer_button.value = "stop";
        let now = new Date();
        let n_sec = 10;
        let delta = n_sec * 1000;
        let future_time = now.getTime() + delta;
        localStorage.setItem('end_block_time', future_time)

    } else if (timer_active == 'true') {
        // already running
        is_activated.textContent = false;
        timer_button.value = "start";
        localStorage.setItem("timer_activated", false)
    } else {
        console.log('something else')
    }
});


function deactivate() {
    let deactivation_time = localStorage.getItem('end_block_time');
    let current_date = new Date();
    if (current_date > deactivation_time) {
        console.log("DEACTIVATING");
        is_activated.textContent = false;
        timer_button.value = "start";
        localStorage.setItem("timer_activated", false)
    }

}

window.setInterval(deactivate, 1000)

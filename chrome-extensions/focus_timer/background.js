const filter = {
    urls: [
        '*://twitter.com/*',
        '*://www.twitter.com/*',
        '*://facebook.com/*',
        '*://www.facebook.com/*',
        '*://reddit.com/*',
        '*://www.reddit.com/*',
        '*://9gag.com/*',
        '*://www.9gag.com/*',
        '*://netflix.com/*',
        '*://www.netflix.com/*',
        '*://disneyplus.com/*',
        '*://www.disneyplus.com/*',
        '*://videoland.com/*',
        '*://www.videoland.com/*',
        '*://youtube.com/*',
        '*://www.youtube.com/*',
        '*://tiktok.com/*',
        '*://www.tiktok.com/*',

    ],
};
const options = ['blocking'];

function callbackFunction() {
    return {cancel: true};
}

function setBlocker(seconds) {
    chrome.webRequest.onBeforeRequest.addListener(callbackFunction, filter, options);
    setTimeout(() => {
            if (chrome.webRequest.onBeforeRequest.hasListener(callbackFunction)) {
                chrome.webRequest.onBeforeRequest.removeListener(callbackFunction);
                localStorage.removeItem("endTime");
                alert("Well done! Your focus block has ended.");
            }
        },
        seconds * 1000);
}

const focusMinutes = 25;

// If at start-up there is an end time stored, keep blocking websites until end time has reached.
const now = new Date();
const endTime = JSON.parse(localStorage.getItem("endTime"));
if (endTime && endTime > now.getTime()) {
    const deltaSeconds = Math.round((endTime - now.getTime()) / 1000);
    setBlocker(deltaSeconds);
}

// Add a listener to the port through which we message if the website blocker should be activated.
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        if (message === true) {
            const now = new Date();
            localStorage.setItem('endTime', JSON.stringify(now.getTime() + focusMinutes * 60 * 1000));
            setBlocker(focusMinutes * 60);
        } else {
            localStorage.removeItem("endTime");
            chrome.webRequest.onBeforeRequest.removeListener(callbackFunction);
        }
    });
});
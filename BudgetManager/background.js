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

const opt = ['blocking'];

function blocker(details) {
    let activated = localStorage.getItem("timer_activated");

    if (activated == 'true') {
        return {cancel: true};
    } else {

        return {cancel: false};
    }

}

chrome.webRequest.onBeforeRequest.addListener(
    blocker, filter, opt);

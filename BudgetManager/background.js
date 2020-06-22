const filter = {
    urls: [
        '*://analytics.google.com/*',
        '*://facebook.com/*',
        '*://github.com/',
        '*://github.com/notifications',
        '*://news.ycombinator.com/*',
        '*://twitter.com/*',
        '*://www.facebook.com/*',
        '*://www.reddit.com/*',
        '*://www.twitter.com/*'
    ],
};

const opt = ['blocking'];

function blocker(details){
    let activated = localStorage.getItem("timer_activated");

    if (activated == 'true'){
        return {cancel: true};
    } else {

        return {cancel: false};
    }
    
}

chrome.webRequest.onBeforeRequest.addListener(
    blocker,
    filter,
    ["blocking"]);



// console.log("Loaded extension");

// function blockRequest(details) {
//     return {cancel: true};
//   }

// function get_param(){
//     chrome.storage.sync.get(['is_running'], function(timer){
//         initial = timer.is_running;
//     });
//     return initial;
// }



// function simple(){
//     var initial = false;
//     initial = get_param()
//     chrome.storage.sync.get(['is_running'], function(timer){
//         initial = "hello world";
//         // initial = timer.is_running;
//     });
    
//     // alert(isTrueSet)
//     if (initial){
//         return {cancel: true}
//     }
    
    
// }
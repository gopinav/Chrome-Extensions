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
    ],
};

const opt = ['blocking'];

console.log("Loaded extension");

function blockRequest(details) {
    return {cancel: true};
  }

function get_param(){
    chrome.storage.sync.get(['is_running'], function(timer){
        initial = timer.is_running;
    });
    return initial;
}


function simple(){
    var initial = false;
    initial = get_param()
    chrome.storage.sync.get(['is_running'], function(timer){
        initial = "hello world";
        // initial = timer.is_running;
    });
    
    // alert(isTrueSet)
    if (initial){
        return {cancel: true}
    }
    
    
}

chrome.webRequest.onBeforeRequest.addListener(
    // function(details) {
    //     // var isTrueSet = (myValue == 'true');
    //     // alert(isTrueSet.toString())
    //     alert('hello1')
    //     var value = get_param()
    //     alert(value)
    //     return {cancel: true}; 
    // },
    simple,
    filter,
    ["blocking"]);

// updateFilters(filter);

// chrome.webRequest.onBeforeRequest.addListener(
//     function () {
//         chrome.storage.sync.get(['is_running'], function(timer){
//             activated = timer.is_running;
//             alert("hello there!")
//         });
//         alert(activated.toString())
//         return {
//             cancel: activated,
//         };
//     },
//     filter,
//     opt
// );


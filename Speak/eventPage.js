var menuItem = {
    "id": "Speak",
    "title": "Speak",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "Speak" && clickData.selectionText){        
       chrome.tts.speak(clickData.selectionText,
                        {
                            'rate': 0.7
                        });         
    }
});



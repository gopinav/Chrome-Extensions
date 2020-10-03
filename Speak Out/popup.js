$(function(){


    $("#event-button").click(function(){
        

        chrome.tabs.executeScript( {
            code: "window.getSelection().toString();"
        }, function(selection) {
            var text_select = " " ;
            var msg = new SpeechSynthesisUtterance();
            const voices = speechSynthesis.getVoices();
            const voice_no = 4;
            text_select = (selection[0]);

            console.log(selection[0]);
            
            msg.voice = voices[voice_no];

            msg.volume = 70;    
            msg.rate = 0.9; 
            msg.pitch = 1;  
            msg.text = text_select ;
            msg.lang = 'en';
            speechSynthesis.speak(msg);
            console.log("Speak Out just said");
            text_select = " ";
                   
            }   );        

        });

 });



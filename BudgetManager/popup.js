
$(function(){

    chrome.storage.sync.get(['total','limit','is_running'],function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
        $('#is_running').text(budget.is_running);
    });

    $("#start_timer").click(function(){
        chrome.storage.sync.get(['is_running'],function(timer){
            var is_running = false;
            
            if (timer.is_running){
                alert("already running")
                is_running = true;
            }
            else {
                is_running = true;
            }

            if (is_running){
                alert("Yes i am running now")
            }

            chrome.storage.sync.set({'is_running': is_running}, function(){
                print('hello')
            });
            
            $('#is_running').text(is_running.toString())
            alert(is_running.toString())           
        });
 
        
    });


    $("#stop_timer").click(function(){
        chrome.storage.sync.get(['is_running'],function(timer){
            var focus_time = 25;
            var is_running = false;
            
            if (timer.is_running){
                is_running = false;
            }
            else {
                alert("already stopped")
            }

            chrome.storage.sync.set({'is_running': is_running}, function(){
                print('hello')
            });
            
            $('#is_running').text(is_running.toString())
            alert(is_running.toString())           
        });
 
        
    });


    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){               
                if (amount && newTotal >= budget.limit){
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your alloted limit."
                };
                chrome.notifications.create('limitNotif', notifOptions);

            }
            });
            $('#total').text(newTotal);
            $('#amount').val('');

           

        });
    });
});
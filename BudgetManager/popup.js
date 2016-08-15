$(function(){
    $('#spendAmount').click(function(){
        chrome.storage.sync.get('total',function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amount').val();
            if (amount){
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal});
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});
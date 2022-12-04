$( document ).ready(function() {
    $("#submit_tel").click(
		function(){
			sendCallbackForm('result_form', 'callback_form', 'action_callback_form.php');
			return false; 
		}
	);
}); 
function sendCallbackForm(result_form, callback_form, url) {
    $.ajax({
        url:     "http://index/callback/action_callback_form.php", 
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+callback_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);   
        	 $('#result_form').html('Здравствуйте '+result.name+'<br> '+result.answer);     	
		},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправленны.');
    	}
 	});
}
 
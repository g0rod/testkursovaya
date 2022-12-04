<?php
 if (isset($_POST['name']) && isset($_POST['tel']) ) {
  $name = strip_tags($_POST['name']); 
  $tel = strip_tags($_POST['tel']);  
 }
 if (empty($name)) {
 $result = array('name' => "!",    	
		         'answer' => "Пожалуйста введите свое имя!" ); 
    echo json_encode($result); 
	exit;
}
 if (empty($tel)) {
 $result = array('name' => $name."!" , 
                 'answer' => "Пожалуйста введите свой телефон!" );
      // Переводим массив в JSON		
    echo json_encode($result); 
	exit;
}
 
   
elseif (!empty($tel))//Если телефон введен, отправляем сообщение
{
$to = "goroddan@yandex.ru"; //Укажите ваш адрес электронной почты
$headers = "Content-type: text/plain; charset = utf-8";
$subject = "Заказ обратного звонка на сайте \n";
$message = "Посетитель $name заказал обратный звонок! \n Телефон: " . $tel;
$send = mail ($to, $subject, $message, $headers);
}
if ($send=='true'){
$result = array(	
    	'name' => $name."!",    	
		'answer' => "Ваш телефон .$tel. </br> Мы перезвоним Вам в течении 15 минут!"
    ); 
    // Переводим массив в JSON
    echo json_encode($result); 
	exit;
}	
	
?>




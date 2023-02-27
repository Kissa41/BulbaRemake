<?php
// $to = 'seogrey@gmail.com';

$to = 'nastyagoncharenko5@gmail.com';

// error_log(print_r($_POST, 1));
file_put_contents('send-log-post.txt', print_r($_POST, true), FILE_APPEND);


if (isset($_POST['submit'])) {
  $name = trim($_POST['name']);
  $phone = trim($_POST['phone']);
  $mail = trim($_POST['mail']);
  $message = trim($_POST['message']);

  // error_log(print_r($_POST, 1));
  //file_put_contents('send-log-post.txt', print_r($_POST, true), FILE_APPEND);
  error_log(print_r($_POST, 1));

  $body .= "Имя клиента: " . $name . "\r\n\r\n";
  $body .= "Контактный телефон: " . $phone . "\r\n\r\n";
  $body .= "E-mail: " . $mail . "\r\n\r\n";
  $body .= "Дополнительная информация: " . $message . "\r\n\r\n";

  error_log(print_r($body, 1));

  send_mail($to, $body, $mail);
}

// Вспомогательная функция для отправки почтового сообщения с вложением

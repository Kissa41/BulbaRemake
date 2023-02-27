<?php
ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Содержание полей формы которую отправил посетитель сайта

    $name = trim($_POST['name']);
    $phone = trim($_POST['tel']);
    $email = trim($_POST['mail']);
    $message = trim($_POST['message']);

  //  $mail = new PHPMailer;  // Создаем экземпляр мейлера почты
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    // $mail->SMTPDebug = 1;  // Режим отладки

 try {

    $mail->isSMTP();   // Включаем мейлер в режим SMTP
    $mail->SMTPAuth = true; // Включаем SMTP аутентификацию
    $mail->CharSet = 'utf-8';

    // Настройки вашей почты (взять у провайдера)
    $mail->Host = 'smtp.gmail.com';  // SMTP сервер
    $mail->Username = 'nastyagoncharenko5@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
    $mail->Password = 'gwzvtvemdguzdaee'; // Ваш пароль от почты с которой будут отправляться письма
    $mail->SMTPSecure = 'ssl';  // Протокол шифрования SSL или TLS
    $mail->Port = 465; // TCP порт для подключения

    // Получатель письма
    $mail->setFrom('nastyagoncharenko5@gmail.com'); // От кого будет уходить письмо?
    $mail->addAddress('nastyagoncharenko5@gmail.com'); // Кому будет уходить письмо 

     // Тело письма 

     $body .= "<b>Имя клиента: </b>" . $name . "<br>";
     $body .= "<b>Контактный телефон: </b>" . $phone . "<br>";
     $body .= "<b>E-mail: </b>" . $email . "<br>";
     $body .= "<b>Дополнительная информация: </b>" . $message . "<br>";

    // Само письмо

    $mail->isHTML(true);  // Задаём формат письма (HTML)

    $mail->Subject = 'Заявка с сайта Bulbamedia.by';
    $mail->Body = $body;

    if ($mail->send()) {
        echo 'Письмо отправленно';
    } else {
        echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
    }

 } catch (Exception $e) {
     echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
 }
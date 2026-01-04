<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. НАСТРОЙКИ TELEGRAM
    $token = "8474035997:AAFXjBfnPeVmqAzSseCary8jQvJLdEfeFFk"; 
    $chat_id = "8414329140";

    // 2. ПРОВЕРКА RECAPTCHA
    // Твой Secret Key (не Site Key!). Начинается на 6Lfw...
    $recaptcha_secret = "6LfRYz8sAAAAAIeUSw5gdTituYAhzey3CetNHU43"; 
    $recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    // Запрос к Google API для подтверждения "человечности"
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
    $responseData = json_decode($verify);

    if (!$responseData->success) {
        http_response_code(403);
        echo "Kļūda: Lūdzu, apstipriniet, ka neesat robots (Google noraidīja žetonu).";
        exit;
    }

    // 3. СБОР ДАННЫХ ИЗ ФОРМЫ (с проверкой на существование)
    $name    = isset($_POST['name']) ? strip_tags($_POST['name']) : 'Nav norādīts';
    $phone   = isset($_POST['phone']) ? strip_tags($_POST['phone']) : 'Nav norādīts';
    $email   = isset($_POST['email']) ? strip_tags($_POST['email']) : 'Nav norādīts';
    $service = isset($_POST['service']) ? strip_tags($_POST['service']) : 'Nav norādīts';
    $car     = isset($_POST['car']) ? strip_tags($_POST['car']) : 'Nav norādīts';
    $desc    = isset($_POST['desc']) ? strip_tags($_POST['desc']) : 'Nav norādīts';

    // 4. ТЕКСТ СООБЩЕНИЯ ДЛЯ ТЕЛЕГРАМ
    $caption = "🚀 <b>JAUNS PIETEIKUMS</b>\n\n"
             . "👤 <b>Klients:</b> $name\n"
             . "📞 <b>Tel:</b> $phone\n"
             . "📧 <b>E-pasts:</b> $email\n"
             . "🛠 <b>Pakalpojums:</b> $service\n"
             . "🚗 <b>Auto:</b> $car\n"
             . "📝 <b>Apraksts:</b> $desc";

    $url = "https://api.telegram.org/bot$token/";

    // 5. ОТПРАВКА В TELEGRAM
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
        $url .= "sendPhoto";
        $post_data = [
            'chat_id' => $chat_id,
            'photo'   => new CURLFile($_FILES['photo']['tmp_name']),
            'caption' => $caption,
            'parse_mode' => 'HTML'
        ];
    } else {
        $url .= "sendMessage";
        $post_data = [
            'chat_id' => $chat_id,
            'text'    => $caption,
            'parse_mode' => 'HTML'
        ];
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    echo "Success";
}

?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- ТВОИ ДАННЫЕ ---
    $token = "8474035997:AAFXjBfnPeVmqAzSseCary8jQvJLdEfeFFk";
    $chat_id = "8414329140";
    // -------------------

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $car = $_POST['car'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    $text = "🚗 **Jauns pieteikums!**\n\n";
    $text .= "👤 Vārds: $name\n";
    $text .= "📞 Telefons: $phone\n";
    $text .= "🚘 Auto: $car\n";
    $text .= "🛠 Pakalpojums: $service\n";
    $text .= "📝 Ziņa: $message";

    $url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text=" . urlencode($text);

    $sendResult = file_get_contents($url);

    if ($sendResult) {
        echo "Success";
    } else {
        echo "Error";
    }
}
?>
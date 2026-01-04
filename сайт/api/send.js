export default async function handler(req, res) {
    // Разрешаем только POST запросы
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    // Получаем данные из тела запроса
    const { name, phone, email, service, car, desc, 'g-recaptcha-response': captchaResponse } = req.body;

    // 1. ПРОВЕРКА RECAPTCHA (Secret Key)
    const secretKey = "6LeRwj8sAAAAAHZcpj4C57s6Ow8G7kr0dGP_246Z";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;
    
    try {
        const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success) {
            return res.status(403).send("Kļūda: reCAPTCHA pārbaude neizdevās.");
        }

        // 2. НАСТРОЙКИ TELEGRAM
        const token = "8474035997:AAFXjBfnPeVmqAzSseCary8jQvJLdEfeFFk";
        const chat_id = "8414329140";
        
        const message = `🚀 <b>JAUNS PIETEIKUMS</b>\n\n`
                      + `👤 <b>Klients:</b> ${name || 'Nav'}\n`
                      + `📞 <b>Tel:</b> ${phone || 'Nav'}\n`
                      + `📧 <b>E-pasts:</b> ${email || 'Nav'}\n`
                      + `🛠 <b>Pakalpojums:</b> ${service || 'Nav'}\n`
                      + `🚗 <b>Auto:</b> ${car || 'Nav'}\n`
                      + `📝 <b>Apraksts:</b> ${desc || 'Nav'}`;

        // Отправка сообщения в Telegram
        const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (telegramRes.ok) {
            return res.status(200).send("Success");
        } else {
            return res.status(500).send("Telegram API kļūda");
        }
    } catch (err) {
        return res.status(500).send("Servera kļūda");
    }
}



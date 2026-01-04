export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { name, phone, email, service, car, desc, 'g-recaptcha-response': captchaResponse } = req.body;

    // 1. Проверка капчи через Google
    const secretKey = "6LfRYz8sAAAAAIeUSw5gdTituYAhzey3CetNHU43";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;
    
    const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
        return res.status(403).send("Kļūda: reCAPTCHA pārbaude neizdevās.");
    }

    // 2. Отправка в Telegram
    const token = "8474035997:AAFXjBfnPeVmqAzSseCary8jQvJLdEfeFFk";
    const chat_id = "8414329140";
    
    const message = `🚀 <b>JAUNS PIETEIKUMS</b>\n\n`
                  + `👤 <b>Klients:</b> ${name || 'Nav'}\n`
                  + `📞 <b>Tel:</b> ${phone || 'Nav'}\n`
                  + `📧 <b>E-pasts:</b> ${email || 'Nav'}\n`
                  + `🛠 <b>Pakalpojums:</b> ${service || 'Nav'}\n`
                  + `🚗 <b>Auto:</b> ${car || 'Nav'}\n`
                  + `📝 <b>Apraksts:</b> ${desc || 'Nav'}`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chat_id,
                text: message,
                parse_mode: 'HTML'
            })
        });
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send("Kļūda sūtot uz Telegram");
    }
}
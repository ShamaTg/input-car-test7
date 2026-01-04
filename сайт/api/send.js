export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { name, phone, email, service, car, desc, 'g-recaptcha-response': captchaResponse } = req.body;

    // Секретный ключ из твоей панели (скриншот image_f65502.png)
    const secretKey = "6LdTxD8sAAAAAD3g2AUecJd47clFe993sNMb0pg8";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`;
    
    try {
        const recaptchaRes = await fetch(verifyUrl, { method: 'POST' });
        const recaptchaData = await recaptchaRes.json();

        // Если Google отклоняет токен, это может быть из-за несовпадения ключей
        if (!recaptchaData.success) {
            return res.status(403).send("Kļūda: reCAPTCHA pārbaude neizdevās. Pārliecinieties, ka Site Key un Secret Key saskan.");
        }

        const token = "8474035997:AAFXjBfnPeVmqAzSseCary8jQvJLdEfeFFk";
        const chat_id = "8414329140";
        
        const message = `🚀 <b>JAUNS PIETEIKUMS</b>\n\n`
                      + `👤 <b>Klients:</b> ${name || 'Nav'}\n`
                      + `📞 <b>Tel:</b> ${phone || 'Nav'}\n`
                      + `📧 <b>E-pasts:</b> ${email || 'Nav'}\n`
                      + `🛠 <b>Pakalpojums:</b> ${service || 'Nav'}\n`
                      + `🚗 <b>Auto:</b> ${car || 'Nav'}\n`
                      + `📝 <b>Apraksts:</b> ${desc || 'Nav'}`;

        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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
        return res.status(500).send("Servera kļūda");
    }
}

// Твои данные из скриншота
const TELEGRAM_BOT_TOKEN = '8474035997:AAFXjBfnPeVmqAzSseCary8jQvJLdEfeFFK';
const TELEGRAM_CHAT_ID = '8414329140';

// Функция отправки записи
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const car = document.getElementById('carInput')?.value || "Nav norādīts";

    const message = `🚀 **Jauns pieteikums!**\n👤 Vārds: ${name}\n📞 Tel: ${phone}\n🚗 Auto: ${car}`;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Paldies! Pieteikums saņemts.');
            closeBooking();
            this.reset();
        } else {
            alert('Kļūda nosūtot.');
        }
    })
    .catch(error => alert('Nav savienojuma.'));
});

// Управление окнами
function openBooking() { document.getElementById('modal').style.display = 'block'; }
function closeBooking() { document.getElementById('modal').style.display = 'none'; }

function toggleAI() {
    const el = document.getElementById('ai-chat');
    el.style.display = el.style.display === 'none' ? 'flex' : 'none';
}

function aiSend() {
    const i = document.getElementById('ai-in');
    const b = document.getElementById('ai-messages');
    if(!i.value) return;
    b.innerHTML += `<div><b>Jūs:</b> ${i.value}</div>`;
    i.value = "";
    setTimeout(() => { b.innerHTML += `<div style="color:#00d2ff"><b>AI:</b> Drīz atbildēsim!</div>`; }, 600);
}
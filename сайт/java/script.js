const translations = {
    lv: { hero_sub: "Profesionāls auto detailing un remonts 🛠️", btn_book: "PIETEIKTIES 📅", form_title: "PIETEIKTIES VIZĪTEI", btn_back: "← Atpakaļ", btn_send: "NOSŪTĪT", success_thanks: "NOSŪTĪTS!", success_msg: "Mēs sazināsimies ar Jums drīz." },
    ru: { hero_sub: "Профессиональный детейлинг и ремонт 🛠️", btn_book: "ЗАПИСАТЬСЯ 📅", form_title: "ЗАПИСАТЬСЯ НА ВИЗИТ", btn_back: "← Назад", btn_send: "ОТПРАВИТЬ", success_thanks: "ОТПРАВЛЕНО!", success_msg: "Мы свяжемся с Вами в ближайшее время." }
};

function changeLang(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
    });
}

function openBooking() { document.getElementById('modal-booking').style.display = 'flex'; }

function closeBooking() { 
    document.getElementById('modal-booking').style.display = 'none';
    const form = document.getElementById('bookingForm');
    form.style.filter = "none";
    document.getElementById('successPart').classList.remove('active');
    document.getElementById('progressBar').style.width = "0%";
}

document.getElementById('fileInput').onchange = function() {
    if(this.files[0]) document.getElementById('fileLabel').innerText = "✓ Foto pievienots";
};

document.getElementById('bookingForm').onsubmit = async function(e) {
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
        alert("Lūdzu, apstipriniet, ka neesat robots!");
        return;
    }

    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('bookingForm');
    const successToast = document.getElementById('successPart');
    const progress = document.getElementById('progressBar');

    btn.disabled = true;
    const originalBtnText = btn.innerText;
    btn.innerText = "SŪTA...";

    // Собираем данные в JSON
    const formData = {
        name: document.getElementById('nameInput').value,
        phone: document.getElementById('phoneInput').value,
        email: document.getElementById('emailInput').value,
        service: document.getElementById('serviceInput').value,
        car: document.getElementById('carInput').value,
        desc: document.getElementById('descInput').value,
        'g-recaptcha-response': captchaResponse
    };

    try {
        const response = await fetch('/api/send', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData) 
        });
        
        const result = await response.text();

        if (result === "Success") {
            form.style.filter = "blur(10px)";
            successToast.classList.add('active');
            setTimeout(() => { progress.style.width = "100%"; }, 100);

            setTimeout(() => {
                closeBooking();
                form.reset();
                grecaptcha.reset();
                btn.disabled = false;
                btn.innerText = originalBtnText;
                document.getElementById('fileLabel').innerText = "Pievienot auto foto";
            }, 4000);
        } else {
            alert("Kļūda: " + result);
            btn.disabled = false;
            btn.innerText = originalBtnText;
        }
    } catch (error) {
        alert("Servera kļūda!");
        btn.disabled = false;
        btn.innerText = originalBtnText;
    }
};

function toggleAI() { document.getElementById('aiWindow').classList.toggle('active'); }
function aiSend() {
    const input = document.getElementById('aiInput');
    const body = document.getElementById('aiBody');
    if (input.value) {
        body.innerHTML += `<p style="text-align:right; color:#00d2ff; margin-bottom:10px;">${input.value}</p>`;
        input.value = '';
        setTimeout(() => {
            body.innerHTML += `<p style="background:#222; padding:10px; border-radius:10px; font-size:12px;">Paldies! Mēs drīz atbildēsim.</p>`;
            body.scrollTop = body.scrollHeight;
        }, 800);
    }
}

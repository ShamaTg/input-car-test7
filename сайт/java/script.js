document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const fileInput = document.getElementById('fileInput');
    const fileLabel = document.getElementById('fileLabel');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewImage = document.getElementById('imagePreview');
    const gdprCheckbox = document.getElementById('gdpr');

    // --- 1. ПРЕДПРОСМОТР ФОТО ---
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // Ограничение 5MB для стабильной передачи
            if (file.size > 5 * 1024 * 1024) {
                alert("Fails ir pārāk liels (maks. 5MB)");
                this.value = "";
                return;
            }

            fileLabel.innerHTML = `<i class="fas fa-check"></i> Foto pievienots`;
            fileLabel.style.borderColor = "var(--accent-color)";
            fileLabel.style.color = "var(--accent-color)";

            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    };

    // --- 2. ОТПРАВКА ФОРМЫ ---
    form.onsubmit = async (e) => {
        e.preventDefault();

        // Проверка Google reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert("Lūdzu, apstipriniet, ka neesat robots!");
            return;
        }

        // Проверка GDPR
        if (!gdprCheckbox.checked) {
            alert("Jums ir jāpiekrīt datu apstrādei (GDPR).");
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerText = "SŪTA...";

        const formData = {
            name: document.getElementById('nameInput').value,
            phone: document.getElementById('phoneInput').value,
            email: document.getElementById('emailInput').value,
            service: document.getElementById('serviceInput').value,
            car: document.getElementById('carInput').value,
            desc: document.getElementById('descInput').value,
            photo: previewContainer.style.display === 'block' ? previewImage.src : null,
            'g-recaptcha-response': recaptchaResponse
        };

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Успешная анимация
                form.classList.add('blur-effect');
                const successPart = document.getElementById('successPart');
                successPart.classList.add('active');
                
                const progress = document.getElementById('progressBar');
                progress.style.transition = "width 4s linear";
                progress.style.width = '100%';

                setTimeout(() => {
                    form.reset();
                    form.classList.remove('blur-effect');
                    successPart.classList.remove('active');
                    previewContainer.style.display = 'none';
                    previewImage.src = '';
                    progress.style.width = '0%';
                    fileLabel.innerHTML = `<i class="fas fa-camera"></i> Pievienot auto foto`;
                    fileLabel.style.borderColor = "#444";
                    grecaptcha.reset();
                    closeBooking();
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Nosūtīt pieteikumu";
                }, 4500);

            } else {
                throw new Error("Server error");
            }
        } catch (error) {
            console.error(error);
            alert("Kļūda nosūtot. Mēģiniet vēlreiz vai sazinieties ar mums WhatsApp.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Nosūtīt pieteikumu";
        }
    };
});

// Переключение языков (заглушка)
function changeLang(lang) {
    const msg = lang === 'ru' ? "RU valoda drīz būs pieejama" : "LV valoda jau ir aktīva";
    alert(msg);
}

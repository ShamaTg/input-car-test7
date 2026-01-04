document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const fileInput = document.getElementById('fileInput');
    const fileLabel = document.getElementById('fileLabel');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewImage = document.getElementById('imagePreview');

    // --- 1. ЛОГИКА ПРЕДПРОСМОТРА ФОТО ---
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // Меняем текст на кнопке
            fileLabel.innerHTML = `<i class="fas fa-check"></i> Foto pievienots`;
            fileLabel.style.borderColor = "#00d2ff";
            fileLabel.style.color = "#00d2ff";

            // Показываем превью
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

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerText = "SŪTA...";

        // Собираем данные
        const formData = {
            name: document.getElementById('nameInput').value,
            phone: document.getElementById('phoneInput').value,
            email: document.getElementById('emailInput').value,
            service: document.getElementById('serviceInput').value,
            car: document.getElementById('carInput').value,
            desc: document.getElementById('descInput').value,
            photo: previewImage.src || null, // Отправляем base64 строку
            'g-recaptcha-response': grecaptcha.getResponse()
        };

        if (!formData['g-recaptcha-response']) {
            alert("Lūdzu, apstipriniet, ka neesat robots!");
            submitBtn.disabled = false;
            submitBtn.innerText = "Nosūtīt pieteikumu";
            return;
        }

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Эффекты при успехе
                form.classList.add('blur-effect');
                const successPart = document.getElementById('successPart');
                successPart.classList.add('active');
                
                // Анимация полоски прогресса
                const progress = document.getElementById('progressBar');
                progress.style.width = '100%';

                // Очистка и закрытие через 4 секунды
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('blur-effect');
                    successPart.classList.remove('active');
                    previewContainer.style.display = 'none';
                    previewImage.src = '';
                    fileLabel.innerHTML = `<i class="fas fa-camera"></i> Pievienot auto foto`;
                    fileLabel.style.borderColor = "#444";
                    grecaptcha.reset();
                    closeBooking(); // Закрываем модалку
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Nosūtīt pieteikumu";
                }, 4500);

            } else {
                alert("Kļūda nosūtot. Mēģiniet vēlreiz.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Nosūtīt pieteikumu";
            }
        } catch (error) {
            console.error(error);
            alert("Servera kļūda.");
            submitBtn.disabled = false;
        }
    };
});

// Глобальные функции для кнопок (если не в основном блоке)
function changeLang(lang) {
    if(lang === 'ru') {
        alert("RU valoda drīz būs pieejama");
    } else {
        alert("LV valoda jau ir aktīva");
    }
}

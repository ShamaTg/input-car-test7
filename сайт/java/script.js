<script>
    // Открытие и закрытие модалки
    function openBooking() { document.getElementById('modal-booking').style.display = 'flex'; }
    function closeBooking() { document.getElementById('modal-booking').style.display = 'none'; }
    
    function toggleAI() { 
        const win = document.getElementById('aiWindow');
        win.classList.toggle('active');
    }

    // Обработка фото
    document.getElementById('fileInput').addEventListener('change', function(event) {
        const reader = new FileReader();
        reader.onload = function() {
            const preview = document.getElementById('imagePreview');
            const container = document.getElementById('imagePreviewContainer');
            preview.src = reader.result;
            container.style.display = 'block';
        }
        if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
    });

    // ГЛАВНОЕ: Исправление работы кнопки "Nosūtīt"
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Останавливаем перезагрузку страницы

        // Проверка капчи
        const response = grecaptcha.getResponse();
        if (response.length == 0) {
            alert("Lūdzu, apstipriniet, ka esat cilvēks (reCAPTCHA).");
            return;
        }

        // Эффект успешной отправки
        const form = document.getElementById('bookingForm');
        const success = document.getElementById('successPart');
        const progress = document.getElementById('progressBar');

        form.classList.add('blur-effect');
        success.classList.add('active');

        // Анимация полоски прогресса
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    closeBooking();
                    // Сброс формы для следующего раза
                    form.reset();
                    form.classList.remove('blur-effect');
                    success.classList.remove('active');
                    document.getElementById('imagePreviewContainer').style.display = 'none';
                    grecaptcha.reset();
                }, 1000);
            } else {
                width += 2;
                progress.style.width = width + '%';
            }
        }, 30);
    });

    // Чат AI
    function aiSend() {
        const input = document.getElementById('aiInput');
        const body = document.getElementById('aiBody');
        if (input.value.trim() !== "") {
            body.innerHTML += `<p style="text-align:right; color:var(--accent-color); margin-bottom:10px;">${input.value}</p>`;
            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    }
</script>

<script>
    // Ждем полной загрузки документа, чтобы кнопки стали активными
    document.addEventListener('DOMContentLoaded', function() {
        
        // Открытие и закрытие модалки
        window.openBooking = function() { 
            document.getElementById('modal-booking').style.display = 'flex'; 
        };
        window.closeBooking = function() { 
            document.getElementById('modal-booking').style.display = 'none'; 
        };

        // Обработка фото (исправлено)
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', function(event) {
                const reader = new FileReader();
                reader.onload = function() {
                    const preview = document.getElementById('imagePreview');
                    const container = document.getElementById('imagePreviewContainer');
                    preview.src = reader.result;
                    container.style.display = 'block';
                }
                if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
            });
        }

        // ГЛАВНОЕ: Исправление работы кнопки "Nosūtīt"
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Проверка капчи
                if (typeof grecaptcha !== 'undefined') {
                    const response = grecaptcha.getResponse();
                    if (response.length == 0) {
                        alert("Lūdzu, apstipriniet, ka esat cilvēks (reCAPTCHA).");
                        return;
                    }
                }

                // Эффект успешной отправки
                const success = document.getElementById('successPart');
                const progress = document.getElementById('progressBar');

                bookingForm.classList.add('blur-effect');
                success.classList.add('active');

                let width = 0;
                const interval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            closeBooking();
                            bookingForm.reset();
                            bookingForm.classList.remove('blur-effect');
                            success.classList.remove('active');
                            document.getElementById('imagePreviewContainer').style.display = 'none';
                            if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
                        }, 1000);
                    } else {
                        width += 2;
                        progress.style.width = width + '%';
                    }
                }, 30);
            });
        }
    });

    // Функция AI чата (вне DOMContentLoaded для быстрого доступа)
    function toggleAI() { 
        const win = document.getElementById('aiWindow');
        win.classList.toggle('active');
    }

    function aiSend() {
        const input = document.getElementById('aiInput');
        const body = document.getElementById('aiBody');
        if (input && input.value.trim() !== "") {
            body.innerHTML += `<p style="text-align:right; color:var(--accent-color); margin-bottom:10px;">${input.value}</p>`;
            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    }
</script>

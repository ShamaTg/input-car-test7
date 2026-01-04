<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Input Cars | Detailing & Repair</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Inter:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script src="https://www.google.com/recaptcha/api.js?hl=lv" async defer></script>

    <style>
        :root {
            --main-font: 'Inter', sans-serif;
            --accent-font: 'Orbitron', sans-serif;
            --accent-color: #00d2ff;
            --bg-dark: #050505;
        }

        body { font-family: var(--main-font); background: var(--bg-dark); color: #fff; margin: 0; overflow-x: hidden; }

        /* Навигация */
        .top-nav { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); padding: 15px 0; border-bottom: 1px solid #222; }
        .nav-content { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .brand-logo { font-family: var(--accent-font); color: var(--accent-color); font-size: 1.2rem; }
        .lang-btn { background: #222; border: 1px solid #444; color: #fff; padding: 5px 12px; border-radius: 6px; cursor: pointer; margin-left: 5px; }

        /* Герой-секция с правильным фоном */
        .hero-section {
            padding: 140px 20px 80px;
            text-align: center;
            /* Исправлено: путь к bg.jpg в папке Img */
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('Img/bg.jpg');
            background-size: cover;
            background-position: center;
            border-bottom: 2px solid var(--accent-color);
        }

        .main-title { font-family: var(--accent-font); font-size: clamp(2.5rem, 10vw, 4rem); margin: 0; color: #fff; }
        .btn-book-main {
            font-family: var(--accent-font); padding: 20px 50px; background: var(--accent-color);
            border: none; color: #000; border-radius: 50px; cursor: pointer; margin-top: 30px;
            font-weight: 900; transition: 0.3s; box-shadow: 0 0 20px rgba(0,210,255,0.4);
        }

        /* Инфо-блоки */
        .info-block { max-width: 1100px; margin: 50px auto; padding: 0 20px; }
        .working-hours { background: #0a0a0a; border: 1px solid #222; padding: 30px; border-radius: 20px; text-align: center; }
        .sec-title { font-family: var(--accent-font); text-align: center; color: var(--accent-color); margin-bottom: 40px; }

        .why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .why-card { background: #0f0f0f; padding: 30px; border-radius: 15px; border-left: 4px solid var(--accent-color); }
        .why-card i { font-size: 30px; color: var(--accent-color); margin-bottom: 15px; display: block; }

        /* Портфолио - исправлены пути Img/1.jpg и т.д. */
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .port-item { height: 250px; border-radius: 15px; overflow: hidden; border: 1px solid #222; }
        .port-item img { width: 100%; height: 100%; object-fit: cover; }

        /* Модалка */
        .modal { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:2000; display:none; align-items:center; justify-content:center; }
        .modal-box { width:90%; max-width:450px; background:#0a0a0a; padding:30px; border-radius:20px; border:1px solid #333; position:relative; }
        .form-input { width:100%; padding:14px; background:#111; border:1px solid #333; color:#fff; margin-bottom:15px; border-radius:12px; box-sizing:border-box; }
        
        #imagePreviewContainer { display:none; width:100%; margin-bottom:15px; border-radius:10px; overflow:hidden; border:1px solid var(--accent-color); }
        #imagePreview { width:100%; display:block; }

        /* AI Чат */
        .ai-widget { position: fixed; bottom: 20px; right: 20px; z-index: 1001; }
        .ai-btn { width: 60px; height: 60px; background: var(--accent-color); border-radius: 50%; border: none; font-size: 24px; cursor: pointer; }
        .ai-window { position: absolute; bottom: 80px; right: 0; width: 300px; height: 400px; background: #111; border: 1px solid #333; border-radius: 20px; display: none; flex-direction: column; overflow: hidden; }
    </style>
</head>
<body>

    <nav class="top-nav">
        <div class="nav-content">
            <div class="brand-logo">INPUT CARS</div>
            <div>
                <button class="lang-btn">LV</button>
                <button class="lang-btn">RU</button>
            </div>
        </div>
    </nav>

    <header class="hero-section">
        <h1 class="main-title">INPUT CARS</h1>
        <p style="letter-spacing: 3px; color: #888;">DETAILING & REPAIR</p>
        <button class="btn-book-main" onclick="openModal()">PIETEIKTIES</button>
    </header>

    <section class="info-block">
        <div class="working-hours">
            <h3 style="font-family: var(--accent-font); color: var(--accent-color);">🕒 DARBA LAIKS</h3>
            <p>P-Pk: 09:00 - 18:00 | S: 10:00 - 15:00</p>
            <p>Svētdiena: <span style="color: #ff4444;">Slēgts</span></p>
        </div>
    </section>

    <section class="info-block">
        <h2 class="sec-title">KĀPĒC IZVĖLĖTIES MŪS</h2>
        <div class="why-grid">
            <div class="why-card">
                <i class="fas fa-gem"></i>
                <h3 style="font-family: var(--accent-font); font-size: 14px;">BEZKOMPROMISU KVALITĀTE</h3>
                <p style="font-size: 13px; color: #ccc;">Mēs neatzīstam pusdarbu. Katrs automobilis iziet cauri stingrai kontrolei.</p>
            </div>
            <div class="why-card">
                <i class="fas fa-user-tie"></i>
                <h3 style="font-family: var(--accent-font); font-size: 14px;">PROFESIONĀLA PIEREDZE</h3>
                <p style="font-size: 13px; color: #ccc;">Mūsu meistari ir savas jomas fanātiķi ar gadu pieredzi.</p>
            </div>
        </div>
    </section>

    <section class="info-block">
        <h2 class="sec-title">MŪSU DARBI</h2>
        <div class="portfolio-grid">
            <div class="port-item"><img src="Img/1.jpg" alt="Detailing"></div>
            <div class="port-item"><img src="Img/2.jpg" alt="Repair"></div>
            <div class="port-item"><img src="Img/3.jpg" alt="Polishing"></div>
            <div class="port-item"><img src="Img/4.jpg" alt="Ceramic"></div>
        </div>
    </section>

    <div id="bookingModal" class="modal">
        <div class="modal-box">
            <button onclick="closeModal()" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#fff; font-size:24px; cursor:pointer;">&times;</button>
            <h2 style="font-family: var(--accent-font); color: var(--accent-color); text-align:center;">PIETEIKUMS</h2>
            
            <form id="mainForm">
                <input type="text" placeholder="Vārds un Uzvārds" class="form-input" required>
                <input type="tel" value="+371" class="form-input" required>
                <input type="text" placeholder="Auto modelis" class="form-input" required>
                
                <div id="imagePreviewContainer"><img id="imagePreview" src=""></div>
                
                <label style="display:block; padding:15px; border:1px dashed #444; border-radius:12px; text-align:center; cursor:pointer; margin-bottom:15px; font-size:13px; color:#888;">
                    <i class="fas fa-camera"></i> Pievienot auto foto
                    <input type="file" accept="image/*" style="display:none;" onchange="handleImage(event)">
                </label>

                <div class="g-recaptcha" data-sitekey="6LdTxD8sAAAAAD1yxCkgdOlLb0dRvvq3xspdW_8W" data-theme="dark" style="margin-bottom:15px; transform:scale(0.85); transform-origin:0 0;"></div>

                <label style="display:flex; align-items:flex-start; gap:10px; font-size:11px; color:#888; margin-bottom:20px;">
                    <input type="checkbox" required style="margin-top:3px;">
                    <span>Es piekrītu personas datu apstrādei saskaņā ar GDPR.</span>
                </label>

                <button type="submit" style="width:100%; padding:16px; background:var(--accent-color); border:none; border-radius:12px; font-weight:bold; cursor:pointer;">NOSŪTĪT</button>
            </form>
        </div>
    </div>

    <div class="ai-widget">
        <button class="ai-btn" onclick="toggleAI()"><i class="fas fa-robot"></i></button>
        <div class="ai-window" id="aiWindow">
            <div style="background:#222; padding:15px; font-size:12px; text-align:center; font-family:var(--accent-font);">AI ASSISTANT</div>
            <div id="aiBody" style="flex:1; padding:15px; overflow-y:auto; font-size:13px; display:flex; flex-direction:column; gap:10px;">
                <span style="background:#333; padding:10px; border-radius:10px; align-self:flex-start;">Sveiki! Kā es varu palīdzēt?</span>
            </div>
            <div style="padding:10px; background:#000; display:flex; gap:5px;">
                <input type="text" id="aiInput" style="flex:1; background:#222; border:none; color:#fff; padding:10px; border-radius:10px; outline:none;">
                <button onclick="aiSend()" style="background:var(--accent-color); border:none; border-radius:10px; padding:0 15px;"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    </div>

    <script>
        function openModal() { document.getElementById('bookingModal').style.display = 'flex'; }
        function closeModal() { document.getElementById('bookingModal').style.display = 'none'; }
        function toggleAI() { 
            const win = document.getElementById('aiWindow');
            win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
        }

        // Предпросмотр фото
        function handleImage(event) {
            const reader = new FileReader();
            reader.onload = function() {
                const preview = document.getElementById('imagePreview');
                preview.src = reader.result;
                document.getElementById('imagePreviewContainer').style.display = 'block';
            }
            reader.readAsDataURL(event.target.files[0]);
        }

        // Отправка формы (заглушка)
        document.getElementById('mainForm').onsubmit = function(e) {
            e.preventDefault();
            alert('Paldies! Pieteikums saņemts.');
            closeModal();
        };

        // Чат
        function aiSend() {
            const input = document.getElementById('aiInput');
            const body = document.getElementById('aiBody');
            if(input.value.trim()){
                body.innerHTML += `<span style="background:var(--accent-color); color:#000; padding:10px; border-radius:10px; align-self:flex-end;">${input.value}</span>`;
                const msg = input.value;
                input.value = '';
                setTimeout(() => {
                    body.innerHTML += `<span style="background:#333; padding:10px; border-radius:10px; align-self:flex-start;">Mēs saņēmām jūsu jautājumu par: "${msg}". Mūsu darbinieks drīz atbildēs!</span>`;
                    body.scrollTop = body.scrollHeight;
                }, 1000);
            }
        }
    </script>
</body>
</html>

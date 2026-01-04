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

        /* HEADER */
        .top-nav { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); padding: 15px 0; border-bottom: 1px solid #222; }
        .nav-content { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .hero-section {
            padding: 120px 20px 60px;
            text-align: center;
            background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('img/hero-bg.jpg') center/cover;
            border-bottom: 2px solid var(--accent-color);
        }

        .main-title {
            font-family: var(--accent-font);
            font-size: clamp(2rem, 8vw, 3.5rem);
            margin: 15px 0;
            background: linear-gradient(to right, #fff, var(--accent-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .btn-book-main {
            font-family: var(--accent-font);
            padding: 18px 45px;
            background: linear-gradient(45deg, #0088ff, var(--accent-color));
            border: none; color: white; border-radius: 50px;
            cursor: pointer; text-transform: uppercase; letter-spacing: 2px;
            transition: 0.4s; box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
        }

        /* GRID FIXES */
        .info-block { max-width: 1100px; margin: 40px auto; padding: 0 20px; box-sizing: border-box; }
        .why-grid-new {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        .why-card {
            background: rgba(255,255,255,0.03);
            padding: 25px; border-radius: 15px;
            border-left: 3px solid var(--accent-color);
        }

        /* PORTFOLIO */
        .portfolio-grid-premium {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 15px;
        }
        .port-item { position: relative; border-radius: 15px; overflow: hidden; height: 200px; border: 1px solid #222; }
        .port-item img { width: 100%; height: 100%; object-fit: cover; }

        /* MODAL & FORMS */
        .full-screen-modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95); z-index: 2000;
            display: none; align-items: center; justify-content: center;
        }
        .modal-box {
            width: 90%; max-width: 450px; background: #0a0a0a; padding: 30px;
            border-radius: 20px; border: 1px solid #222; position: relative;
            max-height: 90vh; overflow-y: auto;
        }
        .form-input {
            width: 100%; padding: 14px; background: #000; border: 1px solid #333;
            color: #fff; margin-bottom: 12px; border-radius: 12px; outline: none; box-sizing: border-box;
        }

        /* IMAGE PREVIEW */
        #imagePreviewContainer { display: none; margin-bottom: 15px; border-radius: 10px; overflow: hidden; border: 1px solid var(--accent-color); }
        #imagePreview { width: 100%; display: block; }

        /* SUCCESS ANIMATION */
        .success-toast {
            display: none; text-align: center; padding: 20px;
            border: 2px solid var(--accent-color); border-radius: 15px; background: #000;
        }
        .progress-bar-wrap { width: 100%; height: 4px; background: #222; margin-top: 15px; border-radius: 2px; }
        #progressBar { width: 0%; height: 100%; background: var(--accent-color); transition: 0.1s; }

        /* AI WIDGET */
        .ai-chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 3000; }
        .ai-btn { width: 60px; height: 60px; background: var(--accent-color); border-radius: 50%; border: none; cursor: pointer; font-size: 24px; box-shadow: 0 0 15px var(--accent-color); }
        .ai-window { 
            position: absolute; bottom: 75px; right: 0; width: 300px; height: 400px; 
            background: #111; border: 1px solid #333; border-radius: 20px; 
            display: none; flex-direction: column; overflow: hidden;
        }
        .ai-window.active { display: flex; }
    </style>
</head>
<body>

    <nav class="top-nav">
        <div class="nav-content">
            <div class="brand-logo" style="font-family: var(--accent-font);">INPUT CARS</div>
            <div class="lang-selector">
                <button style="background:none; border:1px solid #333; color:#fff; cursor:pointer;">LV</button>
            </div>
        </div>
    </nav>

    <header class="hero-section">
        <img src="logo.png" alt="Logo" style="width: 100px; margin-bottom: 10px;">
        <h1 class="main-title">INPUT CARS</h1>
        <button class="btn-book-main" onclick="openBooking()">PIETEIKTIES</button>
    </header>

    <section class="info-block">
        <h2 style="font-family: var(--accent-font); color: var(--accent-color); text-align:center;">KĀPĒC MŪS?</h2>
        <div class="why-grid-new">
            <div class="why-card">
                <i class="fas fa-shield-halved"></i>
                <h3>GARANTIJA</h3>
                <p>Mēs uzņemamies pilnu atbildību par darbu.</p>
            </div>
            <div class="why-card">
                <i class="fas fa-gem"></i>
                <h3>KVALITĀTE</h3>
                <p>Izmantojam tikai premium klases līdzekļus.</p>
            </div>
        </div>
    </section>

    <section class="info-block">
        <div class="portfolio-grid-premium">
            <div class="port-item"><img src="img/1.jpg"></div>
            <div class="port-item"><img src="img/2.jpg"></div>
        </div>
    </section>

    <div class="ai-chat-widget">
        <button class="ai-btn" onclick="toggleAI()"><i class="fas fa-robot"></i></button>
        <div class="ai-window" id="aiWindow">
            <div style="background:#222; padding:15px; font-size:12px; text-align:center;">AI ASISTENTS</div>
            <div id="aiBody" style="flex:1; padding:15px; overflow-y:auto; font-size:13px;">
                <p style="background:#222; padding:10px; border-radius:10px;">Sveiki! Kā varu palīdzēt?</p>
            </div>
            <div style="display:flex; padding:10px; background:#000;">
                <input type="text" id="aiInput" style="flex:1; background:#222; border:none; color:#fff; padding:10px; border-radius:10px; outline:none;">
                <button onclick="aiSend()" style="background:none; border:none; color:var(--accent-color); padding:0 10px; cursor:pointer;"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    </div>

    <div id="modal-booking" class="full-screen-modal">
        <div class="modal-box">
            <button onclick="closeBooking()" style="position:absolute; top:15px; right:15px; background:none; border:none; color:#fff; font-size:24px; cursor:pointer;">&times;</button>
            
            <form id="bookingForm">
                <h2 style="font-family: var(--accent-font); color: var(--accent-color); font-size:16px; text-align:center; margin-bottom:20px;">PIETEIKUMS</h2>
                
                <input type="text" placeholder="Vārds" class="form-input" required>
                <input type="tel" value="+371" class="form-input" required>
                <input type="text" placeholder="Auto modelis" class="form-input" required>

                <div id="imagePreviewContainer"><img id="imagePreview" src=""></div>
                
                <label style="display:block; padding:15px; border:1px dashed #444; border-radius:12px; text-align:center; cursor:pointer; margin-bottom:15px;">
                    <i class="fas fa-camera"></i> Pievienot foto
                    <input type="file" accept="image/*" style="display:none;" onchange="previewFile(event)">
                </label>

                <div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_KEY" data-theme="dark" style="margin-bottom:15px; transform:scale(0.8); transform-origin:0 0;"></div>

                <button type="submit" style="width:100%; padding:16px; background:var(--accent-color); border:none; border-radius:12px; font-weight:bold; cursor:pointer;">NOSŪTĪT</button>
            </form>

            <div id="successBlock" class="success-toast">
                <h3 style="color:var(--accent-color);">SAŅEMTS!</h3>
                <p>Mēs drīz sazināsimies.</p>
                <div class="progress-bar-wrap"><div id="progressBar"></div></div>
            </div>
        </div>
    </div>

    <script>
        function openBooking() { document.getElementById('modal-booking').style.display = 'flex'; }
        function closeBooking() { document.getElementById('modal-booking').style.display = 'none'; }
        function toggleAI() { document.getElementById('aiWindow').classList.toggle('active'); }

        // ВОССТАНОВЛЕННЫЙ ПРЕДПРОСМОТР ФОТО
        function previewFile(event) {
            const reader = new FileReader();
            reader.onload = function() {
                const output = document.getElementById('imagePreview');
                output.src = reader.result;
                document.getElementById('imagePreviewContainer').style.display = 'block';
            };
            reader.readAsDataURL(event.target.files[0]);
        }

        // ВОССТАНОВЛЕННАЯ ЛОГИКА ОТПРАВКИ И PROGRESS BAR
        document.getElementById('bookingForm').onsubmit = function(e) {
            e.preventDefault();
            this.style.display = 'none';
            const success = document.getElementById('successBlock');
            const progress = document.getElementById('progressBar');
            success.style.display = 'block';

            let width = 0;
            const timer = setInterval(() => {
                if (width >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        closeBooking();
                        this.reset();
                        this.style.display = 'block';
                        success.style.display = 'none';
                        document.getElementById('imagePreviewContainer').style.display = 'none';
                    }, 500);
                } else {
                    width++;
                    progress.style.width = width + '%';
                }
            }, 30);
        };

        function aiSend() {
            const input = document.getElementById('aiInput');
            const body = document.getElementById('aiBody');
            if(input.value.trim() !== "") {
                body.innerHTML += `<p style="text-align:right; color:var(--accent-color);">${input.value}</p>`;
                input.value = "";
                setTimeout(() => {
                    body.innerHTML += `<p style="background:#222; padding:10px; border-radius:10px;">Paldies! Mēs apstrādājam jūsu jautājumu.</p>`;
                    body.scrollTop = body.scrollHeight;
                }, 1000);
            }
        }
    </script>
</body>
</html>

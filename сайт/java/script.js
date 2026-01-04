<script>
    function openModal() { document.getElementById('bookingModal').style.display = 'flex'; }
    function closeModal() { document.getElementById('bookingModal').style.display = 'none'; }
    
    function toggleAI() { 
        const win = document.getElementById('aiWindow');
        win.style.display = (win.style.display === 'flex') ? 'none' : 'flex';
    }

    function handleImage(event) {
        const reader = new FileReader();
        reader.onload = function() {
            const preview = document.getElementById('imagePreview');
            const container = document.getElementById('imagePreviewContainer');
            preview.src = reader.result;
            container.style.display = 'block';
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    function aiSend() {
        const input = document.getElementById('aiInput');
        const body = document.getElementById('aiBody');
        if (input.value.trim() !== "") {
            body.innerHTML += `<span style="background:var(--accent-color); color:#000; padding:10px; border-radius:10px; align-self:flex-end;">${input.value}</span>`;
            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    }
</script>

// Function Switch Page / Tab Halaman dengan Animasi Intro Splash Screen
function switchPage(pageId, type) {
    const loader = document.getElementById('intro-loader');
    const loaderLaundry = document.getElementById('loader-laundry-content');
    const loaderCafe = document.getElementById('loader-cafe-content');
    const currentBtn = event ? event.currentTarget : null;

    // Tampilkan Animasi Intro Loader sesuai jenis tab
    loader.classList.remove('hidden');
    loader.style.opacity = '1';

    if (type === 'laundry') {
        loaderLaundry.classList.remove('hidden');
        loaderCafe.classList.add('hidden');
    } else {
        loaderCafe.classList.remove('hidden');
        loaderLaundry.classList.add('hidden');
    }

    // Tunda 1 detik untuk animasi intro, lalu pindah tab
    setTimeout(() => {
        const pages = document.querySelectorAll('.page-tab-content');
        const tabBtns = document.querySelectorAll('.tab-btn');

        pages.forEach(page => page.classList.remove('active-tab-page'));
        tabBtns.forEach(btn => btn.classList.remove('active'));

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active-tab-page');
        }

        if (currentBtn) {
            currentBtn.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Sembunyikan Intro Loader
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }, 1000);
}

// Data Harga Laundry
const laundryData = {
    wash: {
        '7kg': { quickPrice: 'Rp 8.000', quickTime: '20 Mnt', deepPrice: 'Rp 12.000', deepTime: '35 Mnt' },
        '12kg': { quickPrice: 'Rp 10.000', quickTime: '30 Mnt', deepPrice: 'Rp 15.000', deepTime: '45 Mnt' },
        '18kg': { quickPrice: 'Rp 15.000', quickTime: '40 Mnt', deepPrice: 'Rp 20.000', deepTime: '55 Mnt' }
    },
    dry: {
        '7kg': { normalPrice: 'Rp 10.000', normalTime: '12 Mnt', extraPrice: 'Rp 12.000', extraTime: '18 Mnt' },
        '12kg': { normalPrice: 'Rp 12.000', normalTime: '18 Mnt', extraPrice: 'Rp 15.000', extraTime: '25 Mnt' },
        '18kg': { normalPrice: 'Rp 16.000', normalTime: '20 Mnt', extraPrice: 'Rp 20.000', extraTime: '30 Mnt' }
    },
    iron: {
        '7kg': 'Rp 5.000',
        '12kg': 'Rp 8.000',
        '18kg': 'Rp 12.000'
    }
};

function updateWash(weight) {
    const data = laundryData.wash[weight];
    document.getElementById('wash-quick-price').innerText = data.quickPrice;
    document.getElementById('wash-quick-time').innerHTML = `<i class="fa-regular fa-clock"></i> ${data.quickTime}`;
    document.getElementById('wash-deep-price').innerText = data.deepPrice;
    document.getElementById('wash-deep-time').innerHTML = `<i class="fa-regular fa-clock"></i> ${data.deepTime}`;
    toggleActiveBtn(event);
}

function updateDry(weight) {
    const data = laundryData.dry[weight];
    document.getElementById('dry-normal-price').innerText = data.normalPrice;
    document.getElementById('dry-normal-time').innerHTML = `<i class="fa-regular fa-clock"></i> ${data.normalTime}`;
    document.getElementById('dry-extra-price').innerText = data.extraPrice;
    document.getElementById('dry-extra-time').innerHTML = `<i class="fa-regular fa-clock"></i> ${data.extraTime}`;
    toggleActiveBtn(event);
}

function updateIron(weight) {
    document.getElementById('iron-price').innerText = laundryData.iron[weight];
    toggleActiveBtn(event);
}

function toggleActiveBtn(e) {
    const buttons = e.target.parentElement.querySelectorAll('.w-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
}

// Slider Controls
const slider = document.getElementById('cardsSlider');
if (slider) {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    if (nextBtn) nextBtn.addEventListener('click', () => slider.scrollBy({ left: 290, behavior: 'smooth' }));
    if (prevBtn) prevBtn.addEventListener('click', () => slider.scrollBy({ left: -290, behavior: 'smooth' }));
}

// Sistem Modal Pembayaran QRIS & Barcode Interaktif
const iotForm = document.getElementById('iot-booking-form');
if (iotForm) {
    iotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('cust-name-input').value;
        const service = document.getElementById('service-select-input').value;
        
        document.getElementById('summary-cust-name').innerText = name;
        document.getElementById('summary-service').innerText = service;
        
        // Buka Modal QRIS
        document.getElementById('qris-modal').classList.remove('hidden');
    });
}

function closeQrisModal() {
    document.getElementById('qris-modal').classList.add('hidden');
}

function confirmPaymentAndShowBarcode() {
    closeQrisModal();
    
    // Generate Random Barcode Code
    const randomCode = 'CW-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('generated-barcode-text').innerText = randomCode;
    
    // Tampilkan Modal Terverifikasi Barcode
    document.getElementById('barcode-modal').classList.remove('hidden');
}

function closeBarcodeModal() {
    document.getElementById('barcode-modal').classList.add('hidden');
}

// Live Track Countdown Timer
let timerInterval;
function startLiveTrack() {
    const code = document.getElementById('track-input-code').value.trim();
    if(!code) return alert("Silakan masukkan Kode Barcode terlebih dahulu!");
    
    document.getElementById('timer-active-card').classList.remove('hidden');
    let totalSeconds = 20 * 60;
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        document.getElementById('countdown-clock').innerText = 
            `${mins < 10 ? '0'+mins : mins}:${secs < 10 ? '0'+secs : secs}`;
        if(totalSeconds <= 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown-clock').innerText = "SELESAI!";
        } else {
            totalSeconds--;
        }
    }, 1000);
}

// Sembunyikan Loader Otomatis Saat Web Selesai Dimuat
window.addEventListener('load', () => {
    const loader = document.getElementById('intro-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.classList.add('hidden'), 500);
        }, 600);
    }
});
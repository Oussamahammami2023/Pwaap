function showGroup(group, tabElement) {
    // إخفاء جميع المجموعات
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => container.classList.remove('active'));

    // إظهار المجموعة المحددة
    const activeContainer = document.getElementById(group);
    if (activeContainer) activeContainer.classList.add('active');

    // تحديث التبويبات النشطة
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active')); // إزالة النشطة من جميع التبويبات
    tabElement.classList.add('active'); // إضافة النشطة للتبويبة المناسبة
}

let currentSlide = 0;
const slides = document.querySelectorAll('.review-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // التمرير كل 3 ثواني

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('ServiceWorker registered with scope:', registration.scope);
        }, function(error) {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// دالة لتحويل الصفحة إلى وضع ملء الشاشة
function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

// استدعاء الدالة بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    openFullscreen();
});

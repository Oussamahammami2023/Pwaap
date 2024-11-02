   function showGroup(group, tabElement) {
        // إخفاء جميع المجموعات
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.classList.remove('active');
        });

        // إظهار المجموعة المحددة
        const activeContainer = document.getElementById(group);
        activeContainer.classList.add('active');

        // تحديث التبويبات النشطة
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.classList.remove('active'); // إزالة النشطة من جميع التبويبات
        });

        // تعيين التبويبة النشطة بناءً على المجموعة المفتوحة
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

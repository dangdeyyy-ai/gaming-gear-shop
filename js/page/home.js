const bannerImages = [
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?q=80&w=1200&auto=format&fit=crop",
];

let currentSlideIndex = 0;

function updateSlider() {
    const sliderImg = document.getElementById("slider-img");
    if (sliderImg) {
        sliderImg.src = bannerImages[currentSlideIndex];
    }
}

function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex >= bannerImages.length) {
        currentSlideIndex = 0;
    }
    updateSlider();
}

function prevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = bannerImages.length - 1;
    }
    updateSlider();
}

setInterval(nextSlide, 4000);

updateSlider();

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("product-list");
    const btnPrev = document.getElementById("slide-prev");
    const btnNext = document.getElementById("slide-next");

    let currentTranslate = 0;
    const scrollAmount = 300;

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            const trackWidth = track.scrollWidth;
            const containerWidth = track.parentElement.clientWidth;

            if (Math.abs(currentTranslate) < trackWidth - containerWidth) {
                currentTranslate -= scrollAmount;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (currentTranslate < 0) {
                currentTranslate += scrollAmount;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        });
    }
});

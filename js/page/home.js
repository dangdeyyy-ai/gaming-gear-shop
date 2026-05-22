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

    if (!track) return;

    let currentProductIndex = 0;
    const scrollAmount = 384;

    function updateProductSlider() {
        track.style.transform = `translateX(-${currentProductIndex * scrollAmount}px)`;
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            const totalItems = track.querySelectorAll(".col").length;
            const maxIndex = totalItems - 3;

            currentProductIndex++;
            if (currentProductIndex > (maxIndex > 0 ? maxIndex : 0)) {
                currentProductIndex = 0;
            }
            updateProductSlider();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            const totalItems = track.querySelectorAll(".col").length;
            const maxIndex = totalItems - 3;

            currentProductIndex--;
            if (currentProductIndex < 0) {
                currentProductIndex = maxIndex > 0 ? maxIndex : 0;
            }
            updateProductSlider();
        });
    }
});

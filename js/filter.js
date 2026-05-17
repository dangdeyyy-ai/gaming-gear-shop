function filterCategory(categoryName, clickedButton) {
    const allButtons = document.querySelectorAll(".btn-filter");

    allButtons.forEach(function (button) {
        button.classList.remove("btn-light");
        button.classList.add("btn-outline-light");
    });

    clickedButton.classList.remove("btn-outline-light");
    clickedButton.classList.add("btn-light");

    if (categoryName === "all") {
        renderProducts(originalProducts);
    } else {
        const filteredResult = originalProducts.filter(function (product) {
            return product.category === categoryName;
        });
        renderProducts(filteredResult);
    }
}

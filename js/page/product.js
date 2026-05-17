let originalProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();

        originalProducts = data;
        renderProducts(originalProducts);
    } catch (error) {
        console.error("Lỗi kết nối API:", error);
    }
}

function renderProducts(productsList) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";

    if (productsList.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted fs-5 my-5">Không có sản phẩm nào thuộc danh mục này.</div>`;
        return;
    }

    productsList.forEach(function (product) {
        const cardHtml = `
            <div class="col">
                <div class="card h-100 border border-secondary bg-dark text-light rounded-3 shadow-lg" 
                    style="transition: all 0.3s ease; cursor: pointer;"
                    >
                    
                    <div class="text-center p-3 bg-black bg-opacity-25 rounded-top-3">
                        <img src="${product.image}" alt="${product.name}" style="height: 200px; width: 100%; object-fit: contain;">
                    </div>
                    
                    <div class="card-body d-flex flex-column bg-dark rounded-bottom-3">
                        <div class="fw-bold text-info mb-2 fs-6" style="min-height: 48px;">${product.name}</div>
                        <div class="text-light small flex-grow-1 mb-3">${product.description}</div>
                        
                        <div class="mt-auto">
                            <span class="text-danger fw-bold d-block mb-3 fs-4">${product.price.toLocaleString("vi-VN")} đ</span>
                            
                            <div class="btn btn-scale btn-outline-info btn-sm w-100 fw-bold" 
                                onclick="window.location.href='product-detail.html?id=${product.id}'">
                                XEM CHI TIẾT
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

fetchProducts();

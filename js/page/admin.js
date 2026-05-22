let allProducts = [];

let currentPage = 1;
const rowsPerPage = 5;

async function fetchAdminProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Không thể kết nối tới server");

        allProducts = await response.json();

        currentPage = 1;
        renderAdminTable();
    } catch (error) {
        console.error("Lỗi lấy danh sách kho hàng:", error);
        const tbody = document.getElementById("admin-table-body");
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger py-4">Lỗi: Hãy chắc chắn rằng bạn đã khởi chạy lệnh 'json-server --watch db.json'!</td></tr>`;
        }
    }
}

function renderAdminTable() {
    const tbody = document.getElementById("admin-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (allProducts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Kho hàng rỗng!</td></tr>`;
        updatePaginationControls(0);
        return;
    }

    const totalPages = Math.ceil(allProducts.length / rowsPerPage);

    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);

    paginatedProducts.forEach((product) => {
        const rowHtml = `
            <tr>
                <td>
                    <div class="p-1 bg-black bg-opacity-25 rounded text-center" style="width: 50px;">
                        <img src="${product.image}" style="width: 40px; height: 40px; object-fit: contain;">
                    </div>
                </td>
                <td class="fw-bold text-info small">${product.name}</td>
                <td><span class="badge bg-secondary">${product.category === "mouse" ? "Chuột" : "Bàn phím"}</span></td>
                <td class="text-danger fw-bold">${product.price.toLocaleString("vi-VN")} đ</td>
                <td>
                    <div class="d-flex gap-1 justify-content-center">
                        <button class="btn btn-sm btn-info text-dark fw-bold" onclick="prepareEdit('${product.id}')">Sửa</button>
                        <button class="btn btn-sm btn-danger fw-bold" onclick="deleteProduct('${product.id}')">Xóa</button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += rowHtml;
    });

    updatePaginationControls(totalPages);
}

function updatePaginationControls(totalPages) {
    const pageInfo = document.getElementById("page-info");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    if (!pageInfo || !btnPrev || !btnNext) return;

    pageInfo.innerText = `Trang ${currentPage} / ${totalPages}`;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages || totalPages === 0;
}

document.addEventListener("DOMContentLoaded", () => {
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderAdminTable();
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener("click", () => {
            const totalPages = Math.ceil(allProducts.length / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderAdminTable();
            }
        });
    }
});

window.handleLogout = () => {
    alert("Đã đăng xuất tài khoản admin!");
    window.location.href = "home.html";
};

fetchAdminProducts();

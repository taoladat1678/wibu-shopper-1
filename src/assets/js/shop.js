const url_pro_shop = 'http://localhost:3000/api/products'; // Đường dẫn API lấy sản phẩm
const itemsPerPage = 3;
let currentPage = 1;
let totalPages = 0;
let productsData = []; // Lưu trữ dữ liệu sản phẩm

const fetchAPI_Pro_Shop = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const showProducts_Shop = async (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const data = productsData.slice(startIndex, endIndex);
    const productsContainer = document.getElementById('load-shop');
    productsContainer.innerHTML = '';
    data.forEach(pro => {
        productsContainer.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
            <div class="card product-item border-0 mb-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <a href="detail.html?id=${pro.id}" id="product-list"> <img class="img-fluid-2 w-100" src="http://localhost:3000/images/${pro.img}" alt="" ></a>
                </div>
                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 class="text-truncate mb-3">${pro.name}</h6>
                    <div class="d-flex justify-content-center">
                        <h6>${pro.price}</h6>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-light border">
                    <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                    <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                </div>
            </div>
        </div>
        `;
    });
};

const updatePagination = async () => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const firstPage = document.createElement('li');
    firstPage.className = 'page-item';
    firstPage.id = 'firstPage';
    firstPage.innerHTML = `<a class="page-link" href="#" aria-label="First">&laquo; Trở về trang đầu</a>`;
    paginationContainer.appendChild(firstPage);

    const previousPage = document.createElement('li');
    previousPage.className = 'page-item';
    previousPage.id = 'previousPage';
    previousPage.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;
    paginationContainer.appendChild(previousPage);

    for (let i = 1; i <= totalPages; i++) {
        const page = document.createElement('li');
        page.className = 'page-item';
        page.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>`;
        paginationContainer.appendChild(page);
    }

    const nextPage = document.createElement('li');
    nextPage.className = 'page-item';
    nextPage.id = 'nextPage';
    nextPage.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;
    paginationContainer.appendChild(nextPage);

    const lastPage = document.createElement('li');
    lastPage.className = 'page-item';
    lastPage.id = 'lastPage';
    lastPage.innerHTML = `<a class="page-link" href="#" aria-label="Last">Đi đến trang cuối &raquo;</a>`;
    paginationContainer.appendChild(lastPage);

    // Add event listeners for pagination buttons
    document.getElementById('firstPage').addEventListener('click', async () => {
        currentPage = 1;
        await showProducts_Shop(currentPage);
        updatePagination();
    });

    document.getElementById('lastPage').addEventListener('click', async () => {
        currentPage = totalPages;
        await showProducts_Shop(currentPage);
        updatePagination();
    });

    document.getElementById('previousPage').addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            await showProducts_Shop(currentPage);
            updatePagination();
        }
    });

    document.getElementById('nextPage').addEventListener('click', async () => {
        if (currentPage < totalPages) {
            currentPage++;
            await showProducts_Shop(currentPage);
            updatePagination();
        }
    });
};

const goToPage = async (page) => {
    currentPage = page;
    await showProducts_Shop(currentPage);
    updatePagination();
};

const calculateAndShowPagination = async () => {
    const urlProducts_Shop = `${url_pro_shop}`;
    productsData = await fetchAPI_Pro_Shop(urlProducts_Shop);
    totalProducts = productsData.length;
    totalPages = Math.ceil(totalProducts / itemsPerPage);
    await showProducts_Shop(currentPage);
    updatePagination();
};

calculateAndShowPagination();

const priceSelect = document.getElementById("price-select");
priceSelect.addEventListener("change", filterProducts);

async function filterProducts() {
    const selectedPrice = priceSelect.value;
    let filteredData = [];

    if (selectedPrice === 'all') {
        filteredData = productsData; // Hiển thị tất cả sản phẩm nếu chọn "Tất cả giá"
    } else {
        const priceRange = selectedPrice.split('-');
        const minPrice = parseInt(priceRange[0]);
        const maxPrice = parseInt(priceRange[1]);

        // Lọc sản phẩm theo mức giá được chọn
        filteredData = productsData.filter(product => {
            const productPrice = parseInt(product.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
    }

    // Hiển thị sản phẩm đã lọc
    displayFilteredProducts(filteredData);
}

function displayFilteredProducts(products) {
    const productsContainer = document.getElementById('load-shop');
    productsContainer.innerHTML = '';
    products.forEach(pro => {
        productsContainer.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
        <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <a href="detail.html?id=${pro.id}" id="product-list"> <img class="img-fluid-2 w-100" src="http://localhost:3000/images/${pro.img}" alt="" ></a>
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 class="text-truncate mb-3">${pro.name}</h6>
                <div class="d-flex justify-content-center">
                    <h6>${pro.price}</h6>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
                <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
            </div>
        </div>
    </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const productList = document.querySelector('#load-products'); // ID của phần hiển thị sản phẩm

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const keyword = searchInput.value.trim();

        // Gửi yêu cầu tìm kiếm sản phẩm thông qua API
        try {
            const response = await fetch(`http://localhost:3000/api/products/search/${keyword}`);
            const data = await response.json();

            // Xóa các sản phẩm hiện có trong danh sách
            productList.innerHTML = '';

            // Hiển thị kết quả tìm kiếm trên trang web
            if (data.length > 0) {
                let productsHTML = ''; // Chuỗi HTML của các sản phẩm

                data.forEach(pro => {
                    productsHTML += `
                        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div class="card product-item border-0 mb-4">
                                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                    <a href="detail.html?id=${pro.id}" id="product-list">
                                        <img class="img-fluid-2 w-100" src="http://localhost:3000/images/${pro.img}" alt="">
                                    </a>
                                </div>
                                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                    <h6 class="text-truncate mb-3">${pro.name}</h6>
                                    <div class="d-flex justify-content-center">
                                        <h6>${pro.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                                    </div>
                                </div>
                                <div class="card-footer d-flex justify-content-between bg-light border">
                                    <a href="detail.html?id=${pro.id}" id="product-list" class="btn btn-sm text-dark p-0">
                                        <i class="fas fa-eye text-primary mr-1"></i>View Detail
                                    </a>
                                    <a href="" class="btn btn-sm text-dark p-0">
                                        <i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });

                productList.innerHTML = productsHTML; // Thêm chuỗi HTML vào productList
            } else {
                productList.innerHTML = '<p>No products found</p>';
            }
        } catch (error) {
            console.error('Error searching products:', error);
            productList.innerHTML = '<p>Error searching products</p>';
        }
    });
});

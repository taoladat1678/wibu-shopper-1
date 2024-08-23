// Load danh muc
const categories = document.getElementById('load-categories');
const products = document.getElementById('load-products');
const hot = document.getElementById('load-hot');
const categories_head = document.getElementById('load-cate-header');

// Function to load products by category ID
function loadProductsByCategory(categoryId) {
    fetch(`http://localhost:3000/api/products/categoryId/${categoryId}`)
        .then(response => response.json())
        .then(data => {
            // Clear existing products
            products.innerHTML = "";
            
            // Loop through the fetched products and display them
            data.forEach(pro => {
                products.innerHTML += `
                <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div class="card product-item border-0 mb-4">
                        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <a href="detail.html?id=${pro.id}" id="product-list"> <img class="img-fluid-2 w-100" src="http://localhost:3000/images/${pro.img}" alt="" ></a>
                        </div>
                        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                            <h6 class="text-truncate mb-3">${pro.name}</h6>
                            <div class="d-flex justify-content-center">
                                <h6>${pro.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between bg-light border">
                            <a href="detail.html?id=${pro.id}" id="product-list" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                        </div>
                    </div>
                </div>
                `;
            });
        })
        .catch(err => console.log(err));
}


// Load categories
fetch('http://localhost:3000/api/categories')
    .then(response => response.json())
    .then(data => {
        data.forEach(cat => {
            categories.innerHTML += `
            <div class="col-lg-4 col-md-6 pb-1">
                <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                    <a href="#" class="cat-img position-relative overflow-hidden mb-3">
                        <img class="img-fluid" src="http://localhost:3000/images/${cat.img}" alt="" style="height: 250px; width: 250px;">
                    </a>
                    <h5 class="font-weight-semi-bold m-0" data-category-id="${cat.id}">${cat.name}</h5>
                </div>
            </div>
            `;
        });

        // Add click event listener to each category
        categories.querySelectorAll('.cat-item').forEach(category => {
            category.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                const categoryId = this.querySelector('h5').getAttribute('data-category-id');
                loadProductsByCategory(categoryId); // Load products by category ID
            });
        });

        // Also add click event listener to categories in header
        data.forEach(cat => {
            categories_head.innerHTML += `
            <a href="#" class="nav-item nav-link" data-category-id="${cat.id}">${cat.name}</a>
            `;
        });
        // Add click event listener to each category in header
        categories_head.querySelectorAll('.nav-item').forEach(category => {
            category.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                const categoryId = this.getAttribute('data-category-id');
                loadProductsByCategory(categoryId); // Load products by category ID
            });
        });
    })
    .catch(err => console.log(err));


// Load products
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(data => {
        data.forEach(pro => {
            products.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="card product-item border-0 mb-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <a href="detail.html?id=${pro.id}" id="product-list"> <img class="img-fluid-2 w-100" src="http://localhost:3000/images/${pro.img}" alt="" ></a>
                   
                </div>
                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 class="text-truncate mb-3">${pro.name}</h6>
                    <div class="d-flex justify-content-center">
                        <h6>${pro.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-light border">
                    <a href="detail.html?id=${pro.id}" id="product-list" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                    <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                </div>
            </div>
        </div>
            `;
        });
    })
    .catch(err => console.log(err));



    fetch('http://localhost:3000/api/products/hot',{
        headers:{
        'Authorization': 'Bearer '+localStorage.getItem('token')
        } 
       }) 
       
    .then(response => response.json())
    .then(data => {
        data.forEach(pro => {
            
            hot.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div class="card product-item border-0 mb-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <a href="detail.html?id=${pro.id}" id="product-list"> <img class="img-fluid-2 w-100" src="http://localhost:3000/images/${pro.img}" alt="" ></a>
                   
                </div>
                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 class="text-truncate mb-3">${pro.name}</h6>
                    <div class="d-flex justify-content-center">
                        <h6>${pro.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h6>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-light border">
                    <a href="detail.html?id=${pro.id}" id="product-list" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                    <a href="#" class="btn btn-sm text-dark p-0" onclick="addToCart('${pro.id}', '${pro.name}', ${pro.price}, 'http://localhost:3000/images/${pro.img}')">
                            <i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
    </a>
                </div>
            </div>
        </div>
            `;
        });
    })
    .catch(err => console.log(err));


    function addToCart(productId, productName, productPrice, productImg) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        let existingItem = cartItems.find(item => item.productId === productId);
    
        if (existingItem) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
            existingItem.quantity++;
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
            cartItems.push({ 
                productId: productId, 
                productName: productName, 
                productPrice: productPrice,
                productImg: productImg,
                quantity: 1 
            });
        }
    
        // Lưu thông tin giỏ hàng vào localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
        // Hiển thị thông báo cho người dùng
        alert('Sản phẩm đã được thêm vào giỏ hàng.');
    }
    

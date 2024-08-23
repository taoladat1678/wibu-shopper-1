const productsContainer = document.getElementById('load-products');

// Function to fetch and display products
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();

        // Clear the products container
        productsContainer.innerHTML = '';

        // Loop through the products and display them in the table
        data.forEach(product => {
            let description = product.description.length > 50 ? product.description.substring(0, 30) + '...' : product.description;
            productsContainer.innerHTML += `
                <tr class="product">
                    <td>${product.id}</td>
                    <td><img src="http://localhost:3000/images/${product.img}" alt="${product.name}"></td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.categoryId}</td>
                    <td>${description}</td>
                    <td>
                        <button class="editBtn" data-product-id="${product.id}">Chỉnh sửa</button>
                        <button class="remove" data-id="${product.id}">Xóa</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Load products when the page loads
window.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);

// Function to open add product form
function openAddProductForm() {
    const addProductForm = document.getElementById('addProductForm');
    addProductForm.style.display = 'block';
}

// Event listener for the "Thêm sản phẩm" button
document.getElementById('addProductBtn').addEventListener('click', openAddProductForm);

// Function to add a new product
async function addProduct() {
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').files[0];
    const productPrice = document.getElementById('productPrice').value;
    const productCateId = document.getElementById('productCateId').value;
    const productDescription = document.getElementById('productDescription').value;

    // Create form data to send the file along with other data
    const formData = new FormData();
    formData.append('img', productImage);
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('categoryId', productCateId);
    formData.append('description', productDescription);

    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log('New product added:', data);

        // Reload products after adding a new product
        fetchAndDisplayProducts();

        // Close the add product form
        document.getElementById('addProductForm').style.display = 'none';
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Event listener for the "Thêm sản phẩm" button in the add product form
document.getElementById('addProductButton').addEventListener('click', addProduct);

// Function to delete a product
async function deleteProduct(productId) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
    if (!confirmDelete) {
        return; // Do nothing if user cancels
    }

    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Xóa sản phẩm thất bại');
        }

        // Reload products after successful deletion
        fetchAndDisplayProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Event listener for the "Xóa" buttons
productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        const productId = event.target.getAttribute('data-id');
        deleteProduct(productId);
    }
});

// Function to open edit product form
// Function to open edit product form
// Function to open edit product form
function openEditProductForm(productId, productName, productPrice, productCateId, productDescription, productImage) {
  const editProductFormContainer = document.getElementById('editProductFormContainer');
  const editProductNameInput = document.getElementById('editProductName');
  const editProductPriceInput = document.getElementById('editProductPrice');
  const editProductCateIdInput = document.getElementById('editProductCateId');
  const editProductDescriptionInput = document.getElementById('editProductDescription');
  const editProductImageContainer = document.getElementById('editProductImageContainer');

  // Fill form inputs with product details
  editProductNameInput.value = productName;
  editProductPriceInput.value = productPrice;
  editProductCateIdInput.value = productCateId;
  editProductDescriptionInput.value = productDescription;

  // Set product ID as data attribute for the form
  document.getElementById('editProductId').value = productId;

  // Display the edit product form container
  editProductFormContainer.style.display = 'block';

  // Display product image in the edit form
  const productImageElement = document.createElement('img');
  productImageElement.src = `http://localhost:3000/images/${productImage}`;
  productImageElement.alt = productName;
  productImageElement.style.width = '100px'; // Set width for the image (example: 150px)
  editProductImageContainer.innerHTML = ''; // Clear previous content
  editProductImageContainer.appendChild(productImageElement);
}


// Event listener for the "Chỉnh sửa" buttons
productsContainer.addEventListener('click', async (event) => {
  if (event.target.classList.contains('editBtn')) {
    const productId = event.target.getAttribute('data-product-id');
    const productName = event.target.parentElement.parentElement.querySelector('td:nth-child(3)').textContent;
    const productPrice = event.target.parentElement.parentElement.querySelector('td:nth-child(4)').textContent;
    const productCateId = event.target.parentElement.parentElement.querySelector('td:nth-child(5)').textContent;
    const productDescription = event.target.parentElement.parentElement.querySelector('td:nth-child(6)').textContent;
    const productImage = event.target.parentElement.parentElement.querySelector('td:nth-child(2) img').getAttribute('src').split('/').pop(); // Get image filename

    openEditProductForm(productId, productName, productPrice, productCateId, productDescription, productImage);
  }
});


// Function to update a product
// Function to update a product
async function updateProduct() {
  const productId = document.getElementById('editProductId').value;
  const productName = document.getElementById('editProductName').value;
  const productPrice = document.getElementById('editProductPrice').value;
  const productCateId = document.getElementById('editProductCateId').value;
  const productDescription = document.getElementById('editProductDescription').value;
  const productImg = document.getElementById('editProductImage').files[0]; // Lấy file ảnh mới

  const formData = new FormData();
  formData.append('name', productName);
  formData.append('price', productPrice);
  formData.append('categoryId', productCateId);
  formData.append('description', productDescription);
  formData.append('img', productImg); // Thêm file ảnh mới vào formData

  try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
          method: 'PUT',
          body: formData,
      });

      if (!response.ok) {
          throw new Error('Cập nhật sản phẩm thất bại');
      }

      // Reload products after successful update
      fetchAndDisplayProducts();

      // Hide the edit product form container
      document.getElementById('editProductFormContainer').style.display = 'none';
  } catch (error) {
      console.error('Error updating product:', error);
  }
}


// Event listener for the "Lưu" button in the edit product form
document.getElementById('saveEditButton').addEventListener('click', updateProduct);

// Function to close edit product form without saving
function cancelEdit() {
    document.getElementById('editProductFormContainer').style.display = 'none';
}

// Event listener for the "Hủy" button in the edit product form
document.getElementById('cancelEditButton').addEventListener('click', cancelEdit);



// Function to search for products
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const productRows = document.querySelectorAll('.product');

    productRows.forEach(row => {
        const productName = row.querySelector('td:nth-child(3)').textContent.trim().toLowerCase();

        // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm
        if (productName.includes(searchInput)) {
            row.style.display = ''; // Hiển thị sản phẩm nếu khớp
        } else {
            row.style.display = 'none'; // Ẩn sản phẩm nếu không khớp
        }
    });
}

// Event listener for the "Tìm kiếm" button
document.getElementById('searchButton').addEventListener('click', searchProducts);

// Event listener for the Enter key in the search input
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

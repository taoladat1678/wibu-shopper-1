const categories = document.getElementById('load-categories');

// Function to fetch and display categories
async function fetchAndDisplayCategories() {
    try {
        const response = await fetch('http://localhost:3000/api/categories');
        const data = await response.json();

        // Clear the categories container
        categories.innerHTML = '';

        // Loop through the categories and display them in the table
        data.forEach(category => {
            categories.innerHTML += `
                <tr class="category">
                    <td>${category.id}</td>
                    <td><img src="http://localhost:3000/images/${category.img}" alt="${category.name}"></td>
                    <td>${category.name}</td>
                    <td>
                        <button class="editCateBtn" data-id="${category.id}">Chỉnh sửa</button>
                        <button class="remove" data-id="${category.id}">Xóa</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Load categories when the page loads
window.addEventListener('DOMContentLoaded', fetchAndDisplayCategories);

// Lắng nghe sự kiện click vào nút "Thêm danh mục"
const addCategorieBtn = document.getElementById('addCategorieBtn');
addCategorieBtn.addEventListener('click', () => {
    // Hiển thị form thêm danh mục khi người dùng click vào nút
    document.getElementById('addCategoryForm').style.display = 'block';
});

// Lắng nghe sự kiện click vào nút "Thêm danh mục" trong form
const submitAddCateBtn = document.querySelector('#categoryForm button[name="submit_addCate"]');
submitAddCateBtn.addEventListener('click', addNewCate);

async function addNewCate() {
    try {
        const categoryNameInput = document.getElementById('categoryName');
        const categoryImageInput = document.getElementById('categoryImage');

        // Tạo formData để gửi dữ liệu
        const formData = new FormData();
        formData.append('name', categoryNameInput.value);
        formData.append('img', categoryImageInput.files[0]);

        // Gửi yêu cầu POST đến API để thêm danh mục mới
        const response = await fetch('http://localhost:3000/api/categories', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Thêm danh mục thất bại');
        }

        // Đóng form thêm danh mục và làm mới trang để hiển thị danh sách mới
        document.getElementById('addCategoryForm').style.display = 'none';
        location.reload();
    } catch (error) {
        console.error('Error adding category:', error);
        // Xử lý lỗi (hiển thị thông báo lỗi cho người dùng, v.v.)
    }
}

// Lắng nghe sự kiện click vào nút "Xóa" trên mỗi danh mục
async function deleteCategory(categoryId) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa danh mục này không?');
    if (!confirmDelete) {
        return; // Do nothing if user cancels
    }

    try {
        const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Xóa danh mục thất bại');
        }

        // Reload categories after successful deletion
        fetchAndDisplayCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
    }
}

// Event listener for the "Xóa" buttons
categories.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        const categoryId = event.target.getAttribute('data-id');
        deleteCategory(categoryId);
    }
});

// Function to open edit category form and populate with category data



// Lắng nghe sự kiện click vào nút "Chỉnh sửa" trên mỗi danh mục
categories.addEventListener('click', async (event) => {
    if (event.target.classList.contains('editCateBtn')) {
        const categoryId = event.target.getAttribute('data-id'); // Get the category ID

        try {
            // Fetch the specific category data by categoryId from the loaded categories
            const response = await fetch(`http://localhost:3000/api/category/${categoryId}`);
            if (!response.ok) {
                throw new Error('Error fetching category data');
            }

            const categoryData = await response.json();
            const categoryName = categoryData.name; // Get category name
            const categoryImage = categoryData.img; // Get category image URL

            openEditCategoryForm(categoryId, categoryName, categoryImage);
        } catch (error) {
            console.error('Error fetching category data:', error);
            // Xử lý lỗi khi không thể lấy được dữ liệu danh mục
        }
    }
});

// Lắng nghe sự kiện click vào nút "Hủy" trên form chỉnh sửa
const cancelEditCategoryBtn = document.getElementById('cancelEditCategoryButton');
cancelEditCategoryBtn.addEventListener('click', () => {
    // Hide the edit category form when cancel button is clicked
    document.getElementById('editCategoryFormContainer').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', () => {
    const submitEditCateBtn = document.getElementById('saveEditCategoryButton');

    if (submitEditCateBtn) {
        submitEditCateBtn.addEventListener('click', updateCategory);
    } else {
        console.error('Không tìm thấy nút submit_editCate');
    }
});




function openEditCategoryForm(categoryId, categoryName, categoryImage) {
    const editCategoryFormContainer = document.getElementById('editCategoryFormContainer');
    const editCategoryNameInput = document.getElementById('editCategoryName');
    const editCategoryImageContainer = document.getElementById('editCategoryImageContainer');

    // Fill form inputs with category details
    editCategoryNameInput.value = categoryName;

    // Set category ID as data attribute for the form
    document.getElementById('editCategoryId').value = categoryId;

    // Display the edit category form container
    editCategoryFormContainer.style.display = 'block';

    // Display category image in the edit form
    const categoryImageElement = document.createElement('img');
    categoryImageElement.src = `http://localhost:3000/images/${categoryImage}`;
    categoryImageElement.alt = categoryName;
    categoryImageElement.style.width = '100px'; // Set width for the image
    editCategoryImageContainer.innerHTML = ''; // Clear previous content
    editCategoryImageContainer.appendChild(categoryImageElement);
}
categories.addEventListener('click', async (event) => {
    if (event.target.classList.contains('editCateBtn')) {
        const categoryId = event.target.getAttribute('data-id');
        const categoryName = event.target.parentElement.parentElement.querySelector('td:nth-child(3)').textContent;
        const categoryImage = event.target.parentElement.parentElement.querySelector('td:nth-child(2) img').getAttribute('src').split('/').pop(); // Get image filename

        openEditCategoryForm(categoryId, categoryName, categoryImage);
    }
});



// async function updateCategory() {
//     const categoryId = document.getElementById('editCategoryId').value;
//     const categoryName = document.getElementById('editCategoryName').value;
//     const categoryImageInput = document.getElementById('editCategoryImage').files[0];

//     // Tạo formData để gửi dữ liệu
//     const formData = new FormData();
//     formData.append('name', categoryName);

//     // Kiểm tra nếu có ảnh mới được chọn thì thêm vào formData
//     if (categoryImageInput) {
//         formData.append('img', categoryImageInput);
//     }

//     try {
//         const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
//             method: 'PUT',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Cập nhật danh mục thất bại');
//         }

//         // Reload categories after successful update
//         fetchAndDisplayCategories();

//         // Hide the edit category form container
//         document.getElementById('editCategoryFormContainer').style.display = 'none';
//     } catch (error) {
//         console.error('Error updating category:', error);
//     }
// }


async function updateCategory() {
    const categoryId = document.getElementById('editCategoryId').value;
    const cateName = document.getElementById('editCategoryName').value;
    const cateImg = document.getElementById('editCategoryImage').files[0]; // Lấy file ảnh mới
  
    const formData = new FormData();
    formData.append('name', cateName);   
    formData.append('img', cateImg); // Thêm file ảnh mới vào formData
  
    try {
        const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`, {
            method: 'PUT',
            body: formData,
        });
  
        if (!response.ok) {
            throw new Error('Cập nhật danh mục thất bại');
        }
  
        // Reload products after successful update
        fetchAndDisplayCategories();
  
        // Hide the edit product form container
        document.getElementById('editCategoryFormContainer').style.display = 'none';
    } catch (error) {
        console.error('Error updating product:', error);
    }
  }
  


// Event listener for the "Lưu" button in the edit category form
document.getElementById('saveEditCategoryButton').addEventListener('click', updateCategory);


// Function to close edit category form without saving
function cancelEditCategory() {
    document.getElementById('editCategoryFormContainer').style.display = 'none';
}

// Event listener for the "Hủy" button in the edit category form
document.getElementById('cancelEditCategoryButton').addEventListener('click', cancelEditCategory);


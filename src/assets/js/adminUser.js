const users = document.getElementById('load-users');

let allUsers = []; // Lưu trữ danh sách người dùng ban đầu

// Fetch và hiển thị người dùng
fetchUsers();

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const data = await response.json();
        allUsers = data; // Lưu danh sách người dùng ban đầu
        displayUsers(data); // Hiển thị danh sách người dùng
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function displayUsers(usersList) {
    users.innerHTML = ''; // Xóa danh sách người dùng hiện tại

    usersList.forEach(user => {
        const role = user.isAdmin == 1 ? 'Admin' : 'Người dùng';
        users.innerHTML += `
            <tr class="product">
                <td>${user.id}</td>
                <td>${user.fullname}</td>
                <td>${role}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>
                    <button name="remove" data-id="${user.id}">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Function để lọc người dùng theo vai trò
function filterUsers() {
    const roleFilter = document.getElementById('roleFilter').value;

    if (roleFilter == 'all') {
        displayUsers(allUsers); // Hiển thị tất cả người dùng
    } else {
        const filteredUsers = allUsers.filter(user => {
            if (roleFilter == 'user') {
                return user.isAdmin == 0; // Lọc ra người dùng
            } else if (roleFilter == 'admin') {
                return user.isAdmin == 1; // Lọc ra admin
            }
        });
        displayUsers(filteredUsers); // Hiển thị danh sách người dùng đã lọc
    }
}

// Xử lý xóa người dùng
users.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.name === 'remove') {
        const userId = event.target.getAttribute('data-id');
        await deleteUser(userId);
    }
});

async function deleteUser(userId) {
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa người dùng này?');
    if (!confirmDelete) {
        return; // Không làm gì nếu người dùng hủy
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Không xóa được người dùng');
        }

        fetchUsers(); // Tải lại danh sách người dùng sau khi xóa thành công
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
    }
}


// adminUser.js

// Function to open the add user form
function openAddUserForm() {
    const addUserForm = document.getElementById('addUserForm');
    addUserForm.style.display = 'block';
}

// Function to close the add user form
function closeAddUserForm() {
    const addUserForm = document.getElementById('addUserForm');
    addUserForm.style.display = 'none';
}



document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname,  // Sử dụng tên trường đúng ở đây
                email,
                password,
                role,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add user');
        }

        const newUser = await response.json();
        console.log('New user added:', newUser);
        
        fetchUsers(); // Refresh the user list after adding a new user
        closeAddUserForm(); // Close the add user form
    } catch (error) {
        console.error('Error adding user:', error);
    }
});
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const button = document.querySelector('button');
var userData = JSON.parse(localStorage.getItem('userData')) || { users: [] };

button.addEventListener('click', () => {
    if (email.value === '' || password.value === '') {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }

    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Sai mật khẩu hoặc tài khoản không tồn tại');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            const loggedInEmail = email.value;
            localStorage.setItem('email', loggedInEmail);
            alert('Đăng nhập thành công');
            
            // Kiểm tra nếu người dùng có quyền isAdmin
            const isAdmin = data.isAdmin; // Giả sử server trả về thông tin isAdmin trong response
            console.log(isAdmin);
            
            if (isAdmin == 1) {
                window.location.href = "admin.html"; // Chuyển hướng đến trang admin.html
            } else {
                window.location.href = "index.html"; // Chuyển hướng đến trang mặc định
            }
        })
});

document.addEventListener("DOMContentLoaded", function () {
    const loadGreetings = document.getElementById('load-greetings');
    const loggedInEmail = localStorage.getItem('email');
    const loginLink = document.querySelector('a[href="login.html"]');
    const registerLink = document.querySelector('a[href="register.html"]');

    if (loggedInEmail) {
        const greetingElement = document.createElement('load-greetings');
        greetingElement.innerHTML = `<p>Xin chào, ${loggedInEmail}</p>
        <a id="load-logout" href="" class="nav-item nav-link">Đăng xuất</a>
        `;
        loadGreetings.appendChild(greetingElement);

        const logoutBtn = document.getElementById('load-logout');
 
        logoutBtn.addEventListener('click', () => {
            // Xóa email khỏi localStorage
            localStorage.removeItem('token');

            localStorage.removeItem('email');
            // Hiển thị lại liên kết "Login" và "Register"
            loginLink.style.display = 'inline-block';
            registerLink.style.display = 'inline-block';
            // Ẩn nút đăng xuất
            logoutBtn.style.display = 'none';
            // Chuyển hướng người dùng đến trang đăng nhập
            window.location.href = 'login.html';
        });
        loadGreetings.appendChild(logoutBtn);

        // Ẩn liên kết "Login" và "Register"
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    } 
});
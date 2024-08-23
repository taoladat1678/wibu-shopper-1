document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    const passwordInput = document.getElementById('password');
    const repasswordInput = document.getElementById('repassword');
    const submitButton = document.getElementById('submitButton');

    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const password = passwordInput.value;
        const repassword = repasswordInput.value;

        if (password !== repassword) {
            alert('Mật khẩu nhập lại không khớp!');
            return;
        }

        try {
            const token = localStorage.getItem('accessToken'); // Đổi lại thành phương thức lấy token thích hợp
            const userEmail = localStorage.getItem('userEmail'); // Lấy giá trị email từ localStorage

            const response = await fetch(`http://localhost:3000/api/users/${userEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Gửi token để xác thực
                },
                body: JSON.stringify({ password }) // Gửi mật khẩu mới
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                alert(errorMessage.message || 'Có lỗi xảy ra khi đổi mật khẩu!');
                return;
            }

            alert('Đổi mật khẩu thành công!');
            window.location.href = "login.html";
            // Redirect hoặc thực hiện hành động sau khi đổi mật khẩu thành công
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi đổi mật khẩu!');
        }
    });
});

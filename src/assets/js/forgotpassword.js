document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submitButton');
    const resetForm = document.getElementById('forgotForm');
    const emailInput = document.getElementById('email');
    
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (email === '') {
            alert('Vui lòng nhập địa chỉ email');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/api/users/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                // Lưu giá trị email vào localStorage
                localStorage.setItem('userEmail', email);

                alert('Bạn sẽ được chuyển sang trang đổi mật khẩu ngay bây giờ');
                window.location.href = 'resetpass.html';
            } else {
                alert(data.message || 'Người dùng không tồn tại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã có lỗi xảy ra, vui lòng thử lại sau.');
        }
    });

});
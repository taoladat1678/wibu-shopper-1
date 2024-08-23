const email = document.querySelector('#email');
const fullname = document.querySelector('#fullname');
const password = document.querySelector('#password');
const repassword = document.querySelector('#repassword');
const button = document.querySelector('button');

// Hàm xử lý đăng ký và đăng nhập
function handleAuthentication(endpoint) {
  if (
    email.value === '' ||
    (fullname && fullname.value === '') || // Thêm điều kiện nếu có trường fullname
    password.value === '' ||
    repassword.value === ''
  ) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  if (password.value !== repassword.value) {
    alert('Mật khẩu không khớp');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    alert('Địa chỉ email không hợp lệ');
    return;
  }

  const userData = {
    email: email.value,
    fullname: fullname ? fullname.value : '', // Nếu không có fullname, gán giá trị rỗng
    password: password.value,
    repassword: repassword.value
  };

  fetch(`http://localhost:3000/api/users/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => { throw { status: response.status, error: err }; });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      localStorage.setItem('userData', JSON.stringify(userData));
      alert('Thao tác thành công');
      localStorage.setItem('email', data.email);
      window.location.href = "index.html"; // Chuyển hướng đến trang chính
    })
    .catch(error => {
      console.log(error);
      if (error.status === 409) {
        alert('Email đã tồn tại');
      } else {
        alert('Thao tác thất bại');
      }
    });
}

// Sự kiện click cho nút đăng ký
button.addEventListener('click', () => {
  handleAuthentication('register'); // Gọi hàm xử lý đăng ký
});

// Sự kiện click cho nút đăng nhập
if (buttonLogin) {
  buttonLogin.addEventListener('click', () => {
    handleAuthentication('login'); // Gọi hàm xử lý đăng nhập
  });
}

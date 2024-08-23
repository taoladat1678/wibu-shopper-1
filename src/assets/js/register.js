const email = document.querySelector('#email');
const fullname = document.querySelector('#fullname');
const password = document.querySelector('#password');
const repassword = document.querySelector('#repassword');
const button = document.querySelector('button');

var userData = JSON.parse(localStorage.getItem('userData')) || { users: [] };

button.addEventListener('click', () => {
  if (
    email.value === '' ||
    fullname.value === '' ||
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

  const newUser = {
    email: email.value,
    fullname: fullname.value,
    password: password.value,
    repassword: repassword.value
  };

  userData.users.push(newUser);

  fetch('http://localhost:3000/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
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
      alert('Đăng ký thành công');
      localStorage.setItem('email', data.email);
      window.location.href = "login.html";
    })
    .catch(error => {
      console.log(error);
      if (error.status === 409) {
        alert('Email đã tồn tại');
      } else {
        alert('Đăng ký thất bại');
      }
    });
});

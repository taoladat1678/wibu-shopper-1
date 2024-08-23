// Function to render cart items and update total
function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const loadCart = document.getElementById('load-cart');
    let total = 0; // Initialize total

    // Clear existing cart items
    loadCart.innerHTML = "";

    // Loop through cartItems and display them in the table
    cartItems.forEach(item => {
        // Calculate subtotal for each item
        const subtotal = item.productPrice * item.quantity;
        total += subtotal; // Add subtotal to total

        loadCart.innerHTML += `
        <tr>
            <td class="align-middle"><img src="${item.productImg}" alt="" style="width: 50px;">${item.productName}</td>
            <td class="align-middle">${item.productPrice}</td>
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" onclick="decreaseQuantity('${item.productId}')">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control form-control-sm bg-secondary text-center" value="${item.quantity}">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" onclick="increaseQuantity('${item.productId}')">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle">${subtotal}</td>
            <td class="align-middle"><button class="btn btn-sm btn-primary" onclick="removeCartItem('${item.productId}')"><i class="fa fa-times"></i></button></td>
        </tr>
        `;
    });

    // Update total amount in the UI
    document.getElementById('total').textContent = `$${total}`;
}

// Function to decrease quantity of a cart item
function decreaseQuantity(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.productId === productId);

    if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }
}

// Function to increase quantity of a cart item
function increaseQuantity(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cartItems.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }
}

// Function to remove a cart item
function removeCartItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCartItems = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    renderCartItems(); // Refresh cart display after removing item
}

// Call renderCartItems on page load
document.addEventListener('DOMContentLoaded', function () {
    renderCartItems();
});

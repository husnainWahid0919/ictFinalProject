var cart = [];

function addToCart(button) {
    var product = button.closest(".product");

    var name = product.querySelector("h3").textContent.trim();
    var price = Number(
        product.querySelector("h4").textContent.replace("$", "")
    );

    var item = cart.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
}

function increaseQuantity(name) {
    var item = cart.find(p => p.name === name);
    if (item) item.quantity++;
    updateCartDisplay();
}


function decreaseQuantity(name) {
    var item = cart.find(p => p.name === name);
    if (!item) return;

    item.quantity--;

    if (item.quantity <= 0) {
        cart = cart.filter(p => p.name !== name);
    }

    updateCartDisplay();
}

function removeFromCart(name) {
    cart = cart.filter(p => p.name !== name);
    updateCartDisplay();
}

function updateCartDisplay() {
    var cartList = document.getElementById("cart-list");
    var totalBill = document.getElementById("total-bill");

    cartList.innerHTML = "";
    var total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        totalBill.textContent = "$0.00";
        return;
    }
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var subtotal = item.price * item.quantity;
        total += subtotal;

        cartList.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong> - $${item.price.toFixed(2)}
                
                <div class="quantity-controls mt-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity('${item.name}')">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity('${item.name}')">+</button>

                    <span class="ms-3">Subtotal: <b>$${subtotal.toFixed(2)}</b></span>

                    <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>

                <hr>
            </div>
        `;
    }

    totalBill.textContent = "$" + total.toFixed(2);
}

function buyPro() {
    Swal.fire({
        title: 'Success!',
        text: 'Product bought successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
    });
}

function userReview() {
    Swal.fire({
        title: 'Success!',
        text: 'Your review has been submitted!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2000,
    });
}
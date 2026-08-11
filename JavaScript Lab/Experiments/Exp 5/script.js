// Food menu
const menu = [
    { name: "Pizza", price: 1200, icon: "🍕" },
    { name: "Burger", price: 800, icon: "🍔" },
    { name: "Pasta", price: 700, icon: "🍝" },
    { name: "Cold Drink", price: 300, icon: "🥤" }
];

const cart = [];
const TAX_RATE = 0.05;

// Display menu
const foodItems = document.getElementById("foodItems");

menu.forEach((item, index) => {

    foodItems.innerHTML += `
        <div class="food-card">
            <div class="food-icon">${item.icon}</div>

            <h3>${item.name}</h3>

            <p class="price">₹${item.price}</p>

            <button onclick="addToCart(${index})">
                Add to Cart
            </button>
        </div>
    `;
});
// Add item to cart
function addToCart(index) {

    const item = menu[index];

    const existingItem = cart.find(
        product => product.name === item.name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    displayCart();
}
// Display cart
function displayCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        cartItems.innerHTML += `
            <div class="cart-item">

                <div>
                    <h4>${item.icon} ${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div class="quantity">

                    <button onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>
        `;
    });
}
// Change quantity
function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// Universal discount logic
function getDiscountRate(subtotal) {

    if (subtotal >= 5000) {
        return 0.40;
    }

    if (subtotal >= 4000) {
        return 0.30;
    }

    if (subtotal >= 3000) {
        return 0.20;
    }

    if (subtotal >= 2000) {
        return 0.10;
    }

    return 0;
}

// Calculate bill
function calculateTotal() {

    // Calculate subtotal using reduce()
    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    // Get discount rate
    const discountRate = getDiscountRate(subtotal);

    // Calculate discount
    const discountAmount =
        subtotal * discountRate;

    // Amount after discount
    const afterDiscount =
        subtotal - discountAmount;

    // Calculate tax
    const taxAmount =
        afterDiscount * TAX_RATE;

    // Final bill
    const finalTotal =
        afterDiscount + taxAmount;

    // Display values
    document.getElementById("subtotal").textContent =
        subtotal.toFixed(2);

    document.getElementById("discountPercent").textContent =
        discountRate * 100;

    document.getElementById("discountAmount").textContent =
        discountAmount.toFixed(2);

    document.getElementById("afterDiscount").textContent =
        afterDiscount.toFixed(2);

    document.getElementById("taxAmount").textContent =
        taxAmount.toFixed(2);

    document.getElementById("finalTotal").textContent =
        finalTotal.toFixed(2);
}
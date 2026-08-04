const invoiceNo = document.getElementById("invoiceNo");

// Date
const currentDate = document.getElementById("currentDate");

// Inputs
const customerName = document.getElementById("customerName");
const mobile = document.getElementById("mobile");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const rate = document.getElementById("rate");
const member = document.getElementById("member");
const payment = document.getElementById("payment");

// Buttons
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

// Invoice Output
const outCustomer = document.getElementById("outCustomer");
const outProduct = document.getElementById("outProduct");
const outQty = document.getElementById("outQty");
const outRate = document.getElementById("outRate");

const subtotal = document.getElementById("subtotal");
const discount = document.getElementById("discount");
const gst = document.getElementById("gst");
const packing = document.getElementById("packing");
const total = document.getElementById("total");

// ======================================
// Generate Invoice Number
// ======================================

invoiceNo.textContent =
    "INV-" + Math.floor(1000 + Math.random() * 9000);

// ======================================
// Current Date
// ======================================

const today = new Date();

currentDate.textContent =
    today.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// ======================================
// Product Rate
// ======================================

product.addEventListener("change", () => {

    const selected =
        product.options[product.selectedIndex];

    const price =
        selected.getAttribute("data-rate");

    rate.value = price ? price : "";

});

// ======================================
// Calculate Bill
// ======================================

calculateBtn.addEventListener("click", () => {

    // Validation

    if (customerName.value.trim() === "") {
        alert("Enter Customer Name");
        customerName.focus();
        return;
    }

    if (!/^[0-9]{10}$/.test(mobile.value)) {
        alert("Enter Valid Mobile Number");
        mobile.focus();
        return;
    }

    if (product.value === "") {
        alert("Select Product");
        return;
    }

    if (quantity.value === "" || quantity.value <= 0) {
        alert("Enter Quantity");
        quantity.focus();
        return;
    }

    // Values

    const qty = Number(quantity.value);

    const price = Number(rate.value);

    const sub = qty * price;

    let discountAmount = 0;

    if (member.value === "Yes") {
        discountAmount = sub * 0.10;
    }

    const afterDiscount =
        sub - discountAmount;

    const gstAmount =
        afterDiscount * 0.05;

    const packingCharge = 50;

    const finalTotal =
        afterDiscount + gstAmount + packingCharge;

    // Invoice Output

    outCustomer.textContent =
        customerName.value;

    outProduct.textContent =
        product.value;

    outQty.textContent =
        qty + " Kg";

    outRate.textContent =
        "₹" + price.toFixed(2);

    subtotal.textContent =
        "₹" + sub.toFixed(2);

    discount.textContent =
        "₹" + discountAmount.toFixed(2);

    gst.textContent =
        "₹" + gstAmount.toFixed(2);

    packing.textContent =
        "₹" + packingCharge.toFixed(2);

    total.textContent =
        "₹" + finalTotal.toFixed(2);

});

// ======================================
// Reset
// ======================================

resetBtn.addEventListener("click", () => {

    rate.value = "";

    outCustomer.textContent = "-";
    outProduct.textContent = "-";
    outQty.textContent = "0 Kg";
    outRate.textContent = "₹0";

    subtotal.textContent = "₹0";
    discount.textContent = "₹0";
    gst.textContent = "₹0";
    packing.textContent = "₹50";
    total.textContent = "₹0";

    invoiceNo.textContent =
        "INV-" + Math.floor(1000 + Math.random() * 9000);

    currentDate.textContent =
        new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

});

// ======================================
// Print Invoice
// ======================================

function printInvoice() {
    window.print();
}
// ACCESS HTML ELEMENTS
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("phone");

const nameMsg = document.getElementById("nameMsg");
const emailMsg = document.getElementById("emailMsg");
const ageMsg = document.getElementById("ageMsg");
const phoneMsg = document.getElementById("phoneMsg");

const nameStatus = document.getElementById("nameStatus");
const emailStatus = document.getElementById("emailStatus");
const ageStatus = document.getElementById("ageStatus");
const phoneStatus = document.getElementById("phoneStatus");

const plans = document.querySelectorAll(".plan");

const selectedPlan = document.getElementById("selectedPlan");
let plan = "";
// NAME VALIDATION
function checkName() {
    if (nameInput.value.trim().length >= 3) {
        nameInput.classList.add("valid");
        nameInput.classList.remove("invalid");
        nameMsg.textContent = "✓ Valid name";
        nameMsg.style.color = "#16A34A";
        nameStatus.textContent = "Name ✓";
        return true;
    } else {
        nameInput.classList.add("invalid");
        nameInput.classList.remove("valid");
        nameMsg.textContent = "Enter at least 3 characters";
        nameMsg.style.color = "#DC2626";
        nameStatus.textContent = "Name ✕";
        return false;
    }
}
// EMAIL VALIDATION
function checkEmail() {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailInput.value)) {
        emailInput.classList.add("valid");
        emailInput.classList.remove("invalid");
        emailMsg.textContent = "✓ Valid email";
        emailMsg.style.color = "#16A34A";
        emailStatus.textContent = "Email ✓";
        return true;
    } else {
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");
        emailMsg.textContent = "Enter a valid email";
        emailMsg.style.color = "#DC2626";
        emailStatus.textContent = "Email ✕";
        return false;
    }
}
// AGE VALIDATION
function checkAge() {
    const age = Number(ageInput.value);
    if (age >= 16 && age <= 80) {
        ageInput.classList.add("valid");
        ageInput.classList.remove("invalid");
        ageMsg.textContent = "✓ Valid age";
        ageMsg.style.color = "#16A34A";
        ageStatus.textContent = "Age ✓";
        return true;
    } else {
        ageInput.classList.add("invalid");
        ageInput.classList.remove("valid");
        ageMsg.textContent = "Age must be between 16 and 80";
        ageMsg.style.color = "#DC2626";
        ageStatus.textContent = "Age ✕";
        return false;
    }
}
// PHONE VALIDATION
function checkPhone() {
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add("valid");
        phoneInput.classList.remove("invalid");
        phoneMsg.textContent = "✓ Valid phone number";
        phoneMsg.style.color = "#16A34A";
        phoneStatus.textContent = "Phone ✓";
        return true;
    } else {
        phoneInput.classList.add("invalid");
        phoneInput.classList.remove("valid");
        phoneMsg.textContent = "Enter 10 digit phone number";
        phoneMsg.style.color = "#DC2626";
        phoneStatus.textContent = "Phone ✕";
        return false;
    }
}
// LIVE INPUT EVENTS
nameInput.addEventListener("input", checkName);
emailInput.addEventListener("input", checkEmail);
ageInput.addEventListener("input", checkAge);
phoneInput.addEventListener("input", checkPhone);
// FOCUS EVENT
nameInput.addEventListener("focus", function() {
    nameMsg.textContent = "Enter your full name";
    nameMsg.style.color = "#64748B";
});
// MEMBERSHIP PLAN SELECTION
plans.forEach(function(card) {
    const button = card.querySelector("button");
    button.addEventListener("click", function() {
        // Remove selected class
        plans.forEach(function(item) {
            item.classList.remove("selected");
        });
        // Select current card
        card.classList.add("selected");
        // Get selected plan
        plan = card.getAttribute("data-plan");
        selectedPlan.textContent =
            "Selected Plan: " + plan;
    });
});
// JOIN BUTTON
document.getElementById("joinBtn").addEventListener("click", function() {
    const validName = checkName();
    const validEmail = checkEmail();
    const validAge = checkAge();
    const validPhone = checkPhone();
    if (
        validName &&
        validEmail &&
        validAge &&
        validPhone &&
        plan !== ""
    ) {
        document.getElementById("result").textContent =
            "🎉 Registration Successful! Welcome to FitZone.";
        document.getElementById("result").style.color =
            "#16A34A";
    } else {
        document.getElementById("result").textContent =
            "⚠️ Please complete all details correctly.";
        document.getElementById("result").style.color =
            "#DC2626";
    }
});
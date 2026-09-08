// ---------------------------------------------
// ACCESS FORM ELEMENTS
// ---------------------------------------------
const form =
    document.getElementById("registrationForm");
const firstName =
    document.getElementById("firstName");
const lastName =
    document.getElementById("lastName");
const email =
    document.getElementById("email");
const birthday =
    document.getElementById("birthday");
const danceStyle =
    document.getElementById("danceStyle");
const password =
    document.getElementById("password");
const confirmPassword =
    document.getElementById("confirmPassword");
const terms =
    document.getElementById("terms");
// ---------------------------------------------
// FOCUS EVENT
// ---------------------------------------------
firstName.addEventListener("focus", function () {
    firstName.style.backgroundColor = "#fdf2f8";
});
// --------------------------------------------
// CHANGE EVENTS
// ---------------------------------------------
// Email validation when email changes
email.addEventListener("change", function () {
    validateEmail();
});
// Password validation when password changes
password.addEventListener("change", function () {
    validatePassword();
});
// Confirm password validation
confirmPassword.addEventListener("change", function () {
    validateConfirmPassword();
});
// Dance style change
danceStyle.addEventListener("change", function () {
    const error =
        document.getElementById("danceStyleError");
    if (danceStyle.value === "") {
        error.textContent =
            "Please select a dance style.";
    } else {
        error.textContent =
            "Selected: " + danceStyle.value;
        error.style.color = "green";
    }
});
// Terms change
terms.addEventListener("change", function () {
    const error =
        document.getElementById("termsError");
    if (terms.checked) {
        error.textContent =
            "Terms accepted ✓";
        error.style.color = "green";
    } else {
        error.textContent =
            "You must agree to the terms.";
        error.style.color = "red";
    }
});
// ---------------------------------------------
// EMAIL VALIDATION
// ---------------------------------------------
function validateEmail() {
    const error =
        document.getElementById("emailError");
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        error.textContent =
            "Email is required.";
        error.style.color = "red";
        return false;
    }
    if (!emailPattern.test(email.value)) {
        error.textContent =
            "Please enter a valid email.";
        error.style.color = "red";
        return false;
    }
    error.textContent =
        "Valid email ✓";
    error.style.color = "green";
    return true;
}
// ---------------------------------------------
// PASSWORD VALIDATION
// ---------------------------------------------
function validatePassword() {
    const error =
        document.getElementById("passwordError");
    if (password.value.trim() === "") {
        error.textContent =
            "Password is required.";
        error.style.color = "red";
        return false;
    }
    if (password.value.length < 6) {
        error.textContent =
            "Password must contain at least 6 characters.";
        error.style.color = "red";
        return false;
    }
    error.textContent =
        "Password is valid ✓";
    error.style.color = "green";
    return true;
}
// ---------------------------------------------
// CONFIRM PASSWORD
// ---------------------------------------------
function validateConfirmPassword() {
    const error =
        document.getElementById("confirmPasswordError");
    if (confirmPassword.value.trim() === "") {
        error.textContent =
            "Please re-enter your password.";
        error.style.color = "red";
        return false;
    }
    if (password.value !== confirmPassword.value) {
        error.textContent =
            "Passwords do not match.";
        error.style.color = "red";
        return false;
    }
    error.textContent =
        "Passwords match ✓";
    error.style.color = "green";
    return true;
}
// ---------------------------------------------
// FORM SUBMIT EVENT
// ---------------------------------------------
form.addEventListener("submit", function (event) {
    // Prevent page refresh
    event.preventDefault();
    let isValid = true;
    // First Name
    if (firstName.value.trim() === "") {
        document.getElementById("firstNameError")
            .textContent =
            "First name is required.";
        isValid = false;
    } else {
        document.getElementById("firstNameError")
            .textContent = "";
    }
    // Last Name
    if (lastName.value.trim() === "") {
        document.getElementById("lastNameError")
            .textContent =
            "Last name is required.";

        isValid = false;
    } else {

        document.getElementById("lastNameError")
            .textContent = "";
    }
    // Email
    if (!validateEmail()) {

        isValid = false;
    }
    // Birthday
    if (birthday.value === "") {
        document.getElementById("birthdayError")
            .textContent =
            "Date of birth is required.";

        isValid = false;
    } else {
        document.getElementById("birthdayError")
            .textContent = "";
    }
    // Dance Style
    if (danceStyle.value === "") {
        document.getElementById("danceStyleError")
            .textContent =
            "Please select a dance style.";
        document.getElementById("danceStyleError")
            .style.color = "red";
        isValid = false;
    }
    // Password
    if (!validatePassword()) {
        isValid = false;
    }
    // Confirm Password
    if (!validateConfirmPassword()) {
        isValid = false;
    }
    // Terms
    if (!terms.checked) {
        document.getElementById("termsError")
            .textContent =
            "You must agree to the Terms and Conditions.";
        document.getElementById("termsError")
            .style.color = "red";
        isValid = false;
    }
    // ----------------------------------------
    // FINAL RESULT
    // -----------------------------------------
    const success =
        document.getElementById("successMessage");
    if (isValid) {
        success.textContent =
            "🎉 Registration successful! See you at the workshop!";
        success.style.color = "green";
        // Reset form after successful registration
        form.reset();
    } else {
        success.textContent =
            "Please correct the errors above.";
        success.style.color = "red";
    }
});
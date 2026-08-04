// =======================================
// Global Scope
// =======================================

let applicationName = "Password Strength Checker";


// =======================================
// Function Declaration
// Cleans the password
// =======================================

function cleanPassword(password) {
    return password.toLowerCase();
}


// =======================================
// Function Expression
// Reverses the password
// =======================================

const reversePassword = function(password) {
    return password.split("").reverse().join("");
};


// =======================================
// Arrow Function
// Checks if password is palindrome
// =======================================

const isPalindrome = (password) => {
    password = cleanPassword(password);
    return password === reversePassword(password);
};


// =======================================
// Closure Example
// Counts number of password checks
// =======================================

function passwordCounter() {

    let count = 0;     // Local Scope

    return function () {

        count++;

        console.log("Passwords Checked :", count);

    };

}

const checkCount = passwordCounter();


// =======================================
// Main Function
// =======================================

function checkPassword() {

    try {

        let password = document.getElementById("password").value;

        if (password.trim() === "") {
            throw "Password cannot be empty.";
        }

        // Count how many passwords have been checked
        checkCount();

        let result = document.getElementById("result");

        result.style.display = "block";

        if (isPalindrome(password)) {

            result.className = "weak";

            result.innerHTML = `
                <h2>❌ SECURITY ALERT</h2>
                <br>
                <strong>Password Status:</strong> WEAK
                <br><br>
                <strong>Reason:</strong><br>
                Your password is a palindrome.<br>
                It is predictable and less secure.
            `;

        }

        else {

            result.className = "strong";

            result.innerHTML = `
                <h2>🛡 ACCESS GRANTED</h2>
                <br>
                <strong>Password Status:</strong> STRONG
                <br><br>
                <strong>Reason:</strong><br>
                Your password is not a palindrome.<br>
                It is comparatively harder to predict.
            `;

        }

    }

    catch (error) {

        let result = document.getElementById("result");

        result.style.display = "block";

        result.className = "error";

        result.innerHTML = `
            <h2>⚠ ERROR</h2>
            <br>
            ${error}
        `;

    }

}
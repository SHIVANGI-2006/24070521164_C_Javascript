// ===========================================
// Global Scope
// ===========================================

let applicationName = "Palindrome Dictionary";


// ===========================================
// Function Declaration
// Cleans the input string
// ===========================================

function cleanString(text) {

    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

}


// ===========================================
// Function Expression
// Reverses the string
// ===========================================

const reverseString = function(text) {

    return text.split("").reverse().join("");

};


// ===========================================
// Arrow Function
// Checks whether the text is a palindrome
// ===========================================

const isPalindrome = (text) => {

    text = cleanString(text);

    return text === reverseString(text);

};


// ===========================================
// Closure Example
// Counts dictionary searches
// ===========================================

function searchCounter() {

    let count = 0;      // Local Scope

    return function() {

        count++;

        console.log("Dictionary Searches :", count);

    };

}

const countSearch = searchCounter();


// ===========================================
// Main Function
// ===========================================

function checkPalindrome() {

    try {

        let input = document.getElementById("text").value;

        if (input.trim() === "") {

            throw "Please enter a word to search.";

        }

        // Closure Function
        countSearch();

        let result = document.getElementById("result");

        result.style.display = "block";

        if (isPalindrome(input)) {

            result.className = "success";

            result.innerHTML = `

                <h2>📗 Dictionary Result</h2>

                <br>

                <strong>Word Found :</strong>

                "${input}"

                <br><br>

                <strong>Meaning :</strong>

                <br>

                This word reads exactly the same
                from left to right and from right to left.

                <br><br>

                ✅ <strong>Palindrome Detected</strong>

            `;

        }

        else {

            result.className = "fail";

            result.innerHTML = `

                <h2>📕 Dictionary Result</h2>

                <br>

                <strong>Word Checked :</strong>

                "${input}"

                <br><br>

                <strong>Meaning :</strong>

                <br>

                The spelling changes when read backwards.

                <br><br>

                ❌ <strong>Not a Palindrome</strong>

            `;

        }

    }

    catch (error) {

        let result = document.getElementById("result");

        result.style.display = "block";

        result.className = "error";

        result.innerHTML = `

            <h2>⚠ Dictionary Error</h2>

            <br>

            ${error}

        `;

    }

}
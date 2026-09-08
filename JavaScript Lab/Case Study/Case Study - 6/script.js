// Main function
function analyzeText() {
    // Get input from textarea
    const text = document.getElementById("inputText").value;
    // Check empty input
    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }
    // --------------------------------
    // BASIC STRING OPERATIONS
    // --------------------------------
    // length
    const length = text.length;
    // substring()
    // Extract characters from index 0 to 10
    const substring = text.substring(0, 10);
    // indexOf()
    // Find the position of the first "a"
    const index = text.toLowerCase().indexOf("a");
    // split()
    // Split paragraph into words
    const words = text.trim().split(/\s+/);
    // replace()
    // Replace the first occurrence of "JavaScript"
    const replaced = text.replace(
        /JavaScript/i,
        "JavaScript Programming"
    );
    // -------------------------------
    // CASE STUDY 1
    // REVERSE A STRING
    // --------------------------------
    const reversed = text
        .split("")
        .reverse()
        .join("");
    // -------------------------------
    // CASE STUDY 2
    // COUNT VOWELS
    // --------------------------------
    let vowelCount = 0;
    for (const character of text.toLowerCase()) {
        if ("aeiou".includes(character)) {
            vowelCount++;
        }
    }
    // --------------------------------
    // DISPLAY RESULTS
    // --------------------------------
    document.getElementById("length").textContent =
        length;
    document.getElementById("substring").textContent =
        substring;
    document.getElementById("indexOf").textContent =
        index === -1 ? "Not found" : index;
    document.getElementById("split").textContent =
        `${words.length} words → [${words.join(", ")}]`;
    document.getElementById("replace").textContent =
        replaced;
    document.getElementById("reverse").textContent =
        reversed;
    document.getElementById("vowels").textContent =
        vowelCount;
}
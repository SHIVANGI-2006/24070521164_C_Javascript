// Analyze Resume
function analyzeResume() {
    const resume = document.getElementById("resumeText").value;
    // trim()
    const trimmed = resume.trim();
    // length
    const length = trimmed.length;
    // toUpperCase()
    const upper = trimmed.toUpperCase();
    // toLowerCase()
    const lower = trimmed.toLowerCase();
    // split()
    const words = trimmed
        .split(/\s+/)
        .filter(word => word.length > 0);

    // REGEX - Extract valid email IDs
    const emailRegex =
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    const emails = trimmed.match(emailRegex) || [];
    // replace()
    const cleanText =
        trimmed.replace(/\s+/g, " ");
    // Display results
    document.getElementById("length").textContent =
        length;
    document.getElementById("wordCount").textContent =
        words.length;
    document.getElementById("characters").textContent =
        length;
    document.getElementById("uppercase").textContent =
        upper;
    document.getElementById("lowercase").textContent =
        lower;
    document.getElementById("trimmed").textContent =
        cleanText;
    // Display Emails
    const emailBox =
        document.getElementById("emails");
    if (emails.length === 0) {
        emailBox.textContent =
            "No valid email IDs found.";
    } else {
        emailBox.innerHTML = emails
            .map(email =>
                `<span class="email">📧 ${email}</span>`
            )
            .join("");
    }
}
// Check Skill using includes()
function checkSkill() {
    const resume =
        document.getElementById("resumeText").value;
    const skill =
        document.getElementById("skill").value.trim();
    const result =
        document.getElementById("skillResult");
    if (skill === "") {
        result.textContent =
            "Please enter a skill.";
        result.style.color = "red";
        return;
    }
    // includes()
    if (resume.toLowerCase().includes(skill.toLowerCase())) {

        result.textContent =
            `✓ ${skill} is present in the resume.`;

        result.style.color = "green";
    } else {
        result.textContent =
            `✗ ${skill} was not found in the resume.`;

        result.style.color = "red";
    }
}
// Replace text using replace()
function replaceText() {
    const resume =
        document.getElementById("resumeText").value;
    const oldText =
        document.getElementById("oldText").value;
    const newText =
        document.getElementById("newText").value;
    const result =
        document.getElementById("replaceResult");
    if (oldText === "") {
        result.textContent =
            "Enter text that you want to replace.";
        return;
    }
    const updatedText =
        resume.replace(oldText, newText);

    result.textContent =
        updatedText;
}
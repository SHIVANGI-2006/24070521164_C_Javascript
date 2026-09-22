const themes = document.querySelectorAll(
    'input[name="theme"]'
);

const clearBtn = document.getElementById("clearBtn");
const localBtn = document.getElementById("localBtn");
const sessionBtn = document.getElementById("sessionBtn");
const status = document.getElementById("status");
// APPLY THEME
function applyTheme(theme) {
    document.body.classList.toggle(
        "dark",
        theme === "dark"
    );
}
// GET SELECTED THEME
function getTheme() {
    return document.querySelector(
        'input[name="theme"]:checked'
    ).value;
}
// SAVE USING LOCAL STORAGE
localBtn.addEventListener("click", function() {
    const theme = getTheme();
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    status.textContent =
        "Status: Preference saved using Local Storage ✓";
});
// SAVE USING SESSION STORAGE
sessionBtn.addEventListener("click", function() {
    const theme = getTheme();
    sessionStorage.setItem("theme", theme);
    applyTheme(theme);
    status.textContent =
        "Status: Preference saved using Session Storage ✓";
});
// CLEAR PREFERENCE
clearBtn.addEventListener("click", function() {
    localStorage.removeItem("theme");
    sessionStorage.removeItem("theme");
    document.querySelector(
        'input[value="light"]'
    ).checked = true;
    applyTheme("light");
    status.textContent =
        "Status: Preferences cleared ✓";
});
// CHANGE THEME PREVIEW
themes.forEach(function(theme) {
    theme.addEventListener("change", function() {
        applyTheme(getTheme());
    });
});
// LOAD SAVED PREFERENCE
const savedTheme =
    localStorage.getItem("theme") ||
    sessionStorage.getItem("theme");
if (savedTheme) {
    document.querySelector(
        `input[value="${savedTheme}"]`
    ).checked = true;
    applyTheme(savedTheme);
    status.textContent =
        "Status: Saved preference loaded ✓";
}
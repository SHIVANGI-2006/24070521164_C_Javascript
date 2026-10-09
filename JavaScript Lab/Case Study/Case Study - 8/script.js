const form = document.getElementById("jobForm");
const result = document.getElementById("result");
const fields = {
    name: {
        element: document.getElementById("name"),
        message: "Enter at least 3 characters",
        validMessage: "Valid name",
        validate: value => value.trim().length >= 3
    },
    dob: {
        element: document.getElementById("dob"),
        message: "Select your date of birth",
        validMessage: "Date selected",
        validate: value => value !== ""
    },
    email: {
        element: document.getElementById("email"),
        message: "Enter a valid email address",
        validMessage: "Valid email",
        validate: value =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    mobile: {
        element: document.getElementById("mobile"),
        message: "Enter a valid 10 digit number",
        validMessage: "Valid mobile number",
        validate: value =>
            /^[0-9]{10}$/.test(value)
    },
    address: {
        element: document.getElementById("address"),
        message: "Enter your complete address",
        validMessage: "Valid address",
        validate: value => value.trim().length >= 10
    },
    city: {
        element: document.getElementById("city"),
        message: "Enter city",
        validMessage: "Valid city",
        validate: value => value.trim() !== ""
    },
    state: {
        element: document.getElementById("state"),
        message: "Enter state",
        validMessage: "Valid state",
        validate: value => value.trim() !== ""
    },
    pin: {
        element: document.getElementById("pin"),
        message: "Enter 6 digit PIN",
        validMessage: "Valid PIN",
        validate: value =>
            /^[0-9]{6}$/.test(value)
    },
    qualification: {
        element: document.getElementById("qualification"),
        message: "Select qualification",
        validMessage: "Qualification selected",
        validate: value => value !== ""
    },
    university: {
        element: document.getElementById("university"),
        message: "Enter university / institute",
        validMessage: "Institute entered",
        validate: value => value.trim() !== ""
    },
    passingYear: {
        element: document.getElementById("passingYear"),
        message: "Enter a valid passing year",
        validMessage: "Valid passing year",
        validate: value => {
            const year = Number(value);
            return year >= 1950 && year <= new Date().getFullYear();
        }
    },
    score: {
        element: document.getElementById("score"),
        message: "Enter percentage or CGPA",
        validMessage: "Score entered",
        validate: value => value.trim() !== ""
    },
    position: {
        element: document.getElementById("position"),
        message: "Select a job position",
        validMessage: "Position selected",
        validate: value => value !== ""
    },
    experience: {
        element: document.getElementById("experience"),
        message: "Select experience",
        validMessage: "Experience selected",
        validate: value => value !== ""
    },
    organization: {
        element: document.getElementById("organization"),
        message: "Enter organization name",
        validMessage: "Organization entered",
        validate: value => value.trim() !== ""
    },
    designation: {
        element: document.getElementById("designation"),
        message: "Enter designation",
        validMessage: "Designation entered",
        validate: value => value.trim() !== ""
    },
    salary: {
        element: document.getElementById("salary"),
        message: "Enter expected salary",
        validMessage: "Salary entered",
        validate: value => Number(value) > 0
    },
    languages: {
        element: document.getElementById("languages"),
        message: "Enter programming languages",
        validMessage: "Languages entered",
        validate: value => value.trim() !== ""
    },
    skills: {
        element: document.getElementById("skills"),
        message: "Enter technical skills",
        validMessage: "Skills entered",
        validate: value => value.trim() !== ""
    },
    certifications: {
        element: document.getElementById("certifications"),
        message: "Enter certifications",
        validMessage: "Certifications entered",
        validate: value => value.trim() !== ""
    }
};
function validateField(field) {
    const value = field.element.value;
    const valid = field.validate(value);
    const message = field.element
        .parentElement
        .querySelector("small");

    field.element.classList.toggle("valid", valid);
    field.element.classList.toggle("invalid", !valid);
    if (message) {
        message.textContent = valid
            ? "✓ " + field.validMessage
            : "✕ " + field.message;
        message.style.color = valid
            ? "#16A34A"
            : "#DC2626";
    }
    updateProgress();
    return valid;
}
Object.values(fields).forEach(field => {
    field.element.addEventListener("input", () => {
        validateField(field);
    });
    field.element.addEventListener("change", () => {
        validateField(field);
    });
});
function validateGender() {
    const selected = document.querySelector(
        'input[name="gender"]:checked'
    );
    const message = document.getElementById("genderError");
    if (selected) {
        message.textContent = "✓ Gender selected";
        message.style.color = "#16A34A";
        return true;
    } else {
        message.textContent = "✕ Select gender";
        message.style.color = "#DC2626";
        return false;
    }
}
document.querySelectorAll(
    'input[name="gender"]'
).forEach(radio => {
    radio.addEventListener("change", () => {
        validateGender();
        updateProgress();
    });
});
function updateProgress() {
    const fieldCount = Object.keys(fields).length;
    let completed = 0;
    Object.values(fields).forEach(field => {
        if (
            field.validate(field.element.value)
        ) {
            completed++;
        }
    });
    if (validateGender()) {
        completed++;
    }
    const total = fieldCount + 1;
    const percentage = Math.round(
        (completed / total) * 100
    );
    document.getElementById("progressBar").style.width =
        percentage + "%";
    document.getElementById("progressText").textContent =
        percentage + "%";
}
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;
    Object.values(fields).forEach(field => {
        if (!validateField(field)) {
            valid = false;
        }
    });
    if (!validateGender()) {
        valid = false;
    }
    if (valid) {
        result.textContent =
            "🎉 Application submitted successfully!";

        result.style.color = "#16A34A";
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    } else {
        result.textContent =
            "⚠️ Please correct the highlighted fields.";
        result.style.color = "#DC2626";
    }
});
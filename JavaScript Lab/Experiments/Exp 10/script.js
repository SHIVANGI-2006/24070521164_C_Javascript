let students = [];
function loadUsingFetch() {
    fetch("students.json")
        .then(response => response.json())
        .then(data => {
            students = data;
            displayStudents();
        })
        .catch(error => {
            console.log("Error loading JSON:", error);
            alert("Unable to load students.json");
        });
}
function loadUsingJQuery() {
    $.getJSON("students.json", function(data) {
        students = data;
        displayStudents();
    }).fail(function() {
        alert("Unable to load students.json");
    });
}
function displayStudents() {
    let table = "";
    students.forEach(function(student) {
        table += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.year}</td>
                <td>${student.cgpa}</td>
                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("studentTable").innerHTML = table;
    document.getElementById("studentCount").innerText =
        "Students: " + students.length;
}
function addStudent() {
    let name =
        document.getElementById("name").value.trim();
    let department =
        document.getElementById("department").value.trim();
    let year =
        document.getElementById("year").value;
    let cgpa =
        document.getElementById("cgpa").value;
    if (name === "" ||
        department === "" ||
        year === "" ||
        cgpa === "") {
        alert("Please fill all fields.");
        return;
    }
    let newStudent = {
        id: students.length + 1,
        name: name,
        department: department,
        year: year,
        cgpa: parseFloat(cgpa)
    };
    students.push(newStudent);
    displayStudents();
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
    document.getElementById("year").value = "";
    document.getElementById("cgpa").value = "";
}
function deleteStudent(id) {
    students = students.filter(function(student) {
        return student.id !== id;
    });
    displayStudents();
}
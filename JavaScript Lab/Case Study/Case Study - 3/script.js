const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = {
      name: document.getElementById("name").value,
      prn: document.getElementById("prn").value,
      password: document.getElementById("password").value
    };

    localStorage.setItem("student", JSON.stringify(student));
    window.location.href = "marks.html";
  });
}

const marksForm = document.getElementById("marksForm");

if (marksForm) {
  marksForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let student = JSON.parse(localStorage.getItem("student")) || {};

    student.cn = Number(document.getElementById("cn").value);
    student.cc = Number(document.getElementById("cc").value);
    student.dc = Number(document.getElementById("dc").value);
    student.ai = Number(document.getElementById("ai").value);
    student.js = Number(document.getElementById("js").value);
    student.sc = Number(document.getElementById("sc").value);

    for (let key in student) {
      if (key !== "name" && key !== "prn" && key !== "password") {
        if (student[key] < 0 || student[key] > 100) {
          alert("Marks should be between 0 and 100");
          return;
        }
      }
    }

    localStorage.setItem("student", JSON.stringify(student));
    window.location.href = "result.html";
  });
}
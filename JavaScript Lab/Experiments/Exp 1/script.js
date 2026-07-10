function showConsole() {

    alert("External JavaScript File Executed");

    console.log("Console Log");
    console.warn("Console Warning");
    console.error("Console Error");
    console.info("Console Information");

    let student = [
        {
            Name: "Shivangi",
            Branch: "AIML",
            Semester: "3rd"
        }
    ];

    console.table(student);

}
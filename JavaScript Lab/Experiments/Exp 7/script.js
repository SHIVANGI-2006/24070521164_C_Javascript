// Get DOM elements
const destinationInput =
    document.getElementById("destinationInput");
const addButton =
    document.getElementById("addButton");
const destinationList =
    document.getElementById("destinationList");
const destinationCount =
    document.getElementById("destinationCount");
// Add destination when button is clicked
addButton.addEventListener("click", addDestination);
// Add destination when Enter is pressed
destinationInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addDestination();
    }
});
// Add Destination
function addDestination() {
    const destinationName =
        destinationInput.value.trim();
    // Check empty input
    if (destinationName === "") {
        alert("Please enter a destination!");
        return;
    }
    // Create list item
    const destinationItem =
        document.createElement("li");
    destinationItem.classList.add("destination");
    // Create destination name
    const nameSpan =
        document.createElement("span");
    nameSpan.classList.add("destination-name");
    nameSpan.textContent =
        `📍 ${destinationName}`;
    // Create action buttons container
    const actions =
        document.createElement("div");
    actions.classList.add("destination-actions");


    // ---------------- EDIT ----------------
    const editButton =
        document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", function () {
        const newDestination =
            prompt(
                "Edit destination:",
                nameSpan.textContent.replace("📍 ", "")
            );
        if (
            newDestination !== null &&
            newDestination.trim() !== ""
        ) {
            // Update DOM
            nameSpan.textContent =
                `📍 ${newDestination.trim()}`;
        }
    });

    // ---------------- DELETE ----------------
    const deleteButton =
        document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", function () {
        const destination =
            deleteButton.parentElement.parentElement;
        // Remove destination
        destination.remove();
        // Update count
        updateDestinationCount();

    });

    // ---------------- VISITED ----------------
    const visitedButton =
        document.createElement("button");
    visitedButton.textContent = "Visited";
    visitedButton.classList.add("visited-btn");
    visitedButton.addEventListener("click", function () {
        // Toggle visited style
        nameSpan.classList.toggle("visited");
        // Change button text
        if (
            nameSpan.classList.contains("visited")
        ) {
            visitedButton.textContent =
                "Visited ✓";
        } else {
            visitedButton.textContent =
                "Visited";
        }
    });
    // Append buttons
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    actions.appendChild(visitedButton);
    // Append destination and actions
    destinationItem.appendChild(nameSpan);
    destinationItem.appendChild(actions);
    // Add to DOM
    destinationList.appendChild(destinationItem);
    // Clear input
    destinationInput.value = "";
    // Update count
    updateDestinationCount();
}
// Update Destination Counter
function updateDestinationCount() {
    // DOM traversal using children
    const total =
        destinationList.children.length;
    destinationCount.textContent =
        total;
}
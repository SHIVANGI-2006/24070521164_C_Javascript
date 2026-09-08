// Player array
const originalPlayers = [
    { name: "Virat", runs: 85 },
    { name: "Rohit", runs: 72 },
    { name: "Gill", runs: 45 },
    { name: "Pant", runs: 63 },
    { name: "Hardik", runs: 91 }
];
let players = [...originalPlayers];
// Display players
function displayPlayers() {

    const playerList = document.getElementById("playerList");

    playerList.innerHTML = "";

    players.forEach((player, index) => {

        playerList.innerHTML += `
            <div class="player">

                <div class="icon">🏏</div>

                <h3>${player.name}</h3>

                <p class="runs">${player.runs}</p>

                <p class="label">Runs</p>

            </div>
        `;
    });
}
displayPlayers();
// PUSH
function addPlayer() {

    players.push({
        name: "Rahul",
        runs: 55
    });

    displayPlayers();

    showOperation("push() → Rahul added to the team");
}
// POP
function removeLastPlayer() {

    const removed = players.pop();

    displayPlayers();

    showOperation(
        `pop() → ${removed.name} removed`
    );
}
// SHIFT
function removeFirstPlayer() {

    const removed = players.shift();

    displayPlayers();

    showOperation(
        `shift() → ${removed.name} removed`
    );
}
// UNSHIFT
function addFirstPlayer() {

    players.unshift({
        name: "Dhoni",
        runs: 78
    });

    displayPlayers();

    showOperation(
        "unshift() → Dhoni added at beginning"
    );
}
// SPLICE
function replacePlayer() {

    if (players.length > 1) {

        players.splice(1, 1, {
            name: "Jadeja",
            runs: 68
        });

    }

    displayPlayers();

    showOperation(
        "splice() → Second player replaced by Jadeja"
    );
}
// SLICE
function showSlice() {

    const result = players.slice(0, 3);

    showOperation(
        `slice(0, 3) → ${result
            .map(player => player.name)
            .join(", ")}`
    );
}
// MAP
function useMap() {

    const result = players.map(
        player => player.runs + 10
    );

    document.getElementById("methodResult").innerHTML =
        `map() → Added 10 bonus runs:<br>
        [ ${result.join(", ")} ]`;
}
// FILTER
function useFilter() {

    const result = players.filter(
        player => player.runs > 50
    );

    document.getElementById("methodResult").innerHTML =
        `filter() → Players scoring above 50:<br>
        ${result.map(player => player.name).join(", ")}`;
}
// REDUCE
function useReduce() {

    const total = players.reduce(
        (sum, player) => sum + player.runs,
        0
    );

    document.getElementById("methodResult").innerHTML =
        `reduce() → Total Team Runs = ${total}`;
}
// FOREACH
function useForEach() {

    let result = "";

    players.forEach(player => {
        result += `${player.name}: ${player.runs} runs<br>`;
    });

    document.getElementById("methodResult").innerHTML =
        `forEach() →<br>${result}`;
}
// Calculate statistics
function calculateStatistics() {

    // Total runs using reduce()
    const totalRuns = players.reduce(
        (sum, player) => sum + player.runs,
        0
    );

    // Maximum and minimum
    const highest = Math.max(
        ...players.map(player => player.runs)
    );

    const lowest = Math.min(
        ...players.map(player => player.runs)
    );

    // Players above 50 using filter()
    const above50 = players.filter(
        player => player.runs > 50
    ).length;

    document.getElementById("totalRuns").textContent =
        totalRuns;

    document.getElementById("highestScore").textContent =
        highest;

    document.getElementById("lowestScore").textContent =
        lowest;

    document.getElementById("above50").textContent =
        above50;
}
// Show operation
function showOperation(message) {

    document.getElementById("operationResult").textContent =
        message;
}
// Reset
function resetPlayers() {

    players = [...originalPlayers];

    displayPlayers();

    document.getElementById("operationResult").textContent =
        "Array reset successfully.";

    document.getElementById("methodResult").textContent =
        "Select an array method";

    document.getElementById("totalRuns").textContent = "-";
    document.getElementById("highestScore").textContent = "-";
    document.getElementById("lowestScore").textContent = "-";
    document.getElementById("above50").textContent = "-";
}

import {
    classes,
    getClassState,
    formatTime,
    formatCountdown
} from "./schedule.js";

import { showNotification } from "./notifications.js";

const classList = document.getElementById("classList");
const countdown = document.getElementById("countdown");

let previousState = "";
let notifiedClasses = new Set();

// Display today's date
document.getElementById("dateLabel").textContent =
    new Date().toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

document.getElementById("dayLabel").textContent =
    new Date().toLocaleDateString([], {
        weekday: "long"
    }).toUpperCase();


// Render all class cards
function renderClasses() {
    classList.innerHTML = classes.map((item, index) => `
        <article class="class-card" id="class-${index}">
            <div class="card-accent"></div>

            <div class="class-details">
                <h3>${item.subject}</h3>
                <p>${item.faculty}</p>
                <p>${item.room}</p>
            </div>

            <div class="class-time">
                <strong>
                    ${formatTime(item.start)} – ${formatTime(item.end)}
                </strong>
                <span class="status-label">UPCOMING</span>
            </div>
        </article>
    `).join("");
}


// Update class card highlighting
function updateClassCards(state) {
    classes.forEach((item, index) => {
        const card = document.getElementById(`class-${index}`);
        const label = card.querySelector(".status-label");

        card.classList.remove("active", "completed");

        if (state.type === "current" && index === state.index) {
            card.classList.add("active");
            label.textContent = "IN PROGRESS";
        } else if (
            state.type === "finished" ||
            (state.type === "current" && index < state.index) ||
            (state.type === "upcoming" && index < state.index)
        ) {
            card.classList.add("completed");
            label.textContent = "COMPLETED";
        } else {
            label.textContent = "UPCOMING";
        }
    });
}


// Update countdown and dashboard
function updateScheduler() {
    const now = new Date();
    const state = getClassState(now);

    updateClassCards(state);

    // All classes completed
    if (state.type === "finished") {
        document.getElementById("timerLabel").textContent =
            "DAY COMPLETE";

        document.getElementById("currentSubject").textContent =
            "All classes completed!";

        document.getElementById("timerDescription").textContent =
            "You have finished today's scheduled classes.";

        document.getElementById("facultyLabel").textContent =
            "Faculty: --";

        document.getElementById("roomLabel").textContent =
            "Room: --";

        document.getElementById("countdownLabel").textContent =
            "TIME REMAINING";

        document.getElementById("timeRange").textContent =
            "Schedule finished";

        countdown.textContent = "00:00:00";

        document.getElementById("progressBar").style.width = "100%";

        if (previousState !== "finished") {
            showNotification(
                "Schedule complete",
                "All five classes have finished."
            );
        }

        previousState = "finished";
        return;
    }

    const item = state.classInfo;
    const isCurrent = state.type === "current";
    const targetTime = isCurrent ? item.end : item.start;

    document.getElementById("timerLabel").textContent =
        isCurrent ? "CLASS IN PROGRESS" : "UPCOMING CLASS";

    document.getElementById("currentSubject").textContent =
        item.subject;

    document.getElementById("timerDescription").textContent =
        isCurrent
            ? "Your current class is underway."
            : "Get ready for your next class.";

    document.getElementById("facultyLabel").textContent =
        `Faculty: ${item.faculty}`;

    document.getElementById("roomLabel").textContent =
        `Room: ${item.room}`;

    document.getElementById("countdownLabel").textContent =
        isCurrent ? "TIME REMAINING" : "CLASS STARTS IN";

    countdown.textContent =
        formatCountdown(targetTime - now);

    document.getElementById("timeRange").textContent =
        `${formatTime(item.start)} – ${formatTime(item.end)}`;

    // Update progress bar
    const duration = item.end - item.start;
    const elapsed = now - item.start;

    const progress = isCurrent
        ? Math.max(0, Math.min(100, (elapsed / duration) * 100))
        : 0;

    document.getElementById("progressBar").style.width =
        `${progress}%`;

    // Notify when a class starts
    const stateKey = `${state.type}-${state.index}`;

    if (stateKey !== previousState && isCurrent) {
        showNotification(
            "Class started!",
            `${item.subject} is now in progress.`
        );
    }

    previousState = stateKey;
}


// Schedule reminders 5 seconds before each class
classes.forEach((item, index) => {
    const reminderDelay =
        item.start.getTime() - Date.now() - 5 * 1000;

    // Do not show a late reminder for a class that has already started
    if (reminderDelay < 0) {
        return;
    }

    setTimeout(() => {
        // Avoid reminding about a class that has already ended
        if (Date.now() >= item.end.getTime()) {
            return;
        }

        if (!notifiedClasses.has(index)) {
            notifiedClasses.add(index);

            showNotification(
                "Upcoming class reminder",
                `Your class, ${item.subject}, will start in 5 seconds.`
            );
        }
    }, reminderDelay);
});


// Initialize dashboard
renderClasses();
updateScheduler();

// Refresh countdown every second
setInterval(updateScheduler, 1000);

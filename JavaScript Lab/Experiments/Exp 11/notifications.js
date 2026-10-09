
let hideTimer;

export function showNotification(title, message) {
    const notification = document.getElementById("notification");

    document.getElementById("notificationTitle").textContent = title;
    document.getElementById("notificationMessage").textContent = message;

    notification.classList.add("show");

    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
        notification.classList.remove("show");
    }, 4000);
}

document.getElementById("closeNotification").addEventListener("click", () => {
    clearTimeout(hideTimer);
    document.getElementById("notification").classList.remove("show");
});

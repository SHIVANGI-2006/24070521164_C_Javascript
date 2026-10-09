
const now = Date.now();

const subjects = [
    {
        subject: "JavaScript Programming",
        faculty: "Prof. Ananya Sharma",
        room: "Lab 204"
    },
    {
        subject: "Computer Networks",
        faculty: "Prof. Rahul Verma",
        room: "Room 301"
    },
    {
        subject: "Compiler Construction",
        faculty: "Prof. Sneha Patil",
        room: "Room 205"
    },
    {
        subject: "Data Compression",
        faculty: "Prof. Amit Deshmukh",
        room: "Lab 102"
    },
    {
        subject: "Soft Computing",
        faculty: "Prof. Neha Joshi",
        room: "Room 404"
    }
];

export const classes = subjects.map((item, index) => {
    const start = new Date(now + (index * 15) * 1000);
    const end = new Date(start.getTime() + 15* 1000);

    return {
        ...item,
        start,
        end
    };
});

export function getClassState(currentTime = new Date()) {
    const current = classes.findIndex(
        item => currentTime >= item.start && currentTime < item.end
    );

    const next = classes.findIndex(item => currentTime < item.start);

    if (current !== -1) {
        return { type: "current", index: current, classInfo: classes[current] };
    }

    if (next !== -1) {
        return { type: "upcoming", index: next, classInfo: classes[next] };
    }

    return { type: "finished", index: -1, classInfo: null };
}

export function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function formatCountdown(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

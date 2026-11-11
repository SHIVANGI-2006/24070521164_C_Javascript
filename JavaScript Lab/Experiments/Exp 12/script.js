
$(document).ready(function () {
    const STORAGE_KEY = "eventoraRegistrations";
    const EVENTS_URL = "events.json";

    let events = [];
    let registrations = loadRegistrations();

    // Read saved registrations from localStorage
    function loadRegistrations() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            return [];
        }
    }

    // Save registrations to localStorage
    function saveRegistrations() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    }

    // Count registrations for one event
    function bookedSeats(eventId) {
        return registrations.filter(
            registration => registration.eventId === eventId
        ).length;
    }

    function availableSeats(event) {
        return Math.max(0, event.capacity - bookedSeats(event.id));
    }

    function formatDate(dateString) {
        const date = new Date(dateString + "T12:00:00");

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    // Load event data using jQuery AJAX
    function loadEvents() {
        $.getJSON(EVENTS_URL)
            .done(function (data) {
                if (!Array.isArray(data)) {
                    const requestedUrl = new URL(EVENTS_URL, window.location.href).href;
                    const ajaxErrorMessage = "Expected the event data to be a JSON array.";

                    console.error("Eventora event loading failed.", {
                        httpStatus: 200,
                        requestedUrl: requestedUrl,
                        ajaxErrorMessage: ajaxErrorMessage
                    });

                    $("#eventList").empty().append(
                        $("<p>")
                            .addClass("form-message error")
                            .text("Unable to load events. Check the browser console for details.")
                    );
                    return;
                }

                events = data;

                populateEventSelect();
                renderEvents();
                updateStatistics();
                renderRegistrations();
                updateSelectedEvent();

                $("#formMessage")
                    .removeClass("error")
                    .text("");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                const requestedUrl = new URL(EVENTS_URL, window.location.href).href;
                const ajaxErrorMessage = errorThrown || textStatus || "Unknown AJAX error";

                console.error("Eventora event loading failed.", {
                    httpStatus: jqXHR.status,
                    requestedUrl: requestedUrl,
                    ajaxErrorMessage: ajaxErrorMessage
                });

                $("#eventList").empty().append(
                    $("<p>")
                        .addClass("form-message error")
                        .text(
                            "Unable to load events" +
                            (jqXHR.status ? " (HTTP " + jqXHR.status + ")" : "") +
                            ". Check the browser console for details."
                        )
                );
            });
    }

    // Fill the event dropdown
    function populateEventSelect() {
        const select = $("#eventSelect");

        select.find("option:not(:first)").remove();

        events.forEach(function (event) {
            const option = $("<option>")
                .val(event.id)
                .text(event.title);

            select.append(option);
        });
    }

    // Render event cards
    function renderEvents() {
        const eventList = $("#eventList").empty();

        events.forEach(function (event) {
            const booked = bookedSeats(event.id);
            const available = availableSeats(event);
            const percentage = (booked / event.capacity) * 100;
            const isFull = available === 0;

            const card = $("<article>").addClass("event-card");

            const visual = $("<div>")
                .addClass("event-visual " + event.theme);

            visual.append(
                $("<span>").addClass("event-symbol").text(event.symbol),
                $("<span>").addClass("event-category").text(event.category)
            );

            const content = $("<div>").addClass("event-content");

            content.append(
                $("<h3>").text(event.title),
                $("<p>").addClass("event-description").text(event.description)
            );

            const meta = $("<div>").addClass("event-meta");

            meta.append(
                $("<span>").text("◷  " + formatDate(event.date) + " · " + event.time),
                $("<span>").text("⌖  " + event.venue)
            );

            const seatHeading = $("<div>").addClass("seat-heading");

            seatHeading.append(
                $("<span>").text(booked + " / " + event.capacity + " seats booked"),
                $("<span>").text(available + " seats left")
            );

            const track = $("<div>").addClass("seat-track");

            track.append(
                $("<div>")
                    .addClass("seat-fill")
                    .css("width", percentage + "%")
            );

            const button = $("<button>")
                .addClass("primary-btn event-register")
                .attr("type", "button")
                .attr("data-event-id", event.id)
                .text(isFull ? "Event Full" : "Register Now ↗")
                .prop("disabled", isFull);

            content.append(meta, seatHeading, track, button);
            card.append(visual, content);
            eventList.append(card);
        });
    }

    // Update overall seat statistics
    function updateStatistics() {
        const totalSeats = events.reduce(
            (sum, event) => sum + event.capacity, 0
        );

        const totalAvailable = events.reduce(
            (sum, event) => sum + availableSeats(event), 0
        );

        $("#totalEvents").text(events.length);
        $("#totalSeats").text(totalSeats);
        $("#totalBooked").text(totalSeats - totalAvailable);
        $("#totalAvailable").text(totalAvailable);
    }

    // Update the selected event information
    function updateSelectedEvent() {
        const eventId = $("#eventSelect").val();
        const event = events.find(item => item.id === eventId);

        if (!event) {
            $("#selectedEventName").text("Select an event");
            $("#selectedSeats").text(
                "Choose an event above to see availability."
            );
            return;
        }

        $("#selectedEventName").text(event.title);
        $("#selectedSeats").text(
            availableSeats(event) + " seats remaining out of " +
            event.capacity
        );
    }

    // Display saved registrations safely using DOM methods
    function renderRegistrations() {
        const list = $("#registrationList").empty();

        $("#registrationCount").text(
            registrations.length + " saved"
        );

        if (registrations.length === 0) {
            list.append(
                $("<p>")
                    .addClass("empty-state")
                    .text("Your registrations will appear here.")
            );
            return;
        }

        registrations.forEach(function (registration) {
            const event = events.find(
                item => item.id === registration.eventId
            );

            const item = $("<article>").addClass("registration-item");
            const details = $("<div>");

            details.append(
                $("<h3>").text(event ? event.title : "Event"),
                $("<p>").text(
                    registration.name + " · " + registration.email
                ),
                $("<p>").text(
                    "Ticket: " + registration.ticketType +
                    " · " + registration.registrationId
                )
            );

            const cancelButton = $("<button>")
                .addClass("cancel-btn")
                .attr("type", "button")
                .attr("data-registration-id", registration.registrationId)
                .text("Cancel");

            item.append(details, cancelButton);
            list.append(item);
        });
    }

    // Click an event card's Register button
    $("#eventList").on("click", ".event-register", function () {
        const eventId = $(this).attr("data-event-id");
        const event = events.find(item => item.id === eventId);

        if (!event || availableSeats(event) === 0) {
            return;
        }

        $("#eventSelect").val(eventId);
        updateSelectedEvent();

        $("#formMessage")
            .removeClass("error success")
            .text("");

        $("#register")[0].scrollIntoView({
            behavior: "smooth"
        });
    });

    // Update selected event when dropdown changes
    $("#eventSelect").on("change", function () {
        updateSelectedEvent();
    });

    // Submit registration form
    $("#registrationForm").on("submit", function (event) {
        event.preventDefault();

        const name = $("#fullName").val().trim();
        const email = $("#email").val().trim().toLowerCase();
        const phone = $("#phone").val().trim();
        const eventId = $("#eventSelect").val();
        const ticketType = $("#ticketType").val();

        const selectedEvent = events.find(
            item => item.id === eventId
        );

        if (!selectedEvent) {
            showMessage("Please select an event.", "error");
            return;
        }

        if (!/^[A-Za-z\s.'-]{2,}$/.test(name)) {
            showMessage("Please enter a valid full name.", "error");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            showMessage("Enter a valid 10-digit Indian mobile number.", "error");
            return;
        }

        if (availableSeats(selectedEvent) <= 0) {
            showMessage("Sorry, this event is full.", "error");
            refreshDashboard();
            return;
        }

        const alreadyRegistered = registrations.some(
            registration =>
                registration.eventId === eventId &&
                registration.email === email
        );

        if (alreadyRegistered) {
            showMessage(
                "This email is already registered for this event.",
                "error"
            );
            return;
        }

        const registration = {
            registrationId: "REG" + Date.now(),
            eventId: eventId,
            name: name,
            email: email,
            phone: phone,
            ticketType: ticketType,
            registeredAt: new Date().toISOString()
        };

        registrations.push(registration);

        try {
            saveRegistrations();
        } catch (error) {
            registrations.pop();

            showMessage(
                "Unable to save registration in this browser.",
                "error"
            );
            return;
        }

        showMessage(
            "Registration successful! Your ID is " +
            registration.registrationId,
            "success"
        );

        this.reset();

        refreshDashboard();
        updateSelectedEvent();
    });

    // Display success or error messages
    function showMessage(message, type) {
        $("#formMessage")
            .removeClass("success error")
            .addClass(type)
            .text(message);
    }

    // Cancel a saved registration
    $("#registrationList").on("click", ".cancel-btn", function () {
        const registrationId = $(this).attr("data-registration-id");

        registrations = registrations.filter(
            registration => registration.registrationId !== registrationId
        );

        saveRegistrations();
        refreshDashboard();
        updateSelectedEvent();

        showMessage(
            "Registration cancelled. Your seat is available again.",
            "success"
        );
    });

    // Refresh all seat counts and registration cards
    function refreshDashboard() {
        renderEvents();
        updateStatistics();
        renderRegistrations();
    }

    // Load data when the page opens
    loadEvents();
});

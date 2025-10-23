/* get out of here this is my messy timer*/
/*how did you even get here?*/

// Countdown to 11:00 AM, Nov 21, 2025 (local time)

(function () {
    const target = new Date(2025, 10, 21, 11, 0, 0); // month is 0-indexed
    const el = document.getElementById('countdown');
    if (!el) return;
    function tick() {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) { el.textContent = 'Today'; return; }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        el.textContent = `${d}d ${h}h ${m}m`;
    }
    tick();
    setInterval(tick, 30000);
})();


// Build minimal ICS with DTSTART only (no end time)
(function () {
    const link = document.getElementById('icsLink');
    if (!link) return;
    const pad = n => String(n).padStart(2, '0');
    const dt = new Date(2025, 10, 21, 11, 0, 0); // local floating time
    const dtLocal = `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
    const summary = 'Kody & Emily Konzal — Wedding Ceremony';
    const location = '33 Washington St, Mayville, WI';
    const description = 'Ceremony at 11:00 AM. Lunch at Jug’s Hitching Post.';
    const ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ceremony Page//EN', 'BEGIN:VEVENT',
        `UID:${crypto.randomUUID()}@ceremony-page`,
        `DTSTAMP:${dtLocal}`,
        `DTSTART:${dtLocal}`,
        `SUMMARY:${summary}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description}`,
        'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    link.href = URL.createObjectURL(blob);
})();
async function goTo(page) {
    try {
        const res = await fetch("/api/me", { credentials: "same-origin" });
        const data = await res.json();

        if (data.logged) {
            window.location.href = page;
        } else {
            window.location.href = "login.html?redirect=" + encodeURIComponent(page);
        }
    } catch (e) {
        window.location.href = "login.html?redirect=" + encodeURIComponent(page);
    }
}
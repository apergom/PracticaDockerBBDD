(async () => {
    const res = await fetch("/api/me");
    if (!res.ok) {
        window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.pathname.replace("/", ""));
    }
})();
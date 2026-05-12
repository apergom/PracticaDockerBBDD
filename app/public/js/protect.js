(async () => {
    const res = await fetch("/api/me", { credentials: "same-origin" });
    const data = await res.json();
    if (!data.logged) {
        window.location.href =
            "login.html?redirect=" + encodeURIComponent(window.location.pathname.replace("/", ""));
    }
})();
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const msg = document.getElementById("msg");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const redirect = new URLSearchParams(window.location.search).get("redirect") || "index.html";
            window.location.href = redirect;
        } else {
            msg.textContent = "Credenciales incorrectas";
        }
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData);

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data)
        });

        if (res.ok) {
            msg.textContent = "Registro correcto, ahora inicia sesión";
        } else {
            msg.textContent = "Usuario ya existe";
        }
    });
}
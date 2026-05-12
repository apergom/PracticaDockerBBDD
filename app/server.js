import express from "express";
import session from "express-session";
import pg from "pg";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

const { Pool } = pg;
const pgSession = connectPgSimple(session);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        store: new pgSession({ pool }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.use(express.static("public"));


app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Datos incompletos" });

    const hash = await bcrypt.hash(password, 10);
    try {
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
            username,
            hash
        ]);
        res.json({ ok: true });
    } catch (err) {
        res.status(400).json({ error: "Usuario ya existe" });
    }
});


app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    if (result.rowCount === 0) return res.status(401).json({ error: "Credenciales incorrectas" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Credenciales incorrectas" });

    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ ok: true });
});


app.get("/api/me", (req, res) => {
    if (!req.session.userId) return res.status(401).json({ logged: false });
    res.json({ logged: true, username: req.session.username });
});


app.post("/api/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
});

app.listen(PORT, () => console.log(`App running on ${PORT}`));
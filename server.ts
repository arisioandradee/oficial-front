import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Database setup
  const db = new Database("leads.db");
  db.exec(`
    CREATE TABLE IF NOT EXISTS saved_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cnpj TEXT UNIQUE NOT NULL,
      status TEXT,
      capital TEXT,
      faturamento TEXT,
      cnae TEXT,
      atividade TEXT,
      localizacao TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/leads", (req, res) => {
    const leads = db.prepare("SELECT * FROM saved_leads ORDER BY created_at DESC").all();
    res.json(leads);
  });

  app.post("/api/leads", (req, res) => {
    const { name, cnpj, status, capital, faturamento, cnae, atividade, localizacao } = req.body;
    try {
      const info = db.prepare(`
        INSERT INTO saved_leads (name, cnpj, status, capital, faturamento, cnae, atividade, localizacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(name, cnpj, status, capital, faturamento, cnae, atividade, localizacao);
      res.json({ id: info.lastInsertRowid });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ error: "Lead já salvo" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  });

  app.delete("/api/leads/:id", (req, res) => {
    db.prepare("DELETE FROM saved_leads WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

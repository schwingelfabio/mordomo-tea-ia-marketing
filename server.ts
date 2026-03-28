import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // OAuth endpoints
  app.get("/api/auth/:platform", (req, res) => {
    const { platform } = req.params;
    // In a real app, you would construct the official OAuth URL here
    // e.g., https://www.facebook.com/v12.0/dialog/oauth?client_id=...
    const authUrl = `https://auth.example.com/${platform}/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${process.env.APP_URL}/api/auth/${platform}/callback&scope=email,public_profile`;
    res.json({ url: authUrl });
  });

  app.get("/api/auth/:platform/callback", (req, res) => {
    // Handle OAuth callback: exchange code for token, save token securely
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Autenticação realizada com sucesso. Esta janela será fechada automaticamente.</p>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

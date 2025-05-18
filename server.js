import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(compression());

async function createServer() {
  let vite;
  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;
      if (!isProduction) {
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/index.html'),
          'utf-8'
        );
        render = (await import('./dist/entry-server.js')).render;
      }

      const { appHtml, helmet } = await render(url);
      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace('</head>', `${helmet.title.toString()}${helmet.meta.toString()}</head>`);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  return app;
}

createServer().then(app => {
  const port = 3005;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}); 
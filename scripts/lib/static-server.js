/**
 * Minimale statische webserver over een Hugo-outputmap. Nodig omdat de
 * root-relatieve CSS/JS/fonts niet laden vanaf `file://`.
 */

import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname, normalize } from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

/** Start een server op een vrije poort; `root` moet een absoluut pad zijn. */
function startServer(root) {
  const server = createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      if (urlPath.endsWith("/")) urlPath += "index.html";
      // Voorkom path-traversal buiten de root.
      const filePath = normalize(join(root, urlPath));
      if (!filePath.startsWith(root) || !existsSync(filePath)) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }
      const body = readFileSync(filePath);
      res.setHeader("Content-Type", MIME[extname(filePath)] || "application/octet-stream");
      res.end(body);
    } catch (err) {
      res.statusCode = 500;
      res.end(String(err));
    }
  });
  return new Promise((res) => {
    server.listen(0, "127.0.0.1", () => res(server));
  });
}

export { startServer, MIME };

import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { nanoid } from "nanoid";

// tiny logger adapter used instead of Vite's createLogger to avoid
// relying on Vite named exports at module-eval time which can vary
// between package builds / ESM wrappers.
const viteLogger = {
  info: console.log,
  warn: console.warn,
  error: console.error,
};

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  // Dynamically import Vite and the project's vite config at runtime.
  // Different distributions export createServer differently (named export,
  // default, etc). Resolve the factory function flexibly.
  // Prefer using Node's createRequire to require the package from node_modules
  // which avoids resolving to local project files that may be named `vite`.
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const viteMod: any = require('vite');
  // debug: log exported keys to help diagnose resolution issues
  try { viteLogger.info('vite module keys: ' + JSON.stringify(Object.keys(viteMod))); } catch (e) {}
  const createServerFactory = viteMod.createServer ?? viteMod.createViteServer ?? viteMod.default;
  if (typeof createServerFactory !== 'function') {
    throw new Error('Could not resolve Vite createServer factory from the installed vite package.');
  }

  // load vite config if available (TS or JS)
  let viteConfig: any = {};
  try {
    const cfg = await import('../vite.config');
    viteConfig = cfg?.default ?? cfg;
  } catch (e) {
    // best-effort: if there's no config module, continue with defaults
    viteLogger.warn('vite config not found via dynamic import, using defaults');
  }

  const vite = await createServerFactory({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg: any, options: any) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: 'custom',
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

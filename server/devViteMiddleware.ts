import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { type Server } from "http";
import { nanoid } from "nanoid";

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

  // load vite from node_modules using createRequire so this ESM file
  // can access the CJS entrypoint
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const viteMod: any = require('vite');
  viteLogger.info('loaded vite');

  const keys = Object.keys(viteMod);
  viteLogger.info('viteMod keys: ' + JSON.stringify(keys));
  const createServerFactory = viteMod.createServer ?? viteMod.createViteServer ?? viteMod.default;
  if (typeof createServerFactory !== 'function') {
    viteLogger.error('viteMod contents:', viteMod);
    throw new Error('Could not resolve Vite createServer factory from the installed vite package.');
  }

  let viteConfig: any = {};
  try {
    const cfg = require('../vite.config');
    viteConfig = cfg && cfg.__esModule ? cfg.default : cfg;
  } catch (e) {
    viteLogger.warn('vite config not found via require, using defaults');
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
  // Serve from dist/public (not server/public)
  const distPath = path.resolve(import.meta.dirname, "..", "dist", "public");

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
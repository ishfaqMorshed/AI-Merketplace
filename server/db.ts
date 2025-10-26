import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, type PoolConfig } from 'pg';
import * as schema from '../shared/schema';

const connectionString = process.env.DATABASE_URL;

export const isDatabaseEnabled = Boolean(connectionString);

let dbInstance: NodePgDatabase<typeof schema> | undefined;

if (connectionString) {
  const sslSetting = process.env.DATABASE_SSL?.toLowerCase();
  let ssl: PoolConfig['ssl'];

  if (sslSetting === 'disable' || sslSetting === 'false') {
    ssl = false;
  } else if (sslSetting === 'require') {
    ssl = { rejectUnauthorized: false };
  } else if (process.env.NODE_ENV === 'production') {
    ssl = { rejectUnauthorized: false };
  }

  const pool = new Pool({
    connectionString,
    ssl,
  });

  dbInstance = drizzle(pool, { schema });
} else {
  console.warn(
    '[server] DATABASE_URL is not set. Falling back to in-memory data store for hero, pricing, and products endpoints.',
  );
}

export const db = dbInstance;

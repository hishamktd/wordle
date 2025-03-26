import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

type DB = {
    users: typeof schema.users;
    games: typeof schema.games;
    leaderboard: typeof schema.leaderboard;
}

// Only initialize the database on the server side
let db: BetterSQLite3Database<DB>;

if (typeof window === 'undefined') {
  const sqlite = Database('sqlite.db');
  db = drizzle(sqlite, { schema });
}

export { db };
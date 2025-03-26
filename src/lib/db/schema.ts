import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const games = sqliteTable('games', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  word: text('word').notNull(),
  attempts: integer('attempts').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  won: integer('won', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});

export const leaderboard = sqliteTable('leaderboard', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  totalGames: integer('total_games').notNull().default(0),
  gamesWon: integer('games_won').notNull().default(0),
  averageAttempts: integer('average_attempts').notNull().default(0),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});
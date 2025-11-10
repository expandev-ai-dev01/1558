/**
 * @summary Database connection instance
 * @module instances/database
 */

import sql from 'mssql';
import { config } from '@/config';

let pool: sql.ConnectionPool | null = null;

/**
 * @summary Gets or creates database connection pool
 * @returns Database connection pool
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect({
      server: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      options: config.database.options,
    });
  }
  return pool;
}

/**
 * @summary Closes database connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

import { NextResponse } from 'next/server';
import pg from 'pg';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results: Record<string, unknown> = {};
  const dbUrl = process.env.DATABASE_URL;

  results.timestamp = new Date().toISOString();
  results.databaseUrlSet = !!dbUrl;
  results.databaseUrlStructure = dbUrl
    ? dbUrl.replace(/:\/\/[^:]*:[^@]*@/, '://***:***@')
    : 'NOT SET';

  // Test 1: Raw pg connection with short timeout
  if (dbUrl) {
    try {
      const pool = new pg.Pool({
        connectionString: dbUrl,
        connectionTimeoutMillis: 5000,
        max: 1,
      });
      const start = Date.now();
      const res = await pool.query('SELECT NOW() as now, current_database() as db, current_user as usr');
      const elapsed = Date.now() - start;
      results.pgDirect = {
        status: 'success',
        elapsed: `${elapsed}ms`,
        result: res.rows[0],
      };

      // Also list tables
      const tables = await pool.query(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
      );
      results.tables = tables.rows.map((r: { tablename: string }) => r.tablename);

      await pool.end();
    } catch (e: unknown) {
      const err = e as Error;
      results.pgDirect = {
        status: 'error',
        message: err.message,
        code: (e as { code?: string }).code,
      };
    }
  }

  // Test 2: PrismaPg adapter connection
  try {
    const { prisma } = await import('@/lib/prisma');

    const abortCtrl = new AbortController();
    const timeout = setTimeout(() => abortCtrl.abort(), 8000);

    const prismaPromise = prisma.$queryRaw`SELECT 1 as ok`.then((r: unknown) => {
      clearTimeout(timeout);
      return { status: 'success', result: r };
    });

    const timeoutPromise = new Promise((_, reject) => {
      abortCtrl.signal.addEventListener('abort', () => {
        reject(new Error('PrismaPg timed out after 8s'));
      });
    });

    results.prismaPg = await Promise.race([prismaPromise, timeoutPromise]).catch(
      (e: Error) => ({
        status: 'error',
        message: e.message,
      })
    );
  } catch (e: unknown) {
    const err = e as Error;
    results.prismaPg = {
      status: 'error',
      message: err.message,
    };
  }

  return NextResponse.json(results, { status: 200 });
}

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks: Record<string, unknown> = {};

  // List ALL environment variable names (redacted values for safety)
  const allEnvKeys = Object.keys(process.env).sort();
  checks.totalEnvVars = allEnvKeys.length;
  checks.allEnvKeys = allEnvKeys;

  // Check specific env vars we care about
  checks.env = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '__UNDEFINED__',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET (length: ' + process.env.NEXTAUTH_SECRET.length + ')' : '__UNDEFINED__',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET (length: ' + process.env.GOOGLE_CLIENT_ID.length + ')' : '__UNDEFINED__',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET (length: ' + process.env.GOOGLE_CLIENT_SECRET.length + ')' : '__UNDEFINED__',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET (length: ' + process.env.DATABASE_URL.length + ')' : '__UNDEFINED__',
    NODE_ENV: process.env.NODE_ENV ?? '__UNDEFINED__',
    HOSTNAME: process.env.HOSTNAME ?? '__UNDEFINED__',
    PORT: process.env.PORT ?? '__UNDEFINED__',
  };

  // Try to import prisma and test connection
  try {
    const { prisma } = await import('@/lib/prisma');
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: 'connected' };

    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `;
    checks.database = {
      status: 'connected',
      tables: tables.map((t: { tablename: string }) => t.tablename),
    };

    const userCount = await prisma.user.count();
    checks.users = { count: userCount };
  } catch (error: unknown) {
    const err = error as Error;
    checks.database = {
      status: 'error',
      message: err.message.substring(0, 500),
    };
  }

  return NextResponse.json(checks, { status: 200 });
}

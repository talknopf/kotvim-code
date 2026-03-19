import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks: Record<string, unknown> = {};

  // Check environment variables
  checks.env = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT SET',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET (ends with: ...' + process.env.GOOGLE_CLIENT_ID.slice(-6) + ')' : 'NOT SET',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET (host: ' + (process.env.DATABASE_URL.match(/@([^:\/]+)/)?.[1] || 'unknown') + ')' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
  };

  // Check database connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: 'connected' };

    // Check if required tables exist
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    `;
    checks.database = {
      status: 'connected',
      tables: tables.map((t: { tablename: string }) => t.tablename),
    };
  } catch (error: unknown) {
    const err = error as Error;
    checks.database = {
      status: 'error',
      message: err.message,
    };
  }

  // Check user count
  try {
    const userCount = await prisma.user.count();
    checks.users = { count: userCount };
  } catch (error: unknown) {
    const err = error as Error;
    checks.users = { error: err.message };
  }

  // Check account count
  try {
    const accountCount = await prisma.account.count();
    checks.accounts = { count: accountCount };
  } catch (error: unknown) {
    const err = error as Error;
    checks.accounts = { error: err.message };
  }

  return NextResponse.json(checks, { status: 200 });
}

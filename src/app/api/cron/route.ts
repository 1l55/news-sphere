import { NextResponse } from 'next/server';
import { cache } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  const keys = cache.keys();
  for (const k of keys) cache.del(k);
  return NextResponse.json({ success: true, cleared: keys.length, timestamp: new Date().toISOString() });
}

export async function POST() {
  const keys = cache.keys();
  for (const k of keys) cache.del(k);
  return NextResponse.json({ success: true, cleared: keys.length });
}

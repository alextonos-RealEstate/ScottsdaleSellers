// app/api/debug-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_KEY;
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasAnon = !!process.env.NEXT_PUBLIC_SUPABASE_KEY;

  return NextResponse.json({
    hasServiceKey,
    hasUrl,
    hasAnon,
  });
}

import { NextRequest, NextResponse } from 'next/server'

// For launch this just echoes payload; we’ll swap to real PDF later.
export async function POST(req: NextRequest) {
  const payload = await req.json()
  return NextResponse.json({ received: true, payload })
}

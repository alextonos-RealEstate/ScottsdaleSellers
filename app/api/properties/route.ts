import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  // service role is safe here (server-only file)
  process.env.SUPABASE_SERVICE_ROLE as string,
  { auth: { persistSession: false, autoRefreshToken: false } }
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // basic validation
    const {
      full_address,
      address_line1,
      address_line2,
      city,
      state = 'AZ',
      postal_code,
      lat,
      lng,
      owner_name,
      owner_email
    } = body || {}

    if (!full_address) {
      return NextResponse.json({ error: 'full_address is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([
        {
          full_address,
          address_line1,
          address_line2,
          city,
          state,
          postal_code,
          lat,
          lng,
          owner_name,
          owner_email
        }
      ])
      .select('*')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, property: data }, { status: 201 })
  } catch (e: any) {
    console.error('API error:', e)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

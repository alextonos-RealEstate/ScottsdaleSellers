// app/api/properties/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Ensure this API route is not statically analyzed/prerendered
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: Request) {
  // Create the client at REQUEST TIME (not module top), so it doesn't run during build
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY

  if (!url || !serviceKey) {
    // Be explicit so we know which variable is missing if this ever happens in runtime
    return NextResponse.json(
      { error: `Missing env: ${!url ? 'NEXT_PUBLIC_SUPABASE_URL' : ''} ${!serviceKey ? 'SUPABASE_SERVICE_KEY' : ''}`.trim() },
      { status: 500 }
    )
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  try {
    const body = await req.json()

    const {
      full_address,
      address,
      city,
      state = 'AZ',
      postal_code,
      zip,
      type,
      beds,
      baths,
      sqft,
      purchase_price,
      purchase_date,
      current_value,
      lat,
      lng
    } = body || {}

    const addressValue = full_address || address
    const zipValue = postal_code || zip

    if (!addressValue) {
      return NextResponse.json({ error: 'address is required' }, { status: 400 })
    }

    const insertPayload = Object.fromEntries(
      Object.entries({
        address: addressValue,
        city,
        state,
        zip: zipValue,
        type,
        beds,
        baths,
        sqft,
        purchase_price,
        purchase_date,
        current_value,
        lat,
        lng
      }).filter(([, v]) => v !== undefined && v !== null)
    )

    const { data, error } = await supabase
      .from('properties')
      .insert([insertPayload])
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

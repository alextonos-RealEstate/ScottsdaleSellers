import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    address, city, state, zip, type,
    beds, baths, sqft,
    purchase_price, purchase_date, current_value
  } = body

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('properties')
    .insert([{
      address, city, state, zip, type,
      beds, baths, sqft,
      purchase_price, purchase_date, current_value
    }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true, id: data.id })
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, phone, address, utm, consent } = body

  const { data, error } = await supabase
    .from('leads')
    .insert({ email, phone, address, utm, consent })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // You can later forward `data` to Lofty/Zapier here with a webhook.
  return NextResponse.json({ ok: true, id: data.id })
}

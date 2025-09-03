import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const supabase = getAdminClient()
  if (!supabase) {
    return NextResponse.json({ error: 'Server missing Supabase env' }, { status: 500 })
  }

  const { data, error } = await supabase
    .from('properties')
    .select('id, full_address, city, state, postal_code, owner_name, owner_email, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ properties: data ?? [] }, { headers: { 'Cache-Control': 'no-store' } })
}

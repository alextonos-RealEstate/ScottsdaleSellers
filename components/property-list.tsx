'use client'

import { useEffect, useState } from 'react'

type Property = {
  id: string
  full_address: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  owner_name: string | null
  owner_email: string | null
  created_at: string
}

export default function PropertyList() {
  const [rows, setRows] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/properties/recent', { cache: 'no-store' })
        const json = await res.json()
        if (!res.ok) throw new Error(json?.error || 'Failed to load properties')
        setRows(json.properties ?? [])
      } catch (e: any) {
        setErr(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div className="card p-6">Loading properties…</div>
  if (err) return <div className="card p-6 text-red-600">Error: {err}</div>
  if (rows.length === 0) {
    return (
      <div className="card p-6">
        <div className="mb-2">No properties yet.</div>
        <a className="btn btn-primary" href="/add">Add Property</a>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Properties</h3>
        <a href="/add" className="btn btn-primary">Add Property</a>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((p) => (
          <div key={p.id} className="border rounded-xl p-4 flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">{p.full_address || '—'}</div>
              <div className="text-gray-500">
                {(p.city || '—')}, {(p.state || '—')} {p.postal_code || ''}
              </div>
              <div className="text-gray-500">
                {p.owner_name || '—'} · {p.owner_email || '—'}
              </div>
              <div className="text-gray-400">
                Added {new Date(p.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* 🔥 Big, obvious Open button */}
            <a
              href={`/property/${p.id}`}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
              aria-label={`Open property ${p.full_address || p.id}`}
            >
              Open
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

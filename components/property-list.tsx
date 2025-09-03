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
        setRows(json.properties)
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
        No properties yet. Add one on the{' '}
        <a className="underline" href="/add">Add Property</a> page.
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Properties</h3>
        <a href="/add" className="btn btn-primary">Add Property</a>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="py-2 pr-4">Address</th>
              <th className="py-2 pr-4">Owner</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-2 pr-4">{p.full_address || '—'}</td>
                <td className="py-2 pr-4">{p.owner_name || '—'}</td>
                <td className="py-2 pr-4">{p.owner_email || '—'}</td>
                <td className="py-2 pr-4">{new Date(p.created_at).toLocaleDateString()}</td>
                <td className="py-2 pr-4">
                  <a className="text-brand-navy underline" href={`/property/${p.id}`}>Open</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


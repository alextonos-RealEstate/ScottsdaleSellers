'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPropertyPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      address: (form.address as any).value,
      city: (form.city as any).value,
      state: (form.state as any).value,
      zip: (form.zip as any).value,
      type: (form.type as any).value || 'Single Family',
      beds: Number((form.beds as any).value || 0),
      baths: Number((form.baths as any).value || 0),
      sqft: Number((form.sqft as any).value || 0),
      purchase_price: Number((form.purchase_price as any).value || 0),
      purchase_date: (form.purchase_date as any).value || null,
      current_value: Number((form.current_value as any).value || 0),
    }

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to save')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">Add Property</h1>
        <p className="text-gray-600">Add a property to your portfolio.</p>
      </div>

      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            Address *
            <input name="address" required className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            City
            <input name="city" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            State
            <input name="state" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            ZIP
            <input name="zip" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Type
            <input name="type" placeholder="Single Family" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Beds
            <input type="number" name="beds" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Baths
            <input type="number" step="0.5" name="baths" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Sq Ft
            <input type="number" name="sqft" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Purchase Price
            <input type="number" name="purchase_price" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Purchase Date
            <input type="date" name="purchase_date" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="text-sm">
            Current Value
            <input type="number" name="current_value" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save Property'}
          </button>
          <a href="/dashboard" className="btn btn-ghost">Cancel</a>
        </div>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddPropertyPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    full_address: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: 'AZ',
    postal_code: '',
    owner_name: '',
    owner_email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!form.full_address) {
      setError('Please enter the full property address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to save')
      // Go to dashboard or success screen
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function field<K extends keyof typeof form>(key: K) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }))
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Add Property</h1>
      <p className="text-sm text-gray-600 mt-1">
        Enter your address and contact info to generate your Scottsdale Seller dashboard.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <div className="card p-6 grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            Full Address *
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('full_address')} placeholder="e.g., 12345 E Example Rd, Scottsdale, AZ 85255" />
          </label>
          <label className="text-sm">
            Address Line 1
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('address_line1')} />
          </label>
          <label className="text-sm">
            Address Line 2
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('address_line2')} />
          </label>
          <label className="text-sm">
            City
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('city')} />
          </label>
          <label className="text-sm">
            State
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('state')} />
          </label>
          <label className="text-sm">
            Postal Code
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('postal_code')} />
          </label>
        </div>

        <div className="card p-6 grid md:grid-cols-2 gap-4">
          <label className="text-sm">
            Your Name
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="text" {...field('owner_name')} />
          </label>
          <label className="text-sm">
            Your Email
            <input className="mt-1 w-full border rounded-lg px-3 py-2" type="email" {...field('owner_email')} />
          </label>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Saving…' : 'Save & Go to Dashboard'}
        </button>
      </form>
    </div>
  )
}

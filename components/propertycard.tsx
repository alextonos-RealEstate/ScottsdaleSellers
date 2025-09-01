export type Property = {
  id: string
  address: string
  city: string | null
  state: string | null
  type: string | null
  purchase_price: number | null
  current_value: number | null
}

export default function PropertyCard({ p }: { p: Property }) {
  const value = p.current_value ?? 0
  const basis = p.purchase_price ?? 0
  const delta = value - basis
  const deltaPct = basis ? (delta / basis) * 100 : 0

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-brand-navy font-semibold">
            <span className="inline-block h-6 w-6 rounded-md bg-gray-100 grid place-items-center">🏠</span>
            {p.address}
          </div>
          <div className="text-xs text-gray-500">{p.city}, {p.state} · {p.type}</div>
        </div>
        <span className="badge">{p.type}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Current Value</div>
          <div className="text-lg font-semibold">${value.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Purchase Price</div>
          <div className="text-lg font-semibold">${basis.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-3 text-sm text-emerald-700">
        Value Change: {delta >= 0 ? '+' : '-'}${Math.abs(delta).toLocaleString()} ({deltaPct.toFixed(1)}%)
      </div>
    </div>
  )
}

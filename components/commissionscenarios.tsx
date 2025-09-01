import { clsx } from "clsx"

export default function CommissionScenarios({
  scenarios,
  active
}: {
  scenarios: { rate: number; net: number; commission: number }[]
  active: number
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {scenarios.map((s) => (
        <div
          key={s.rate}
          className={clsx(
            "card p-4",
            active === s.rate && "ring-2 ring-brand-navy"
          )}
        >
          <div className="text-sm text-gray-500">{s.rate.toFixed(1)}%</div>
          <div className="text-lg font-semibold">${s.net.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Net Proceeds</div>
          <div className="mt-2 text-xs text-gray-600">
            Commission ${s.commission.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  )
}

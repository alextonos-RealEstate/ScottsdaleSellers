export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Market Analytics — Scottsdale / Carefree / Paradise Valley
      </h2>
      <p className="text-gray-600">
        Stubbed for launch; later wired to ARMLS Bridge/RESO. Display average price, price/ft, DOM, and recent sales.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-6">
          <div className="text-sm text-gray-500">Average Price Trend</div>
          <div className="h-48 grid place-items-center text-gray-400">Chart placeholder</div>
        </div>
        <div className="card p-6">
          <div className="text-sm text-gray-500">Property Type Sales</div>
          <div className="h-48 grid place-items-center text-gray-400">Chart placeholder</div>
        </div>
      </div>
    </div>
  )
}

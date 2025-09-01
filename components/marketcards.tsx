export default function MarketCards() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      <div className="card p-4">
        <div className="text-sm text-gray-500">Average Price</div>
        <div className="text-2xl font-bold">$1,950,000</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-gray-500">Price / Sq Ft</div>
        <div className="text-2xl font-bold">$872</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-gray-500">Days on Market</div>
        <div className="text-2xl font-bold">23</div>
      </div>
      <div className="card p-4">
        <div className="text-sm text-gray-500">Recent Sales</div>
        <div className="text-2xl font-bold">8</div>
      </div>
    </div>
  )
}

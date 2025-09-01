export type Sale = {
  address: string
  city: string | null
  zip: string | null
  sale_price: number
  beds: number | null
  baths: number | null
  sqft: number | null
  type: string | null
  dom: number | null
  sale_date: string
}

export default function RecentSalesTable({ data }: { data: Sale[] }) {
  return (
    <div className="card p-6">
      <div className="text-lg font-semibold mb-3">Recent Neighborhood Sales</div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="py-2 pr-4">Property</th>
              <th className="py-2 pr-4">Sale Price</th>
              <th className="py-2 pr-4">Details</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 pr-4">{s.address}, {s.city} {s.zip}</td>
                <td className="py-2 pr-4 font-semibold">${s.sale_price.toLocaleString()}</td>
                <td className="py-2 pr-4">
                  {s.beds ?? '-'} bed, {s.baths ?? '-'} bath, {s.sqft?.toLocaleString() ?? '-'} sqft
                </td>
                <td className="py-2 pr-4">{s.type}</td>
                <td className="py-2 pr-4">{new Date(s.sale_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

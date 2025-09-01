// app/dashboard/page.tsx
import PortfolioOverview from '@/components/portfoliooverview'
import StatCard from '@/components/statcard'
import PropertyCard from '@/components/propertycard'
import RecentSalesTable from '@/components/recentsalestable'
import { sbServer } from '@/lib/server_supabase'

export default async function DashboardPage() {
  const { data: properties } = await sbServer
    .from('properties')
    .select('*')
    .order('id')

  const { data: sales } = await sbServer
    .from('sales')
    .select('*')
    .order('id')

  return (
    <div className="space-y-6">
      {/* Header with Add Property button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy">
            SCOTTSDALE Luxury Seller Blueprint
          </h1>
          <p className="text-gray-600">
            Track your real estate portfolio and market insights.
          </p>
        </div>
        <a
          href="/dashboard/add"
          className="px-4 py-2 rounded-xl bg-brand-gold text-white font-medium hover:bg-yellow-600 transition"
        >
          + Add Property
        </a>
      </div>

      {/* Portfolio Overview */}
      <PortfolioOverview />

      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Avg. Sale Price" value="$1,950,000" />
        <StatCard title="Price per Sq Ft" value="$872" />
        <StatCard title="Avg. Days on Market" value="23 days" />
        <StatCard title="Recent Sales" value={sales?.length || 0} />
      </div>

      {/* Your Properties */}
      <div>
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          Your Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties?.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>

      {/* Recent Sales */}
      <RecentSalesTable sales={sales || []} />
    </div>
  )
}

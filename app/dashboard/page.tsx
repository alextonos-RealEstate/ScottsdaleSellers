import PortfolioOverview from '@/components/portfoliooverview'
import StatCard from '@/components/statcard'
import PropertyCard from '@/components/propertycard'
import RecentSalesTable from '@/components/recentsalestable'
import { sbServer } from '@/lib/server_supabase'

export const revalidate = 30

export default async function DashboardPage() {
  const sb = sbServer()

  const { data: props } = await sb
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: sales } = await sb
    .from('sales')
    .select('*')
    .order('sale_date', { ascending: false })
    .limit(8)

  const totals = (props ?? []).reduce(
    (acc: any, p: any) => {
      acc.totalValue += Number(p.current_value || 0)
      acc.totalBasis += Number(p.purchase_price || 0)
      return acc
    },
    { totalValue: 0, totalBasis: 0 }
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">SCOTTSDALE Luxury Seller Blueprint</h1>
        <p className="text-gray-600">Track your real estate portfolio and market insights.</p>
      </div>

      <PortfolioOverview totals={totals} />

      <section className="grid md:grid-cols-4 gap-4">
        <StatCard label="Avg. Sale Price" value="$1,950,000" sub="Market data" />
        <StatCard label="Price per Sq Ft" value="$872" sub="Market data" />
        <StatCard label="Avg. Days on Market" value="23 days" sub="Market data" />
        <StatCard label="Recent Sales" value={(sales?.length ?? 0).toString()} sub="Market data" />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Your Properties</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(props ?? []).map((p: any) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      <RecentSalesTable data={(sales ?? []) as any} />
    </div>
  )
}

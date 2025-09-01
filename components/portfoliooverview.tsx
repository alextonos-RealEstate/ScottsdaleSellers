export type PortfolioTotals = { totalValue: number; totalBasis: number }

export default function PortfolioOverview({ totals }: { totals: PortfolioTotals }) {
  const gain = totals.totalValue - totals.totalBasis
  const gainPct = totals.totalBasis ? (gain / totals.totalBasis) * 100 : 0

  return (
    <div className="card p-6 bg-gradient-to-br from-brand-navy to-slate-800 text-white">
      <div className="text-lg font-semibold">Portfolio Overview</div>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="card bg-white/10 border-white/20 p-4">
          <div className="opacity-80 text-sm">Total Portfolio Value</div>
          <div className="text-2xl font-bold">${totals.totalValue.toLocaleString()}</div>
        </div>
        <div className="card bg-white/10 border-white/20 p-4">
          <div className="opacity-80 text-sm">Total Investment</div>
          <div className="text-2xl font-bold">${totals.totalBasis.toLocaleString()}</div>
        </div>
        <div className="card bg-white/10 border-white/20 p-4">
          <div className="opacity-80 text-sm">Gain / Loss</div>
          <div className="text-2xl font-bold text-emerald-300">
            {gain >= 0 ? '+' : '-'}${Math.abs(gain).toLocaleString()} ({gainPct.toFixed(1)}%)
          </div>
        </div>
      </div>
    </div>
  )
}

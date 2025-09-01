import CTASection from '@/components/ctasection'
import MarketCards from '@/components/marketcards'

export default function Page() {
  return (
    <div className="space-y-10">
      <section className="card p-8 bg-gradient-to-br from-white to-gray-50">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Scottsdale Luxury Seller Blueprint</h1>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Get a commission-smart Net Seller Sheet with real closing costs for Maricopa County and see how agent fees change your take-home at closing.
        </p>
        <div className="mt-4 flex gap-3">
          <a className="btn btn-primary" href="/netsheet">See Your Net Sheet</a>
          <a className="btn btn-ghost" href="/analytics">Market Analytics</a>
        </div>
      </section>
      <MarketCards />
      <CTASection />
    </div>
  )
}

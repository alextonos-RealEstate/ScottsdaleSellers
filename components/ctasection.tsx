export default function CTASection() {
  return (
    <section className="card p-6 mt-8">
      <h3 className="text-xl font-semibold">Ready to add $5,000–$25,000 to your net?</h3>
      <p className="text-gray-600 mt-1">Choose the support level that fits your style.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a className="btn btn-primary" href="/book?tier=commission-smart">Tier 1 · Commission-Smart Support</a>
        <a className="btn btn-ghost" href="/book?tier=full-service">Tier 2 · Full-Service Luxury Listing</a>
        <a className="btn btn-ghost" href="/book?tier=white-glove">Tier 3 · White-Glove Concierge Sale</a>
      </div>
    </section>
  )
}

import NetSheet from '@/components/netsheet'
import CTASection from '@/components/ctasection'

export default function NetSheetPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Net Seller Sheet (AZ)</h2>
        <p className="text-gray-600">
          Estimate your proceeds with Scottsdale-ready defaults and commission scenarios.
        </p>
      </div>
      <NetSheet />
      <CTASection />
    </div>
  )
}

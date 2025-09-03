import { getAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PropertyDetail({ params }: { params: { id: string } }) {
  const supabase = getAdminClient()
  if (!supabase) return <div className="p-6 text-red-600">Server missing Supabase env.</div>

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) return <div className="p-6 text-red-600">Error: {error.message}</div>
  if (!data) return <div className="p-6">Not found.</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Property</h1>
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Address</div>
            <div>{data.full_address}</div>
          </div>
          <div>
            <div className="text-gray-500">Owner</div>
            <div>{data.owner_name}</div>
          </div>
          <div>
            <div className="text-gray-500">Email</div>
            <div>{data.owner_email}</div>
          </div>
          <div>
            <div className="text-gray-500">Created</div>
            <div>{new Date(data.created_at).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-2">Net Sheet</h3>
        {/* Later we'll bind this to the property values. For now, link to the calculator. */}
        <a className="btn btn-primary" href="/netsheet">Open Net Sheet</a>
      </div>
    </div>
  )
}

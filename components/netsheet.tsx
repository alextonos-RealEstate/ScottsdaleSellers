'use client'
import { useMemo, useState } from 'react'
import CommissionScenarios from '@/components/commissionscenarios'
import { computeNet } from '@/lib/calc'
import PDFDownloadLink from '@/components/pdf/pdfdownload'
import NetSheetPDF from '@/components/pdf/netsheet-pdf'
import React from 'react'

export default function NetSheet() {
  const [salePrice, setSalePrice] = useState(1_000_000)
  const [loanPayoff, setLoanPayoff] = useState(450_000)
  const [commission, setCommission] = useState(5.0)
  const [costs, setCosts] = useState({
    titleEscrowPct: 0.6,
    hoaTransfer: 400,
    recordingFees: 200,
    homeWarranty: 700,
    sellerCredits: 0,
    otherFees: 0
  })

  const result = useMemo(
    () => computeNet({ salePrice, loanPayoff, commissionRate: commission, costs }),
    [salePrice, loanPayoff, commission, costs]
  )

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="card p-6">
          <h3 className="text-lg font-semibold">Sale Inputs</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-sm">
              Estimated Sale Price
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
              />
            </label>
            <label className="text-sm">
              Loan Payoff
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={loanPayoff}
                onChange={(e) => setLoanPayoff(Number(e.target.value))}
              />
            </label>
            <label className="text-sm">
              Commission Rate (%)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                step="0.1"
                value={commission}
                onChange={(e) => setCommission(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Closing Costs</h3>
            <button
              className="btn btn-ghost"
              onClick={() =>
                setCosts({
                  titleEscrowPct: 0.6,
                  hoaTransfer: 400,
                  recordingFees: 200,
                  homeWarranty: 700,
                  sellerCredits: 0,
                  otherFees: 0
                })
              }
            >
              Use AZ defaults
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <label>
              Title & Escrow (%)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                step="0.1"
                value={costs.titleEscrowPct}
                onChange={(e) =>
                  setCosts({ ...costs, titleEscrowPct: Number(e.target.value) })
                }
              />
            </label>
            <label>
              HOA Transfer Fee ($)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={costs.hoaTransfer}
                onChange={(e) =>
                  setCosts({ ...costs, hoaTransfer: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Recording Fees ($)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={costs.recordingFees}
                onChange={(e) =>
                  setCosts({ ...costs, recordingFees: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Home Warranty ($)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={costs.homeWarranty}
                onChange={(e) =>
                  setCosts({ ...costs, homeWarranty: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Seller Credits to Buyer ($)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={costs.sellerCredits}
                onChange={(e) =>
                  setCosts({ ...costs, sellerCredits: Number(e.target.value) })
                }
              />
            </label>
            <label>
              Other Fees ($)
              <input
                className="mt-1 w-full border rounded-lg px-3 py-2"
                type="number"
                value={costs.otherFees}
                onChange={(e) =>
                  setCosts({ ...costs, otherFees: Number(e.target.value) })
                }
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-6 bg-gradient-to-br from-brand-navy to-slate-800 text-white">
          <div className="text-sm opacity-80">Estimated Net Proceeds</div>
          <div className="text-4xl font-bold mt-1">
            ${result.net.toLocaleString()}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="card bg-white/10 border-white/20 p-4">
              <div className="opacity-80">Gross Sale Price</div>
              <div className="text-xl font-semibold">
                ${salePrice.toLocaleString()}
              </div>
            </div>
            <div className="card bg-white/10 border-white/20 p-4">
              <div className="opacity-80">Total Deductions</div>
              <div className="text-xl font-semibold">
                -${result.totalDeductions.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm grid grid-cols-2 gap-2">
            <div>Loan Payoff</div>
            <div className="text-right">
              ${result.breakdown.loanPayoff.toLocaleString()}
            </div>
            <div>Commission</div>
            <div className="text-right">
              ${result.breakdown.commission.toLocaleString()}
            </div>
            <div>Total Closing Costs</div>
            <div className="text-right">
              ${result.breakdown.totalClosing.toLocaleString()}
            </div>
          </div>

          {/* Download PDF button */}
          <div className="mt-4">
            <PDFDownloadLink
              document={
                <NetSheetPDF
                  salePrice={salePrice}
                  loanPayoff={loanPayoff}
                  commissionRate={commission}
                  breakdown={{
                    commission: result.breakdown.commission,
                    totalClosing: result.breakdown.totalClosing,
                    loanPayoff: result.breakdown.loanPayoff
                  }}
                  net={result.net}
                />
              }
              fileName={`Net-Sheet-${salePrice}.pdf`}
              className="btn btn-primary"
            >
              {({ loading }: { loading: boolean }) =>
                (loading ? 'Preparing PDF…' : 'Download PDF') as React.ReactNode
              }
            </PDFDownloadLink>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Commission Scenarios</h3>
          <CommissionScenarios scenarios={result.scenarios} active={commission} />
          <p className="text-xs text-gray-600 mt-2">
            Every 0.5% change in commission moves your net by $
            {(salePrice * 0.005).toLocaleString()}.
          </p>
        </div>
      </div>
    </div>
  )
}

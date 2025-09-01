export type NetInputs = {
  salePrice: number
  loanPayoff: number
  commissionRate: number
  costs: {
    titleEscrowPct: number
    hoaTransfer: number
    recordingFees: number
    homeWarranty: number
    sellerCredits: number
    otherFees: number
  }
}

export function dollars(n: number) {
  return Math.round(n)
}

export function computeNet(inputs: NetInputs) {
  const { salePrice, loanPayoff, commissionRate, costs } = inputs
  const commission = salePrice * (commissionRate / 100)
  const titleEscrow = salePrice * (costs.titleEscrowPct / 100)
  const totalClosing =
    titleEscrow +
    costs.hoaTransfer +
    costs.recordingFees +
    costs.homeWarranty +
    costs.sellerCredits +
    costs.otherFees

  const totalDeductions = commission + totalClosing + loanPayoff
  const net = salePrice - totalDeductions

  const breakdown = {
    loanPayoff: dollars(loanPayoff),
    commission: dollars(commission),
    totalClosing: dollars(totalClosing),
    detail: {
      titleEscrow: dollars(titleEscrow),
      hoaTransfer: dollars(costs.hoaTransfer),
      recordingFees: dollars(costs.recordingFees),
      homeWarranty: dollars(costs.homeWarranty),
      sellerCredits: dollars(costs.sellerCredits),
      otherFees: dollars(costs.otherFees)
    }
  }

  const scenarioRates = [6.0, 5.5, 5.0, 4.5]
  const scenarios = scenarioRates.map((r) => {
    const c = dollars(salePrice * (r / 100))
    const deds = c + totalClosing + loanPayoff
    return { rate: r, commission: c, net: dollars(salePrice - deds) }
  })

  return { net: dollars(net), totalDeductions: dollars(totalDeductions), breakdown, scenarios }
}

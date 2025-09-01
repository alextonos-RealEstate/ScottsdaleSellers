// components/pdf/netsheet-pdf.tsx
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12 },
  h1: { fontSize: 18, marginBottom: 4 },
  sub: { color: '#6b7280', marginBottom: 12 },
  section: { marginTop: 12, padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: '#6b7280' },
  strong: { fontSize: 14, fontWeight: 700 }
})

export type NetSheetPDFProps = {
  salePrice: number
  loanPayoff: number
  commissionRate: number
  breakdown: {
    commission: number
    totalClosing: number
    loanPayoff: number
  }
  net: number
}

export default function NetSheetPDF(props: NetSheetPDFProps) {
  const { salePrice, loanPayoff, commissionRate, breakdown, net } = props
  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>Scottsdale Luxury Seller Blueprint — Net Sheet</Text>
        <Text style={styles.sub}>Maricopa County · Commission-smart estimate</Text>

        <View style={styles.section}>
          <View style={styles.row}><Text style={styles.label}>Estimated Sale Price</Text><Text>{fmt(salePrice)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Loan Payoff</Text><Text>{fmt(loanPayoff)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Commission Rate</Text><Text>{commissionRate.toFixed(1)}%</Text></View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}><Text style={styles.label}>Commission</Text><Text>{fmt(breakdown.commission)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Total Closing Costs</Text><Text>{fmt(breakdown.totalClosing)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Loan Payoff</Text><Text>{fmt(breakdown.loanPayoff)}</Text></View>
        </View>

        <View style={styles.section}>
          <View style={styles.row}><Text style={styles.strong}>Estimated Net Proceeds</Text><Text style={styles.strong}>{fmt(net)}</Text></View>
        </View>

        <Text style={{ marginTop: 12, color: '#6b7280' }}>
          Estimates only. Exact figures depend on title/escrow statements, HOA status letters, and negotiated credits.
        </Text>
      </Page>
    </Document>
  )
}

'use client'
import dynamic from 'next/dynamic'
import React from 'react'

// Loosely typed, client-only wrapper around PDFDownloadLink
type AnyProps = any

const ClientPDFDownloadLink: React.FC<AnyProps> = dynamic(async () => {
  const mod = await import('@react-pdf/renderer')
  const Comp: React.FC<AnyProps> = (props) => <mod.PDFDownloadLink {...props} />
  return Comp
}, { ssr: false }) as any

export default ClientPDFDownloadLink

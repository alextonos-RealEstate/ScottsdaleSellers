'use client'
import dynamic from 'next/dynamic'
import React from 'react'

// This wraps the named export PDFDownloadLink and ensures it only loads on the client.
const ClientPDFDownloadLink = dynamic(async () => {
  const mod = await import('@react-pdf/renderer')
  // Return a component that forwards all props to PDFDownloadLink
  return function WrappedPDFDownloadLink(props: React.ComponentProps<typeof mod.PDFDownloadLink>) {
    return <mod.PDFDownloadLink {...props} />
  }
}, { ssr: false })

export default ClientPDFDownloadLink

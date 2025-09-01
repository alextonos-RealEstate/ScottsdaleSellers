import './globals.css'
import { Inter } from 'next/font/google'
import Logo from '@/components/logo'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scottsdale Sellers — Net Seller Sheet',
  description: 'Commission-Smart calculator for Maricopa County luxury homeowners.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <a className="btn btn-ghost" href="/dashboard">Dashboard</a>
              <a className="btn btn-ghost" href="/analytics">Analytics</a>
              <a className="btn btn-primary" href="/netsheet">Net Sheet</a>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t mt-12">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
            © Scottsdale Sellers · by Alex Tonos | Mike Domer Group
          </div>
        </footer>
      </body>
    </html>
  )
}

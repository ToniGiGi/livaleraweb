import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const montserrat = Montserrat({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Logística Integral Valera  -  Transporte de Carga en México',
  description:
    'Empresa líder en transporte de carga terrestre en México. Especialistas en rabones, camionetas 3/2, cajas 48\' y 53\', full y sencillo. Sede en Manzanillo con sucursales en 7 estados.',
  generator: 'v0.app',
  keywords: [
    'logistica',
    'transporte',
    'carga',
    'Mexico',
    'Manzanillo',
    'Valera',
    'camion',
    'trailer',
    'flete',
  ],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0D1F5C',
}

import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}

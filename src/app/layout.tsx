import type { Metadata } from 'next'
import { Kumbh_Sans, Roboto_Slab, Space_Mono } from 'next/font/google'
import '@/styles/globals.sass'

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-family',
})
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: '700',
  variable: '--second-family',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--third-family',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${kumbhSans.variable} ${robotoSlab.variable} ${spaceMono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}

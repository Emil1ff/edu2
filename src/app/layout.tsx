import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import './globals.css'
import { ThemeProvider } from "@/contexts/ThemeContext"
import { StoreProvider } from "@/components/StoreProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Təhsil Platforması - Gələcəyinizi Təhsillə Qurun",
  description:
    "Müasir texnologiyaları öyrənin və karyeranızı yeni səviyyəyə qaldırın. Frontend, Backend, UI/UX və daha çox sahədə keyfiyyətli kurslar.",
  keywords: "təhsil, kurs, proqramlaşdırma, react, javascript, python, ui/ux",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body cz-shortcut-listen="true" className={inter.className}>
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}

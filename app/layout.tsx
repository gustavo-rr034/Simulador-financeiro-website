import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Simulador Financeiro Pessoal",
  description: "Organize sua renda, despesas e metas financeiras de forma inteligente",
  generator: "Next.js",
  keywords: ["finanças", "simulador", "orçamento", "metas financeiras", "controle financeiro"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

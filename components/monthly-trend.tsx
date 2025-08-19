"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", receitas: 6500, despesas: 4200, saldo: 2300 },
  { month: "Fev", receitas: 6500, despesas: 4800, saldo: 1700 },
  { month: "Mar", receitas: 7200, despesas: 4100, saldo: 3100 },
  { month: "Abr", receitas: 6500, despesas: 4600, saldo: 1900 },
  { month: "Mai", receitas: 6500, despesas: 3900, saldo: 2600 },
  { month: "Jun", receitas: 6800, despesas: 4250, saldo: 2550 },
]

const chartConfig = {
  receitas: {
    label: "Receitas",
    color: "hsl(var(--chart-1))",
  },
  despesas: {
    label: "Despesas",
    color: "hsl(var(--chart-2))",
  },
  saldo: {
    label: "Saldo",
    color: "hsl(var(--chart-3))",
  },
}

export function MonthlyTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução Mensal</CardTitle>
        <CardDescription>Acompanhe a evolução das suas finanças ao longo dos meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
              />
              <Line
                type="monotone"
                dataKey="receitas"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="despesas"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="saldo"
                stroke="hsl(var(--chart-3))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="flex justify-center gap-6 mt-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
              <span className="text-sm text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

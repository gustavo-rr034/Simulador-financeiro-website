"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Moradia", value: 1800, color: "hsl(var(--chart-1))" },
  { name: "Alimentação", value: 800, color: "hsl(var(--chart-2))" },
  { name: "Transporte", value: 600, color: "hsl(var(--chart-3))" },
  { name: "Lazer", value: 400, color: "hsl(var(--chart-4))" },
  { name: "Outros", value: 650, color: "hsl(var(--chart-5))" },
]

const chartConfig = {
  moradia: {
    label: "Moradia",
    color: "hsl(var(--chart-1))",
  },
  alimentacao: {
    label: "Alimentação",
    color: "hsl(var(--chart-2))",
  },
  transporte: {
    label: "Transporte",
    color: "hsl(var(--chart-3))",
  },
  lazer: {
    label: "Lazer",
    color: "hsl(var(--chart-4))",
  },
  outros: {
    label: "Outros",
    color: "hsl(var(--chart-5))",
  },
}

export function ExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Despesas</CardTitle>
        <CardDescription>Suas despesas por categoria este mês</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium ml-auto">R$ {item.value.toLocaleString("pt-BR")}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

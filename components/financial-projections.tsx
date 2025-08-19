"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, DollarSign } from "lucide-react"

const projectionData = [
  { month: "Jan", atual: 15750, projecao: 15750, cenarioOtimista: 15750, cenarioPessimista: 15750 },
  { month: "Fev", atual: null, projecao: 17200, cenarioOtimista: 18500, cenarioPessimista: 16200 },
  { month: "Mar", atual: null, projecao: 18650, cenarioOtimista: 21250, cenarioPessimista: 16650 },
  { month: "Abr", atual: null, projecao: 20100, cenarioOtimista: 24000, cenarioPessimista: 17100 },
  { month: "Mai", atual: null, projecao: 21550, cenarioOtimista: 26750, cenarioPessimista: 17550 },
  { month: "Jun", atual: null, projecao: 23000, cenarioOtimista: 29500, cenarioPessimista: 18000 },
]

const chartConfig = {
  atual: {
    label: "Saldo Atual",
    color: "hsl(var(--chart-1))",
  },
  projecao: {
    label: "Projeção",
    color: "hsl(var(--chart-2))",
  },
  cenarioOtimista: {
    label: "Cenário Otimista",
    color: "hsl(var(--chart-3))",
  },
  cenarioPessimista: {
    label: "Cenário Pessimista",
    color: "hsl(var(--chart-4))",
  },
}

export function FinancialProjections() {
  const currentBalance = 15750
  const projectedBalance6Months = 23000
  const balanceGrowth = projectedBalance6Months - currentBalance
  const monthlyGrowth = balanceGrowth / 6

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projeções Financeiras</CardTitle>
        <CardDescription>Previsão do seu saldo baseada nos padrões atuais de gastos e receitas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Saldo em 6 meses</span>
            </div>
            <p className="text-2xl font-bold text-primary">R$ {projectedBalance6Months.toLocaleString("pt-BR")}</p>
          </div>

          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Crescimento Total</span>
            </div>
            <p className="text-2xl font-bold text-secondary">R$ {balanceGrowth.toLocaleString("pt-BR")}</p>
          </div>

          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-chart-3" />
              <span className="text-sm font-medium">Crescimento Mensal</span>
            </div>
            <p className="text-2xl font-bold text-chart-3">R$ {monthlyGrowth.toLocaleString("pt-BR")}</p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProjecao" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`R$ ${value?.toLocaleString("pt-BR")}`, ""]}
              />
              <Area
                type="monotone"
                dataKey="cenarioOtimista"
                stroke="hsl(var(--chart-3))"
                strokeWidth={1}
                strokeDasharray="5,5"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="cenarioPessimista"
                stroke="hsl(var(--chart-4))"
                strokeWidth={1}
                strokeDasharray="5,5"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="projecao"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                fill="url(#colorProjecao)"
              />
              <Line
                type="monotone"
                dataKey="atual"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
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

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">Análise da Projeção</h4>
          <p className="text-sm text-muted-foreground">
            Baseado nos seus padrões de gastos e receitas dos últimos 3 meses, você está no caminho certo para aumentar
            seu patrimônio em R$ {balanceGrowth.toLocaleString("pt-BR")} nos próximos 6 meses. Continue mantendo suas
            despesas controladas e considere aumentar sua renda para acelerar o crescimento.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

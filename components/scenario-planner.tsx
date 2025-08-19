"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, TrendingDown } from "lucide-react"

export function ScenarioPlanner() {
  const [scenario, setScenario] = useState({
    incomeChange: "",
    expenseChange: "",
    timeframe: "6",
    type: "percentage",
  })

  const [result, setResult] = useState<{
    newBalance: number
    difference: number
    monthlyImpact: number
  } | null>(null)

  const currentBalance = 15750
  const currentMonthlyIncome = 6500
  const currentMonthlyExpenses = 4250
  const currentMonthlySavings = currentMonthlyIncome - currentMonthlyExpenses

  const calculateScenario = () => {
    const incomeChange = Number.parseFloat(scenario.incomeChange) || 0
    const expenseChange = Number.parseFloat(scenario.expenseChange) || 0
    const months = Number.parseInt(scenario.timeframe)

    let newMonthlyIncome = currentMonthlyIncome
    let newMonthlyExpenses = currentMonthlyExpenses

    if (scenario.type === "percentage") {
      newMonthlyIncome = currentMonthlyIncome * (1 + incomeChange / 100)
      newMonthlyExpenses = currentMonthlyExpenses * (1 + expenseChange / 100)
    } else {
      newMonthlyIncome = currentMonthlyIncome + incomeChange
      newMonthlyExpenses = currentMonthlyExpenses + expenseChange
    }

    const newMonthlySavings = newMonthlyIncome - newMonthlyExpenses
    const newBalance = currentBalance + newMonthlySavings * months
    const originalProjectedBalance = currentBalance + currentMonthlySavings * months
    const difference = newBalance - originalProjectedBalance
    const monthlyImpact = newMonthlySavings - currentMonthlySavings

    setResult({
      newBalance,
      difference,
      monthlyImpact,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Planejador de Cenários
        </CardTitle>
        <CardDescription>Simule diferentes cenários e veja o impacto nas suas finanças</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mudança na Renda</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0"
                value={scenario.incomeChange}
                onChange={(e) => setScenario({ ...scenario, incomeChange: e.target.value })}
              />
              <Select value={scenario.type} onValueChange={(value) => setScenario({ ...scenario, type: value })}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">%</SelectItem>
                  <SelectItem value="absolute">R$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Mudança nas Despesas</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0"
                value={scenario.expenseChange}
                onChange={(e) => setScenario({ ...scenario, expenseChange: e.target.value })}
              />
              <Select value={scenario.type} onValueChange={(value) => setScenario({ ...scenario, type: value })}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">%</SelectItem>
                  <SelectItem value="absolute">R$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Período de Análise</Label>
          <Select value={scenario.timeframe} onValueChange={(value) => setScenario({ ...scenario, timeframe: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 meses</SelectItem>
              <SelectItem value="6">6 meses</SelectItem>
              <SelectItem value="12">1 ano</SelectItem>
              <SelectItem value="24">2 anos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateScenario} className="w-full">
          Calcular Cenário
        </Button>

        {result && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg space-y-3">
            <h4 className="font-medium">Resultado da Simulação</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Saldo Projetado</p>
                <p className="text-xl font-bold text-primary">R$ {result.newBalance.toLocaleString("pt-BR")}</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Diferença</p>
                <div className="flex items-center justify-center gap-1">
                  {result.difference > 0 ? (
                    <TrendingUp className="w-4 h-4 text-primary" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <p className={`text-xl font-bold ${result.difference > 0 ? "text-primary" : "text-destructive"}`}>
                    {result.difference > 0 ? "+" : ""}R$ {result.difference.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Impacto Mensal</p>
                <div className="flex items-center justify-center gap-1">
                  {result.monthlyImpact > 0 ? (
                    <TrendingUp className="w-4 h-4 text-primary" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                  <p className={`text-xl font-bold ${result.monthlyImpact > 0 ? "text-primary" : "text-destructive"}`}>
                    {result.monthlyImpact > 0 ? "+" : ""}R$ {result.monthlyImpact.toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              {result.difference > 0
                ? `Este cenário resultaria em um ganho adicional de R$ ${result.difference.toLocaleString("pt-BR")} no período.`
                : `Este cenário resultaria em uma perda de R$ ${Math.abs(result.difference).toLocaleString("pt-BR")} no período.`}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

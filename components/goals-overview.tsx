import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, Calendar, DollarSign } from "lucide-react"

export function GoalsOverview() {
  // Mock data - will be replaced with real data later
  const data = {
    totalGoals: 4,
    completedGoals: 1,
    totalTargetAmount: 125000,
    totalSavedAmount: 34700,
    monthlyTarget: 3200,
  }

  const completionRate = (data.completedGoals / data.totalGoals) * 100
  const savingsProgress = (data.totalSavedAmount / data.totalTargetAmount) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Metas Ativas</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalGoals}</div>
          <p className="text-xs text-muted-foreground">
            {data.completedGoals} concluída{data.completedGoals !== 1 ? "s" : ""} ({completionRate.toFixed(0)}%)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">R$ {data.totalTargetAmount.toLocaleString("pt-BR")}</div>
          <p className="text-xs text-muted-foreground">Soma de todas as metas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{savingsProgress.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            R$ {data.totalSavedAmount.toLocaleString("pt-BR")} economizados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Meta Mensal</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-1">R$ {data.monthlyTarget.toLocaleString("pt-BR")}</div>
          <p className="text-xs text-muted-foreground">Para atingir todas as metas</p>
        </CardContent>
      </Card>
    </div>
  )
}

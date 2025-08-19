import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function FinancialOverview() {
  // Mock data - will be replaced with real data later
  const data = {
    currentBalance: 15750.5,
    monthlyExpenses: 4250.0,
    monthlyIncome: 6500.0,
    activeGoals: 3,
    balanceChange: 2250.0, // Added balance change tracking
    expenseChange: -5.2, // Added expense change percentage
    incomeChange: 8.1, // Added income change percentage
  }

  const isBalancePositive = data.balanceChange > 0
  const isExpenseChangePositive = data.expenseChange > 0
  const isIncomeChangePositive = data.incomeChange > 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            R$ {data.currentBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {isBalancePositive ? (
              <ArrowUpRight className="h-3 w-3 text-primary" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-destructive" />
            )}
            <p className={`text-xs ${isBalancePositive ? "text-primary" : "text-destructive"}`}>
              R$ {Math.abs(data.balanceChange).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} este mês
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            R$ {data.monthlyExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {isExpenseChangePositive ? (
              <ArrowUpRight className="h-3 w-3 text-destructive" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-primary" />
            )}
            <p className={`text-xs ${isExpenseChangePositive ? "text-destructive" : "text-primary"}`}>
              {Math.abs(data.expenseChange)}% vs mês anterior
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renda Mensal</CardTitle>
          <TrendingUp className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            R$ {data.monthlyIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {isIncomeChangePositive ? (
              <ArrowUpRight className="h-3 w-3 text-primary" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-destructive" />
            )}
            <p className={`text-xs ${isIncomeChangePositive ? "text-primary" : "text-destructive"}`}>
              {Math.abs(data.incomeChange)}% vs mês anterior
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Metas Ativas</CardTitle>
          <Target className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{data.activeGoals}</div>
          <p className="text-xs text-muted-foreground">Objetivos em andamento</p>
        </CardContent>
      </Card>
    </div>
  )
}

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { FinancialOverview } from "@/components/financial-overview"
import { ExpenseChart } from "@/components/expense-chart"
import { GoalsProgress } from "@/components/goals-progress"
import { MonthlyTrend } from "@/components/monthly-trend"
import { QuickActions } from "@/components/quick-actions"
import { RecentTransactions } from "@/components/recent-transactions"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dashboard Financeiro</h2>
              <p className="text-muted-foreground">Visão geral das suas finanças</p>
            </div>
            <QuickActions />
          </div>

          <FinancialOverview />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <MonthlyTrend />
              <RecentTransactions />
            </div>
            <div className="space-y-6">
              <ExpenseChart />
              <GoalsProgress />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

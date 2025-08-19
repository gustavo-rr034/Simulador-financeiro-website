import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { FinancialProjections } from "@/components/financial-projections"
import { AlertsPanel } from "@/components/alerts-panel"
import { RecommendationsPanel } from "@/components/recommendations-panel"
import { ScenarioPlanner } from "@/components/scenario-planner"

export default function ProjectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Projeções e Alertas</h2>
              <p className="text-muted-foreground">
                Análise preditiva das suas finanças e recomendações personalizadas
              </p>
            </div>
          </div>

          <AlertsPanel />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <FinancialProjections />
              <ScenarioPlanner />
            </div>
            <div>
              <RecommendationsPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

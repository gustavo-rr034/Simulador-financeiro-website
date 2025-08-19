import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { GoalsList } from "@/components/goals-list"
import { GoalsOverview } from "@/components/goals-overview"
import { AddGoalDialog } from "@/components/add-goal-dialog"

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Metas Financeiras</h2>
              <p className="text-muted-foreground">Defina e acompanhe seus objetivos financeiros</p>
            </div>
            <AddGoalDialog />
          </div>

          <GoalsOverview />
          <GoalsList />
        </main>
      </div>
    </div>
  )
}

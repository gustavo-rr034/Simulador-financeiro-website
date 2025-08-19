import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus, Target } from "lucide-react"

const goals = [
  {
    id: 1,
    name: "Reserva de Emergência",
    target: 30000,
    current: 18500,
    deadline: "2025-12-31",
  },
  {
    id: 2,
    name: "Viagem para Europa",
    target: 15000,
    current: 4200,
    deadline: "2025-07-15",
  },
  {
    id: 3,
    name: "Novo Carro",
    target: 45000,
    current: 12000,
    deadline: "2026-03-01",
  },
]

export function GoalsProgress() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Metas Financeiras</CardTitle>
            <CardDescription>Acompanhe o progresso dos seus objetivos</CardDescription>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Meta
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current

          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-secondary" />
                  <span className="font-medium">{goal.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
              </div>

              <Progress value={progress} className="h-2" />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  R$ {goal.current.toLocaleString("pt-BR")} de R$ {goal.target.toLocaleString("pt-BR")}
                </span>
                <span>Faltam R$ {remaining.toLocaleString("pt-BR")}</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Target, DollarSign, ArrowRight } from "lucide-react"

const recommendations = [
  {
    id: 1,
    type: "savings",
    title: "Reduza Gastos com Lazer",
    description: "Você pode economizar R$ 200/mês limitando gastos com entretenimento a R$ 300.",
    impact: 200,
    difficulty: "Fácil",
    category: "Economia",
    priority: "high",
  },
  {
    id: 2,
    type: "income",
    title: "Renda Extra com Freelances",
    description: "Considere trabalhos freelance para aumentar sua renda em 15-20%.",
    impact: 1000,
    difficulty: "Médio",
    category: "Renda",
    priority: "medium",
  },
  {
    id: 3,
    type: "investment",
    title: "Invista sua Reserva",
    description: "Coloque parte da reserva em CDB ou Tesouro Direto para render mais.",
    impact: 150,
    difficulty: "Fácil",
    category: "Investimento",
    priority: "medium",
  },
  {
    id: 4,
    type: "goal",
    title: "Acelere sua Meta de Viagem",
    description: "Aumente em R$ 100/mês para atingir sua meta 2 meses antes.",
    impact: 100,
    difficulty: "Médio",
    category: "Metas",
    priority: "low",
  },
]

export function RecommendationsPanel() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive"
      case "medium":
        return "bg-yellow-500/10 text-yellow-600"
      case "low":
        return "bg-blue-500/10 text-blue-600"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Economia":
        return <DollarSign className="w-4 h-4" />
      case "Renda":
        return <TrendingUp className="w-4 h-4" />
      case "Investimento":
        return <Target className="w-4 h-4" />
      case "Metas":
        return <Target className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + rec.impact, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          Recomendações
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Potencial de economia: <span className="font-semibold text-primary">R$ {totalPotentialSavings}/mês</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full mt-1">{getCategoryIcon(rec.category)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-sm">{rec.title}</h4>
                  <Badge variant="secondary" className={getPriorityColor(rec.priority)}>
                    {rec.priority === "high" ? "Alta" : rec.priority === "medium" ? "Média" : "Baixa"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Impacto: R$ {rec.impact}/mês</span>
                    <span>• {rec.difficulty}</span>
                    <span>• {rec.category}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs gap-1">
                    Aplicar
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full bg-transparent">
            Ver Todas as Recomendações
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingDown, Target, Calendar, X } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Gastos com Alimentação Acima da Média",
    description: "Você gastou 23% a mais com alimentação este mês comparado à média dos últimos 3 meses.",
    amount: 920,
    category: "Alimentação",
    severity: "medium",
    date: "2024-01-15",
  },
  {
    id: 2,
    type: "danger",
    title: "Meta de Reserva de Emergência em Risco",
    description: "No ritmo atual, você não conseguirá atingir sua meta até o prazo estabelecido.",
    goalName: "Reserva de Emergência",
    severity: "high",
    date: "2024-01-14",
  },
  {
    id: 3,
    type: "info",
    title: "Oportunidade de Economia",
    description: "Você pode economizar R$ 180/mês cancelando assinaturas não utilizadas.",
    amount: 180,
    severity: "low",
    date: "2024-01-13",
  },
]

export function AlertsPanel() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "low":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      case "medium":
        return <TrendingDown className="w-4 h-4" />
      case "low":
        return <Target className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high":
        return "Crítico"
      case "medium":
        return "Atenção"
      case "low":
        return "Informativo"
      default:
        return "Alerta"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Alertas Ativos ({alerts.length})
          </CardTitle>
          <Button variant="outline" size="sm">
            Configurar Alertas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {getSeverityLabel(alert.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs opacity-75">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(alert.date).toLocaleDateString("pt-BR")}</span>
                      </div>
                      {alert.amount && <span>R$ {alert.amount.toLocaleString("pt-BR")}</span>}
                      {alert.category && <span>• {alert.category}</span>}
                      {alert.goalName && <span>• {alert.goalName}</span>}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-50 hover:opacity-100">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

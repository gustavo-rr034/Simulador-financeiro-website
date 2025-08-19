"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, Edit, Trash2, Plus, Target, Calendar, TrendingUp } from "lucide-react"

const mockGoals = [
  {
    id: 1,
    name: "Reserva de Emergência",
    description: "6 meses de despesas essenciais",
    targetAmount: 30000,
    currentAmount: 18500,
    deadline: "2024-12-31",
    category: "Segurança",
    status: "active",
  },
  {
    id: 2,
    name: "Viagem para Europa",
    description: "Férias de 15 dias na Europa",
    targetAmount: 15000,
    currentAmount: 4200,
    deadline: "2024-07-15",
    category: "Lazer",
    status: "active",
  },
  {
    id: 3,
    name: "Novo Carro",
    description: "Entrada para financiamento",
    targetAmount: 25000,
    currentAmount: 12000,
    deadline: "2025-03-01",
    category: "Transporte",
    status: "active",
  },
  {
    id: 4,
    name: "Curso de Especialização",
    description: "MBA em Gestão Financeira",
    targetAmount: 8000,
    currentAmount: 8000,
    deadline: "2024-02-01",
    category: "Educação",
    status: "completed",
  },
]

export function GoalsList() {
  const [goals, setGoals] = useState(mockGoals)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setGoals(goals.filter((g) => g.id !== id))
    setDeleteId(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const calculateMonthlySavings = (goal: (typeof mockGoals)[0]) => {
    const remaining = goal.targetAmount - goal.currentAmount
    const deadline = new Date(goal.deadline)
    const now = new Date()
    const monthsRemaining = Math.max(1, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)))
    return remaining / monthsRemaining
  }

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const now = new Date()
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Segurança: "bg-primary/10 text-primary",
      Lazer: "bg-secondary/10 text-secondary",
      Transporte: "bg-chart-3/10 text-chart-3",
      Educação: "bg-chart-4/10 text-chart-4",
      Moradia: "bg-chart-1/10 text-chart-1",
      Saúde: "bg-chart-5/10 text-chart-5",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  const activeGoals = goals.filter((g) => g.status === "active")
  const completedGoals = goals.filter((g) => g.status === "completed")

  return (
    <>
      <div className="space-y-6">
        {/* Active Goals */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Metas Ativas ({activeGoals.length})</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeGoals.map((goal) => {
              const progress = calculateProgress(goal.currentAmount, goal.targetAmount)
              const monthlySavings = calculateMonthlySavings(goal)
              const daysRemaining = getDaysRemaining(goal.deadline)
              const isOverdue = daysRemaining < 0

              return (
                <Card key={goal.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                          <Badge variant="secondary" className={getCategoryColor(goal.category)}>
                            {goal.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Plus className="w-4 h-4" />
                            Adicionar Valor
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="w-4 h-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive" onClick={() => setDeleteId(goal.id)}>
                            <Trash2 className="w-4 h-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progresso</span>
                        <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>R$ {goal.currentAmount.toLocaleString("pt-BR")}</span>
                        <span>R$ {goal.targetAmount.toLocaleString("pt-BR")}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <Calendar className="w-3 h-3" />
                          <span>Prazo</span>
                        </div>
                        <p className={`font-medium ${isOverdue ? "text-destructive" : ""}`}>
                          {formatDate(goal.deadline)}
                          {isOverdue ? " (Vencido)" : ` (${daysRemaining} dias)`}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Mensal</span>
                        </div>
                        <p className="font-medium text-primary">
                          R$ {monthlySavings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Faltam R$ {(goal.targetAmount - goal.currentAmount).toLocaleString("pt-BR")} para atingir sua
                        meta
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Metas Concluídas ({completedGoals.length})</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completedGoals.map((goal) => (
                <Card key={goal.id} className="relative opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Concluída
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Valor atingido:</span>
                      <span className="font-semibold text-primary">R$ {goal.targetAmount.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-muted-foreground">Concluída em:</span>
                      <span className="text-sm">{formatDate(goal.deadline)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir meta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta meta? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

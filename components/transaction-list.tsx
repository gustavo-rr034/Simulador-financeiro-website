"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Edit, Trash2, Calendar } from "lucide-react"

const mockTransactions = [
  {
    id: 1,
    description: "Salário - Empresa XYZ",
    amount: 6500,
    type: "income",
    category: "Salário",
    date: "2024-01-15",
    notes: "Salário mensal",
  },
  {
    id: 2,
    description: "Supermercado ABC",
    amount: -280,
    type: "expense",
    category: "Alimentação",
    date: "2024-01-14",
    notes: "Compras da semana",
  },
  {
    id: 3,
    description: "Aluguel Apartamento",
    amount: -1800,
    type: "expense",
    category: "Moradia",
    date: "2024-01-10",
    notes: "Aluguel mensal",
  },
  {
    id: 4,
    description: "Freelance - Projeto Web",
    amount: 1200,
    type: "income",
    category: "Freelance",
    date: "2024-01-08",
    notes: "Desenvolvimento de website",
  },
  {
    id: 5,
    description: "Combustível",
    amount: -150,
    type: "expense",
    category: "Transporte",
    date: "2024-01-07",
    notes: "Abastecimento do carro",
  },
  {
    id: 6,
    description: "Academia",
    amount: -89,
    type: "expense",
    category: "Saúde",
    date: "2024-01-05",
    notes: "Mensalidade da academia",
  },
  {
    id: 7,
    description: "Dividendos - Ações",
    amount: 320,
    type: "income",
    category: "Investimentos",
    date: "2024-01-03",
    notes: "Dividendos recebidos",
  },
  {
    id: 8,
    description: "Restaurante",
    amount: -85,
    type: "expense",
    category: "Lazer",
    date: "2024-01-02",
    notes: "Jantar em família",
  },
]

export function TransactionList() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter((t) => t.id !== id))
    setDeleteId(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Salário: "bg-primary/10 text-primary",
      Freelance: "bg-secondary/10 text-secondary",
      Investimentos: "bg-chart-3/10 text-chart-3",
      Moradia: "bg-chart-1/10 text-chart-1",
      Alimentação: "bg-chart-2/10 text-chart-2",
      Transporte: "bg-chart-4/10 text-chart-4",
      Saúde: "bg-chart-5/10 text-chart-5",
      Lazer: "bg-accent/10 text-accent",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Histórico de Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{transaction.description}</p>
                      <Badge variant="secondary" className={getCategoryColor(transaction.category)}>
                        {transaction.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(transaction.date)}</span>
                      {transaction.notes && <span>• {transaction.notes}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`font-semibold text-lg ${
                      transaction.type === "income" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : ""}R${" "}
                    {Math.abs(transaction.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive" onClick={() => setDeleteId(transaction.id)}>
                        <Trash2 className="w-4 h-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline">Carregar mais transações</Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir transação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
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

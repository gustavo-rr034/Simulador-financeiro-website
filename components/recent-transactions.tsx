import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"

const transactions = [
  {
    id: 1,
    description: "Salário - Empresa XYZ",
    amount: 6500,
    type: "income",
    category: "Salário",
    date: "2024-01-15",
  },
  {
    id: 2,
    description: "Supermercado ABC",
    amount: -280,
    type: "expense",
    category: "Alimentação",
    date: "2024-01-14",
  },
  {
    id: 3,
    description: "Aluguel Apartamento",
    amount: -1800,
    type: "expense",
    category: "Moradia",
    date: "2024-01-10",
  },
  {
    id: 4,
    description: "Freelance - Projeto Web",
    amount: 1200,
    type: "income",
    category: "Extra",
    date: "2024-01-08",
  },
  {
    id: 5,
    description: "Combustível",
    amount: -150,
    type: "expense",
    category: "Transporte",
    date: "2024-01-07",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>Suas últimas movimentações financeiras</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Ver todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "income" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {transaction.type === "income" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{transaction.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${transaction.type === "income" ? "text-primary" : "text-destructive"}`}
                >
                  {transaction.type === "income" ? "+" : ""}R${" "}
                  {Math.abs(transaction.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

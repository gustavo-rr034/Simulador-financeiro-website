import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { TransactionFilters } from "@/components/transaction-filters"
import { TransactionList } from "@/components/transaction-list"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Transações</h2>
              <p className="text-muted-foreground">Gerencie suas receitas e despesas</p>
            </div>
            <AddTransactionDialog />
          </div>

          <TransactionFilters />
          <TransactionList />
        </main>
      </div>
    </div>
  )
}

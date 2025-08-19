import { Button } from "@/components/ui/button"
import { TrendingDown, TrendingUp, Target } from "lucide-react"

export function QuickActions() {
  return (
    <div className="flex gap-2">
      <Button size="sm" className="gap-2">
        <TrendingUp className="w-4 h-4" />
        Nova Receita
      </Button>
      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
        <TrendingDown className="w-4 h-4" />
        Nova Despesa
      </Button>
      <Button size="sm" variant="outline" className="gap-2 bg-transparent">
        <Target className="w-4 h-4" />
        Nova Meta
      </Button>
    </div>
  )
}

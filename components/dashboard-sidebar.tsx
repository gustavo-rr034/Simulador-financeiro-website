"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  CreditCard,
  PieChart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, current: false },
  { name: "Transações", href: "/transactions", icon: CreditCard, current: false },
  { name: "Análises", href: "/analytics", icon: PieChart, current: false },
  { name: "Metas", href: "/goals", icon: Target, current: false },
  { name: "Projeções", href: "/projections", icon: TrendingUp, current: true },
  { name: "Configurações", href: "/settings", icon: Settings, current: false },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("bg-card border-r transition-all duration-300 ease-in-out", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h3 className="text-lg font-semibold text-card-foreground">Menu</h3>}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-1 px-2 pb-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className={cn("w-full justify-start gap-3", collapsed && "justify-center px-2")}
                asChild
              >
                <a href={item.href}>
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </a>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

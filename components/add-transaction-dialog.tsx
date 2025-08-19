"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, TrendingDown } from "lucide-react"

const incomeCategories = ["Salário", "Freelance", "Investimentos", "Vendas", "Aluguel", "Outros"]

const expenseCategories = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Educação",
  "Lazer",
  "Roupas",
  "Tecnologia",
  "Outros",
]

export function AddTransactionDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Registre uma nova receita ou despesa</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="expense" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expense" className="gap-2">
              <TrendingDown className="w-4 h-4" />
              Despesa
            </TabsTrigger>
            <TabsTrigger value="income" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Receita
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expense">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-amount">Valor (R$)</Label>
                  <Input id="expense-amount" type="number" placeholder="0,00" step="0.01" min="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-date">Data</Label>
                  <Input id="expense-date" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-category">Categoria</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-description">Descrição</Label>
                <Input id="expense-description" placeholder="Ex: Supermercado ABC" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expense-notes">Observações (opcional)</Label>
                <Textarea id="expense-notes" placeholder="Informações adicionais..." />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Despesa"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="income">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="income-amount">Valor (R$)</Label>
                  <Input id="income-amount" type="number" placeholder="0,00" step="0.01" min="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income-date">Data</Label>
                  <Input id="income-date" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-category">Categoria</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {incomeCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-description">Descrição</Label>
                <Input id="income-description" placeholder="Ex: Salário - Empresa XYZ" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-notes">Observações (opcional)</Label>
                <Textarea id="income-notes" placeholder="Informações adicionais..." />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Receita"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

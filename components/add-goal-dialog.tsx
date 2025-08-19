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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Target, Car, Plane, Home, GraduationCap, Heart, Wallet } from "lucide-react"

const goalTemplates = [
  {
    id: "emergency",
    name: "Reserva de Emergência",
    description: "6 meses de despesas",
    icon: Wallet,
    suggestedAmount: 25000,
    category: "Segurança",
  },
  {
    id: "car",
    name: "Novo Carro",
    description: "Veículo próprio",
    icon: Car,
    suggestedAmount: 45000,
    category: "Transporte",
  },
  {
    id: "travel",
    name: "Viagem dos Sonhos",
    description: "Férias especiais",
    icon: Plane,
    suggestedAmount: 15000,
    category: "Lazer",
  },
  {
    id: "house",
    name: "Casa Própria",
    description: "Entrada do imóvel",
    icon: Home,
    suggestedAmount: 80000,
    category: "Moradia",
  },
  {
    id: "education",
    name: "Educação",
    description: "Curso ou especialização",
    icon: GraduationCap,
    suggestedAmount: 10000,
    category: "Educação",
  },
  {
    id: "health",
    name: "Saúde",
    description: "Plano de saúde ou tratamento",
    icon: Heart,
    suggestedAmount: 8000,
    category: "Saúde",
  },
]

export function AddGoalDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"template" | "form">("template")
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof goalTemplates)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    description: "",
    category: "",
  })

  const handleTemplateSelect = (template: (typeof goalTemplates)[0]) => {
    setSelectedTemplate(template)
    setFormData({
      name: template.name,
      targetAmount: template.suggestedAmount.toString(),
      currentAmount: "0",
      deadline: "",
      description: template.description,
      category: template.category,
    })
    setStep("form")
  }

  const handleCustomGoal = () => {
    setSelectedTemplate(null)
    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      description: "",
      category: "",
    })
    setStep("form")
  }

  const calculateMonthlySavings = () => {
    if (!formData.targetAmount || !formData.deadline) return 0
    const target = Number.parseFloat(formData.targetAmount)
    const current = Number.parseFloat(formData.currentAmount) || 0
    const remaining = target - current
    const deadline = new Date(formData.deadline)
    const now = new Date()
    const monthsRemaining = Math.max(1, Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)))
    return remaining / monthsRemaining
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setOpen(false)
    setStep("template")
  }

  const resetDialog = () => {
    setStep("template")
    setSelectedTemplate(null)
    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      deadline: "",
      description: "",
      category: "",
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) resetDialog()
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Meta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{step === "template" ? "Escolha um Modelo" : "Configurar Meta"}</DialogTitle>
          <DialogDescription>
            {step === "template"
              ? "Selecione um modelo pré-definido ou crie uma meta personalizada"
              : "Defina os detalhes da sua meta financeira"}
          </DialogDescription>
        </DialogHeader>

        {step === "template" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{template.name}</CardTitle>
                          <CardDescription className="text-xs">{template.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{template.category}</span>
                        <span className="text-sm font-medium">
                          R$ {template.suggestedAmount.toLocaleString("pt-BR")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" onClick={handleCustomGoal} className="w-full gap-2 bg-transparent">
                <Target className="w-4 h-4" />
                Criar Meta Personalizada
              </Button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Nome da Meta</Label>
                <Input
                  id="goal-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Reserva de emergência"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-category">Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Segurança">Segurança</SelectItem>
                    <SelectItem value="Transporte">Transporte</SelectItem>
                    <SelectItem value="Lazer">Lazer</SelectItem>
                    <SelectItem value="Moradia">Moradia</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                    <SelectItem value="Saúde">Saúde</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-amount">Valor Objetivo (R$)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-amount">Valor Atual (R$)</Label>
                <Input
                  id="current-amount"
                  type="number"
                  value={formData.currentAmount}
                  onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Data Limite</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva sua meta..."
              />
            </div>

            {formData.targetAmount && formData.deadline && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Para atingir sua meta, você precisa guardar:</p>
                    <p className="text-2xl font-bold text-primary">
                      R$ {calculateMonthlySavings().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-muted-foreground">por mês</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep("template")} className="flex-1">
                Voltar
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Salvando..." : "Criar Meta"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

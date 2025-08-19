import { AuthForm } from "@/components/auth-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Simulador Financeiro</h1>
          <p className="text-muted-foreground">Organize sua renda, despesas e metas financeiras</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}

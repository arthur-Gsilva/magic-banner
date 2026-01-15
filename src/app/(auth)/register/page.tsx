import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center auth-bg">
            <AuthCard>
                <AuthHeader
                    title="Crie sua conta"
                    subtitle="Comece sua jornada mágica"
                />
                <RegisterForm />
            </AuthCard>
        </main>
    )
}

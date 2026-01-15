import { AuthCard } from "@/components/auth/AuthCard"
import { AuthHeader } from "@/components/auth/AuthHeader"
import { LoginForm } from "@/components/auth/LoginForm"

const page = () => {
    return (
        <main className="min-h-screen flex items-center justify-center auth-bg">
            <AuthCard>
                <AuthHeader
                    title="Bem-vindo de volta"
                    subtitle="Entre no mundo mágico dos banners"
                />
                <LoginForm />
            </AuthCard>
        </main>
    )
}


export default page
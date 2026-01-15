"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { register } from "@/services/auth"
import { useRouter } from "next/navigation"

export function RegisterForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            await register({ name, email, password })
            router.push('/login')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                placeholder="Nome do mago 🧙"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <Input
                type="email"
                placeholder="Email mágico ✉️"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Input
                type="password"
                placeholder="Crie uma senha poderosa 🔮"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <button
                disabled={loading}
                className="
                    w-full rounded-lg bg-black py-3 text-white
                    hover:bg-black/90 transition
                "
            >
                {loading ? "Criando conta..." : "Criar conta"}
            </button>
        </form>
    )
}

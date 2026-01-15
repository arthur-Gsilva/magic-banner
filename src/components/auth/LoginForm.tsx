"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { login } from "@/services/auth"
import { useRouter } from "next/navigation"

export function LoginForm() {
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
            await login({ email, password })
            router.push('/')
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="email"
                placeholder="Email mágico ✉️"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <Input
                type="password"
                placeholder="Senha secreta 🔐"
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
                {loading ? "Entrando..." : "Entrar"}
            </button>
        </form>
    )
}

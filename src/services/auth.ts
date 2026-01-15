import api from "./api"

export type LoginPayload = {
    email: string
    password: string
}

export type RegisterPayload = {
    name: string
    email: string
    password: string
}

export async function login(payload: LoginPayload) {
    try {
        const { data } = await api.post("/api/login", payload)
        return data
    } catch (error: any) {
        const message =
            error.response?.data?.error ||
            "Credenciais inválidas"

        throw new Error(message)
    }
}

export async function register(payload: RegisterPayload) {
    try {
        const { data } = await api.post("/api/register", payload)
        return data
    } catch (error: any) {
        const message =
            error.response?.data?.error ||
            "Erro ao criar conta"

        throw new Error(message)
    }
}

export async function logout() {
    try {
        await api.post("/api/logout")
    } catch {
        throw new Error("Erro ao sair")
    }
}

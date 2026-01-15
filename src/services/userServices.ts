import { compare, hash } from "bcryptjs"
import JWT from "jsonwebtoken"
import { supabaseServer } from "@/lib/supabase"

export const createUser = async (name: string,email: string,password: string) => {
    const normalizedEmail = email.toLowerCase()

    const { data: existingUser } = await supabaseServer.from("users").select("id")
        .eq("email", normalizedEmail)
        .maybeSingle()

    if (existingUser) return null

    const hashedPassword = await hash(password, 10)

    const { data, error } = await supabaseServer.from("users").insert({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }).select("id, name, email").single()

    if (error) {
        console.error(error)
        return null
    }

    return data
}

export const logUser = async (email: string, password: string) => {
    const { data: user } = await supabaseServer.from("users").select("*")
        .eq("email", email)
        .maybeSingle()

    if (!user) return null

    const validPassword = await compare(password, user.password)
    if (!validPassword) return null

    const token = JWT.sign(
        {
            id: user.id,
            email: user.email,
            admin: user.admin,
        },
        process.env.JWT_SECRET_KEY as string
    )

    const { error } = await supabaseServer.from("users").update({
        token,
        updated_at: new Date().toISOString(),
    }).eq("id", user.id)

    if (error) {
        console.error(error)
        return null
    }

    return token
}

export const getUserIdByToken = async (token: string) => {
    const { data } = await supabaseServer.from("users").select("id")
        .eq("token", token)
        .maybeSingle()

    return data?.id ?? null
}

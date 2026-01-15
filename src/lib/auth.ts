import { getUserIdByToken } from "@/services/userServices"
import { cookies } from "next/headers"


export async function requireAuth() {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    if (!token) {
        return null
    }

    const userId = await getUserIdByToken(token)

    if (!userId) {
        return null
    }

    return userId
}

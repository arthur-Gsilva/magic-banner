'use client'

import Image from "next/image"
import { Button } from "./ui/button"
import { logout } from "@/services/auth"
import { useRouter } from "next/navigation"

export const Header = () => {

    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push('/login')
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur mb-12">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-yellow-400 to-orange-500">
                        <Image
                            src="/star.png"
                            alt="Magic Banner"
                            width={18}
                            height={18}
                        />
                    </div>

                    <span className="text-lg font-semibold tracking-tight">
                        Magic Banner
                    </span>
                </div>

                <Button variant="destructive" size="sm" className="cursor-pointer" onClick={handleLogout}>
                    Sair
                </Button>
            </div>
        </header>
    )
}

import { ReactNode } from "react"

export const AuthCard = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="
                w-full max-w-md rounded-2xl
                bg-white/80 backdrop-blur-xl
                shadow-xl border border-white/40
                p-8
            "
        >
            {children}
        </div>
    )
}

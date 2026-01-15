import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>

export function Input({ ...props }: Props) {
    return (
        <input
            {...props}
            className="
                w-full rounded-lg border border-black/10
                bg-white/70 px-4 py-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-black
                transition
            "
        />
    )
}

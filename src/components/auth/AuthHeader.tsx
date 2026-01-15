type Props = {
    title: string,
    subtitle: string
}

export function AuthHeader({title, subtitle}: Props) {
    return (
        <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
                ✨ {title} ✨
            </h1>
            <p className="mt-2 text-sm text-black/60">
                {subtitle}
            </p>
        </div>
    )
}

"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createBanner, updateBanner } from "@/services/banners"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

type BannerFormData = {
    pageUrl: string
    image: FileList
    startTime?: string
    endTime?: string
}

type BannerFormProps = {
    initialData?: {
        id?: number
        pageUrl: string
        startTime?: string | null
        endTime?: string | null
    }
    onSuccess?: () => void
}

export function BannerForm({ initialData, onSuccess }: BannerFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<BannerFormData>()

    useEffect(() => {
        if (initialData) {
            reset({
                pageUrl: initialData.pageUrl,
                startTime: initialData.startTime || "",
                endTime: initialData.endTime || "",
            })
        }
    }, [initialData, reset])

    const queryClient = useQueryClient()

    async function onSubmit(data: BannerFormData) {
        try {
            if (initialData?.id) {
                await updateBanner(initialData.id, {
                    pageUrl: data.pageUrl,
                    image: data.image?.[0],
                    startTime: data.startTime,
                    endTime: data.endTime,
                })
            } else {
                await createBanner({
                    pageUrl: data.pageUrl,
                    image: data.image?.[0],
                    startTime: data.startTime,
                    endTime: data.endTime,
                })
            }

            reset()
            onSuccess?.()
            queryClient.invalidateQueries({ queryKey: ['banners'] })
        } catch (error) {
            alert("Erro ao salvar banner")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">URL da página</label>
                <input
                    type="url"
                    placeholder="https://lojaexemplo.com/produto/123"
                    className="rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    {...register("pageUrl", { required: true })}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Imagem do banner</label>
                <input
                    type="file"
                    accept="image/*"
                    className="text-sm"
                    {...register("image", { required: !initialData })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Hora início</label>
                    <input
                        type="time"
                        className="rounded-md border px-3 py-2 text-sm"
                        {...register("startTime")}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">Hora fim</label>
                    <input
                        type="time"
                        className="rounded-md border px-3 py-2 text-sm"
                        {...register("endTime")}
                    />
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting
                    ? "Salvando..."
                    : initialData
                        ? "Salvar alterações"
                        : "Criar banner"}
            </Button>
        </form>
    )
}

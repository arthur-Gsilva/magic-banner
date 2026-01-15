import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"
import { bannerType } from "@/types/banner"

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params


    const { data, error } = await supabaseServer.from("banners").select("image_url")
        .eq("id", id)
        .single()

    if (error || !data) {
        return new Response("Banner não encontrado", { status: 404 })
    }

    await supabaseServer.storage.from("banners").remove([data.image_url])

    const { error: deleteError } = await supabaseServer
        .from("banners")
        .delete()
        .eq("id", id)

    if (deleteError) {
        return new Response("Erro ao deletar banner", { status: 400 })
    }

    return new Response("Banner deletado", { status: 200 })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const formData = await req.formData()

    const pageUrl = formData.get("pageUrl") as string
    const startTime = formData.get("startTime") as string | null
    const endTime = formData.get("endTime") as string | null
    const image = formData.get("imageUrl") as string

    const updateData: bannerType = {
        page_url: pageUrl,
        start_time: startTime,
        end_time: endTime,
        image_url: image
    }


    await supabaseServer
        .from("banners")
        .update(updateData)
        .eq("id", id)

    return NextResponse.json({ success: true })
}

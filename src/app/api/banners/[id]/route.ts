import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { data } = await supabaseServer.from("banners").select("image_url")
    .eq("id", params.id)
    .single()

    if (!data) {
        return NextResponse.json({ error: "Banner não encontrado" }, { status: 404 })
    }

    const fileName = data.image_url.split("/").pop()!

    await supabaseServer.storage.from("banners").remove([fileName])
    await supabaseServer.from("banners").delete().eq("id", params.id)

    return NextResponse.json({ success: true })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json()

    const { pageUrl, startTime, endTime } = body

    await supabaseServer.from("banners").update({
        page_url: pageUrl,
        start_time: startTime,
        end_time: endTime,
    }).eq("id", params.id)

    return NextResponse.json({ success: true })
}

import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"

export async function POST(req: Request) {
    const formData = await req.formData()

    const pageUrl = formData.get("pageUrl") as string
    const file = formData.get("image") as File
    const startTime = formData.get("startTime") as string | null
    const endTime = formData.get("endTime") as string | null

    if (!pageUrl || !file) {
        return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`

    const { error: uploadError } = await supabaseServer.storage.from("banners").upload(fileName, file)

    if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 400 })
    }

    const { data } = supabaseServer.storage.from("banners").getPublicUrl(fileName)

    const imageUrl = data.publicUrl

    const { error } = await supabaseServer.from("banners").insert({
        page_url: pageUrl,
        image_url: imageUrl,
        start_time: startTime || null,
        end_time: endTime || null,
    })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
}


export async function GET() {
    const { data, error } = await supabaseServer.from("banners").select("*")
    .order("created_at", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data)
}

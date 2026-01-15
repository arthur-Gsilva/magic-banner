import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"

const isWithinTimeRange = (start?: string | null, end?: string | null) => {
    if (!start || !end) return true

    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    const [sh, sm] = start.split(":").map(Number)
    const [eh, em] = end.split(":").map(Number)

    const startMinutes = sh * 60 + sm
    const endMinutes = eh * 60 + em

    return currentMinutes >= startMinutes &&
           currentMinutes <= endMinutes
}

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

    return NextResponse.json({ error: null }, {status: 201})
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get("url")

    if (url) {
        const { data: banners } = await supabaseServer
            .from("banners")
            .select("*")
            .eq("page_url", url)
            .limit(1)

        if (!banners || banners.length === 0) {
            return new NextResponse(null, { status: 204 })
        }

        const banner = banners[0]

        const validTime = isWithinTimeRange(
            banner.start_time,
            banner.end_time
        )

        if (!validTime) {
            return new NextResponse(null, { status: 204 })
        }

        return NextResponse.json({
            imageUrl: banner.image_url,
            link: banner.page_url
        })
    }

    const { data, error } = await supabaseServer
        .from("banners")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json(data)
}
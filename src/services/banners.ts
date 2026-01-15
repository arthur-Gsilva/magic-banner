import { bannerType } from "@/types/banner"
import api from "./api"

export const getAllBanners = async (): Promise<bannerType[]> => {
    const response = await api.get('/api/banners')
    return response.data
}

type BannerPayload = {
    pageUrl: string
    image: File
    startTime?: string
    endTime?: string
}


export const createBanner = async (data: BannerPayload) => {
    const formData = new FormData()

    formData.append("pageUrl", data.pageUrl)
    formData.append("image", data.image)
    

    if (data.startTime) {
        formData.append("startTime", data.startTime)
    }

    if (data.endTime) {
        formData.append("endTime", data.endTime)
    }

    const response = await api.post("/api/banners", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return response.data
}

export const updateBanner = async (id: number, data: BannerPayload) => {
    const formData = new FormData()

    formData.append("pageUrl", data.pageUrl)
    formData.append("image", data.image)

    if (data.startTime) {
        formData.append("startTime", data.startTime)
    }

    if (data.endTime) {
        formData.append("endTime", data.endTime)
    }
    const response = await api.put(`/api/banners/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

    return response.data
}

export const deleteBanner = async (id: number) => {
    const response = await api.delete(`/api/banners/${id}`)
    return response.data
}
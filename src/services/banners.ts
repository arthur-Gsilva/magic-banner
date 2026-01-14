import { bannerType } from "@/types/banner"
import api from "./api"

export const getAllBanners = async (): Promise<bannerType[]> => {
    const response = await api.get('/api/banners')
    return response.data
}
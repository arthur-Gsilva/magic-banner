import { BannersTable } from "@/components/BannersTable"
import { CreateBannerModal } from "@/components/CreateBannerModal"
import { Header } from "@/components/Header"
import { requireAuth } from "@/lib/auth"
import { redirect } from "next/navigation"

const page = async () => {

    const session = await requireAuth()

    if (!session) {
        redirect("/login")
    }

    return(
        <>
            <Header />

            <main className="w-full max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h1 className="text-center text-xl font-semibold tracking-tight">Lista de Banners</h1>

                    <CreateBannerModal />
                </div>

                <BannersTable />
            </main>
        </>
    )
}

export default page
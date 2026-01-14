import { BannersTable } from "@/components/BannersTable"
import { Header } from "@/components/Header"

const page = () => {

    return(
        <>
            <Header />

            <main className="w-full max-w-6xl mx-auto">
                <h1 className="text-center text-xl font-semibold tracking-tight">Lista de Banners</h1>

                <BannersTable />
            </main>
        </>
    )
}

export default page
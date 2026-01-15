"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BannerForm } from "./BannerForm"
import { bannerType } from "@/types/banner"
import { FaEdit } from "react-icons/fa"


export const EditBannerModal = ({ data }: {data: bannerType}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setOpen(true)}
                className="cursor-pointer"
            >
                <FaEdit size={14} />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-130">
                    <DialogHeader>
                    <DialogTitle>Criar Banner</DialogTitle>
                    </DialogHeader>

                    <BannerForm
                        initialData={{
                            id: data.id,
                            pageUrl: data.page_url,
                            startTime: data.start_time,
                            endTime: data.end_time,
                        }}
                        onSuccess={() => setOpen(false)} 
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

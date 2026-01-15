"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BannerForm } from "./BannerForm"


export function CreateBannerModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-xl hover:bg-blue-700"
      >
        +
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-130">
          <DialogHeader>
            <DialogTitle>Criar Banner</DialogTitle>
          </DialogHeader>

          <BannerForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

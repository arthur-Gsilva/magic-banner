'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { FaTrash } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {  useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteBanner, getAllBanners } from "@/services/banners"
import { EditBannerModal } from "./EditBannerModal"

export function BannersTable() {
    const queryClient = useQueryClient()

    const { data: banners } = useQuery({
        queryKey: ['banners'],
        queryFn: getAllBanners,
        staleTime: 1000
    })

    const handleEdit = (id: number) => {
        console.log("Editar banner:", id)
    }

    const handleDelete = async (id: number) => {
        await deleteBanner(id)
        queryClient.invalidateQueries({ queryKey: ['banners'] })
    }

    return (
        <Table>
            <TableCaption>Banners cadastrados</TableCaption>

            <TableHeader>
            <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>URL da Página</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead className="text-right">Ações</TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
            {banners?.map((banner) => (
                <TableRow key={banner.id}>
                
                <TableCell>
                    <img
                    src={banner.image_url}
                    alt="Banner"
                    className="h-12 w-32 rounded-md object-cover"
                    />
                </TableCell>

                <TableCell className="max-w-xs truncate">
                    {banner.page_url}
                </TableCell>

                <TableCell>
                    {banner.start_time && banner.end_time ? (
                    <span>
                        {banner.start_time} - {banner.end_time}
                    </span>
                    ) : (
                    <span className="text-muted-foreground">Sempre ativo</span>
                    )}
                </TableCell>

                <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                    
                    <EditBannerModal data={banner}/>

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(banner.id as number)}
                    >
                        <FaTrash size={14} />
                    </Button>
                    </div>
                </TableCell>

                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
}

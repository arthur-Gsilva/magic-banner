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

import { FaTrash, FaEdit } from "react-icons/fa"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {  useQuery } from "@tanstack/react-query"
import { getAllBanners } from "@/services/banners"

export function BannersTable() {
    const handleEdit = (id: number) => {
        console.log("Editar banner:", id)
        // futuramente: router.push(`/banners/edit/${id}`)
    }

    const handleDelete = (id: number) => {
        console.log("Excluir banner:", id)
        // futuramente: chamada para API DELETE
    }

    const { data: banners } = useQuery({
        queryKey: ['banners'],
        queryFn: getAllBanners
    })

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
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(banner.id)}
                    >
                        <FaEdit size={14} />
                    </Button>

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(banner.id)}
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

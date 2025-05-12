"use client"

import { useState, useEffect } from "react"
import { getAllEquipamiento } from "@/api/equipamiento"
import type { Equipamiento } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function EquipamientoPage() {
  const [equipamientos, setEquipamientos] = useState<Equipamiento[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchEquipamientos = async () => {
      try {
        const data = await getAllEquipamiento()
        setEquipamientos(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar el equipamiento",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEquipamientos()
  }, [toast])

  const filteredEquipamientos = equipamientos.filter(
    (equipamiento) =>
      equipamiento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamiento.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipamiento.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Equipamiento</h1>
            <p className="text-muted-foreground">Gestiona el equipamiento disponible</p>
          </div>
          <Button asChild>
            <Link href="/equipamiento/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Equipamiento
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Equipamiento</CardTitle>
            <CardDescription>Visualiza y gestiona todo el equipamiento disponible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, descripción o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <p>Cargando equipamiento...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Disponible</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipamientos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No se encontró equipamiento
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEquipamientos.map((equipamiento) => (
                        <TableRow key={equipamiento.id}>
                          <TableCell>
                            <div className="relative h-10 w-10">
                              <Image
                                src={equipamiento.imagen || "/placeholder.svg"}
                                alt={equipamiento.nombre}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{equipamiento.nombre}</TableCell>
                          <TableCell className="max-w-xs truncate">{equipamiento.descripcion}</TableCell>
                          <TableCell>{equipamiento.tipo}</TableCell>
                          <TableCell>S/ {equipamiento.precio.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={equipamiento.disponible ? "success" : "destructive"}>
                              {equipamiento.disponible ? "Disponible" : "No disponible"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon" asChild>
                                <Link href={`/equipamiento/${equipamiento.id}/editar`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

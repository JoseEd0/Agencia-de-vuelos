"use client"

import { useState, useEffect } from "react"
import { getAllReclamos } from "@/api/reclamos"
import type { Reclamo } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ReclamosPage() {
  const [reclamos, setReclamos] = useState<Reclamo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const data = await getAllReclamos()
        setReclamos(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los reclamos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchReclamos()
  }, [toast])

  const filteredReclamos = reclamos.filter(
    (reclamo) =>
      reclamo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reclamo.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reclamo.estado.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "Abierto":
        return "default"
      case "En proceso":
        return "secondary"
      case "Resuelto":
        return "success"
      default:
        return "outline"
    }
  }

  const getPrioridadVariant = (prioridad: string) => {
    switch (prioridad) {
      case "Alta":
        return "destructive"
      case "Media":
        return "warning"
      case "Baja":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reclamos</h1>
            <p className="text-muted-foreground">Gestiona los reclamos de los pasajeros</p>
          </div>
          <Button asChild>
            <Link href="/reclamos/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Reclamo
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Reclamos</CardTitle>
            <CardDescription>Visualiza y gestiona todos los reclamos registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, descripción o estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <p>Cargando reclamos...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReclamos.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No se encontraron reclamos
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReclamos.map((reclamo) => (
                        <TableRow key={reclamo.id}>
                          <TableCell>{reclamo.id}</TableCell>
                          <TableCell>{reclamo.titulo}</TableCell>
                          <TableCell>{reclamo.fechaCreacion}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(reclamo.estado)}>{reclamo.estado}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getPrioridadVariant(reclamo.prioridad)}>{reclamo.prioridad}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/reclamos/${reclamo.id}`}>
                                <MessageSquare className="h-4 w-4 mr-1" /> Responder
                              </Link>
                            </Button>
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

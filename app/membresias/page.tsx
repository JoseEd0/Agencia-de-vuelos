"use client"

import { useState, useEffect } from "react"
import { getMembresias } from "@/api/membresias"
import type { Membresia } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, Check } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function MembresiasPage() {
  const [membresias, setMembresias] = useState<Membresia[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const data = await getMembresias()
        setMembresias(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las membresías",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMembresias()
  }, [toast])

  const filteredMembresias = membresias.filter(
    (membresia) =>
      membresia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      membresia.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Membresías</h1>
            <p className="text-muted-foreground">Gestiona las membresías de los pasajeros</p>
          </div>
          <Button asChild>
            <Link href="/membresias/nueva">
              <Plus className="mr-2 h-4 w-4" /> Nueva Membresía
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Membresías</CardTitle>
            <CardDescription>Visualiza y gestiona todas las membresías registradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <p>Cargando membresías...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Beneficios</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembresias.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No se encontraron membresías
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMembresias.map((membresia) => (
                        <TableRow key={membresia.id}>
                          <TableCell>{membresia.id}</TableCell>
                          <TableCell>{membresia.nombre}</TableCell>
                          <TableCell>{membresia.descripcion}</TableCell>
                          <TableCell>
                            {membresia.precio === 0 ? "Gratis" : `S/ ${membresia.precio.toFixed(2)}`}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {membresia.beneficios.slice(0, 2).map((beneficio, index) => (
                                <Badge key={index} variant="outline" className="flex items-center gap-1">
                                  <Check className="h-3 w-3" /> {beneficio}
                                </Badge>
                              ))}
                              {membresia.beneficios.length > 2 && (
                                <Badge variant="outline">+{membresia.beneficios.length - 2} más</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/membresias/${membresia.id}`}>Ver detalles</Link>
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

"use client"

import { useState, useEffect } from "react"
import { getPasajeros } from "@/api/pasajeros"
import type { Pasajero } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function PasajerosPage() {
  const [pasajeros, setPasajeros] = useState<Pasajero[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchPasajeros = async () => {
      try {
        const data = await getPasajeros()
        setPasajeros(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los pasajeros",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPasajeros()
  }, [toast])

  const filteredPasajeros = pasajeros.filter(
    (pasajero) =>
      pasajero.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasajero.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasajero.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pasajero.numeroDocumento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pasajeros</h1>
            <p className="text-muted-foreground">Gestiona la información de los pasajeros</p>
          </div>
          <Button asChild>
            <Link href="/pasajeros/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Pasajero
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Pasajeros</CardTitle>
            <CardDescription>Visualiza y gestiona todos los pasajeros registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, apellido, email o documento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <p>Cargando pasajeros...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Apellido</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPasajeros.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No se encontraron pasajeros
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPasajeros.map((pasajero) => (
                        <TableRow key={pasajero.id}>
                          <TableCell>{pasajero.id}</TableCell>
                          <TableCell>{pasajero.nombre}</TableCell>
                          <TableCell>{pasajero.apellido}</TableCell>
                          <TableCell>{pasajero.email}</TableCell>
                          <TableCell>
                            {pasajero.tipoDocumento}: {pasajero.numeroDocumento}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/pasajeros/${pasajero.id}`}>Ver detalles</Link>
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

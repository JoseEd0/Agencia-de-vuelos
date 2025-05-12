"use client"

import { useState, useEffect } from "react"
import { getCompras } from "@/api/compras"
import type { Compra } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ComprasPage() {
  const [compras, setCompras] = useState<Compra[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await getCompras()
        setCompras(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las compras",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCompras()
  }, [toast])

  const filteredCompras = compras.filter(
    (compra) =>
      compra.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compra.metodoPago.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compra.id.toString().includes(searchTerm),
  )

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compras</h1>
            <p className="text-muted-foreground">Gestiona las compras y reservas</p>
          </div>
          <Button asChild>
            <Link href="/compras/nueva">
              <Plus className="mr-2 h-4 w-4" /> Nueva Compra
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Compras</CardTitle>
            <CardDescription>Visualiza y gestiona todas las compras realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, estado o método de pago..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <p>Cargando compras...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Método de Pago</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompras.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No se encontraron compras
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCompras.map((compra) => (
                        <TableRow key={compra.id}>
                          <TableCell>{compra.id}</TableCell>
                          <TableCell>{compra.fechaCompra}</TableCell>
                          <TableCell>S/ {compra.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={compra.estado === "Completada" ? "success" : "secondary"}>
                              {compra.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>{compra.metodoPago}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/compras/${compra.id}`}>
                                <Eye className="h-4 w-4 mr-1" /> Ver
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

"use client"

import { useState, useEffect } from "react"
import { getOneEquipamiento } from "@/api/equipamiento"
import type { Equipamiento } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function EquipamientoDetailPage({ params }: { params: { id: string } }) {
  const [equipamiento, setEquipamiento] = useState<Equipamiento | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEquipamiento = async () => {
      try {
        const data = await getOneEquipamiento(Number.parseInt(params.id))
        setEquipamiento(data)
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

    fetchEquipamiento()
  }, [params.id, toast])

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center py-12">
          <p>Cargando equipamiento...</p>
        </div>
      </div>
    )
  }

  if (!equipamiento) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center py-12 gap-4">
          <p className="text-xl">Equipamiento no encontrado</p>
          <Button asChild>
            <Link href="/equipamiento">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver a equipamiento
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/equipamiento">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative h-80 md:h-full rounded-lg overflow-hidden">
            <Image
              src={equipamiento.imagen || "/placeholder.svg"}
              alt={equipamiento.nombre}
              fill
              className="object-cover"
            />
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{equipamiento.nombre}</CardTitle>
                  <CardDescription>{equipamiento.tipo}</CardDescription>
                </div>
                <Badge variant={equipamiento.disponible ? "success" : "destructive"}>
                  {equipamiento.disponible ? "Disponible" : "No disponible"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Descripción</h3>
                <p className="text-muted-foreground">{equipamiento.descripcion}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Precio</h3>
                <p className="text-2xl font-bold text-primary">S/ {equipamiento.precio.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Características</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Material de alta calidad</li>
                  <li>Garantía de 1 año</li>
                  <li>Envío gratuito</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!equipamiento.disponible}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Añadir al carrito
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

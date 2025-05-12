import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroSection } from "@/components/hero-section"
import { DestinationCard } from "@/components/destination-card"
import { MembershipCard } from "@/components/membership-card"
import Link from "next/link"
import { ArrowRight, Plane, Users, CreditCard } from "lucide-react"

export default function Home() {
  const popularDestinations = [
    {
      id: 1,
      name: "Cancún, México",
      image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1000&auto=format&fit=crop",
      price: 1250.9,
    },
    {
      id: 2,
      name: "Madrid, España",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1000&auto=format&fit=crop",
      price: 2350.5,
    },
    {
      id: 3,
      name: "Nueva York, EE.UU.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000&auto=format&fit=crop",
      price: 1850.9,
    },
  ]

  const memberships = [
    {
      id: 1,
      name: "Básica",
      description: "Para viajeros ocasionales",
      benefits: ["Acumulación de puntos", "Check-in prioritario"],
      price: 0,
    },
    {
      id: 2,
      name: "Premium",
      description: "Para viajeros frecuentes",
      benefits: [
        "Acumulación de puntos x2",
        "Check-in prioritario",
        "Equipaje adicional",
        "Selección de asientos gratis",
      ],
      price: 99,
      featured: true,
    },
    {
      id: 3,
      name: "Ejecutiva",
      description: "Para viajeros de negocios",
      benefits: [
        "Acumulación de puntos x3",
        "Check-in prioritario",
        "Equipaje adicional",
        "Selección de asientos gratis",
        "Acceso a salas VIP",
      ],
      price: 199,
    },
  ]

  return (
    <div className="flex flex-col gap-12 pb-8">
      <HeroSection />

      <section className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Destinos Populares</h2>
            <p className="text-muted-foreground">Descubre nuestros destinos más solicitados</p>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link href="/destinos">
              Ver todos los destinos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={{ ...destination, priceFormatted: `S/ ${destination.price.toFixed(2)}` }}
            />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Nuestras Membresías</h2>
            <p className="text-muted-foreground">Obtén beneficios exclusivos con nuestras membresías</p>
          </div>
          <Button asChild variant="ghost" className="gap-1">
            <Link href="/membresias">
              Ver todas las membresías <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-3">
          {memberships.map((membership) => (
            <MembershipCard key={membership.id} membership={membership} />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Nuestros Servicios</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Plane className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Vuelos</CardTitle>
              <CardDescription>Encuentra los mejores vuelos a los destinos más populares</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ofrecemos una amplia variedad de vuelos con las mejores aerolíneas del mundo.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/vuelos">Buscar Vuelos</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Membresías</CardTitle>
              <CardDescription>Únete a nuestro programa de viajero frecuente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acumula puntos, obtén beneficios exclusivos y mejora tu experiencia de viaje.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/membresias">Ver Membresías</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Compras</CardTitle>
              <CardDescription>Gestiona tus compras y reservas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accede a tu historial de compras, modifica reservas y solicita reembolsos.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/compras">Mis Compras</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}

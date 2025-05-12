import { Button } from "@/components/ui/button"
import { SearchFlightForm } from "@/components/search-flight-form"
import { Card, CardContent } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Descubre el mundo con SkyWay Airlines
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                Viaja a los destinos más increíbles con el mejor servicio y los precios más competitivos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="px-8">
                Reservar ahora
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 hover:text-white">
                Ver ofertas
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <SearchFlightForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

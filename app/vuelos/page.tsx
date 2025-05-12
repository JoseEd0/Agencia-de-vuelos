"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Plane, Clock, Users, Luggage } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function VuelosPage() {
  const [tripType, setTripType] = useState("roundtrip")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)

  const handleSearch = () => {
    setSearchPerformed(true)
  }

  // Datos de ejemplo para vuelos
  const flightResults = [
    {
      id: 1,
      airline: "SkyWay Airlines",
      airlineLogo: "https://images.unsplash.com/photo-1521727857535-28d2047619b7?q=80&w=200&auto=format&fit=crop",
      origin: "Lima",
      destination: "Cusco",
      departureTime: "08:30",
      arrivalTime: "10:00",
      duration: "1h 30m",
      price: 249.9,
      stops: 0,
      flightNumber: "SW1234",
    },
    {
      id: 2,
      airline: "Peruvian Air",
      airlineLogo: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=200&auto=format&fit=crop",
      origin: "Lima",
      destination: "Cusco",
      departureTime: "10:15",
      arrivalTime: "11:45",
      duration: "1h 30m",
      price: 219.5,
      stops: 0,
      flightNumber: "PA5678",
    },
    {
      id: 3,
      airline: "Andean Airways",
      airlineLogo: "https://images.unsplash.com/photo-1521727857535-28d2047619b7?q=80&w=200&auto=format&fit=crop",
      origin: "Lima",
      destination: "Cusco",
      departureTime: "14:20",
      arrivalTime: "15:50",
      duration: "1h 30m",
      price: 289.9,
      stops: 0,
      flightNumber: "AA9012",
    },
    {
      id: 4,
      airline: "SkyWay Airlines",
      airlineLogo: "https://images.unsplash.com/photo-1521727857535-28d2047619b7?q=80&w=200&auto=format&fit=crop",
      origin: "Lima",
      destination: "Cusco",
      departureTime: "16:45",
      arrivalTime: "18:15",
      duration: "1h 30m",
      price: 259.9,
      stops: 0,
      flightNumber: "SW5678",
    },
  ]

  const popularDestinations = [
    {
      id: 1,
      name: "Cusco",
      image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop",
      price: 249.9,
      description: "La antigua capital del Imperio Inca",
    },
    {
      id: 2,
      name: "Arequipa",
      image: "https://images.unsplash.com/photo-1548268770-66184a21657e?q=80&w=1000&auto=format&fit=crop",
      price: 199.9,
      description: "La Ciudad Blanca con impresionante arquitectura colonial",
    },
    {
      id: 3,
      name: "Iquitos",
      image: "https://images.unsplash.com/photo-1553550755-e6c8f1f4f507?q=80&w=1000&auto=format&fit=crop",
      price: 329.9,
      description: "Puerta de entrada a la Amazonía peruana",
    },
    {
      id: 4,
      name: "Trujillo",
      image: "https://images.unsplash.com/photo-1585132004237-dd248ba70348?q=80&w=1000&auto=format&fit=crop",
      price: 189.9,
      description: "Ciudad de la Eterna Primavera",
    },
  ]

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Vuelos</h1>
          <p className="text-muted-foreground">Encuentra los mejores vuelos a los destinos más populares</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <RadioGroup
                  defaultValue="roundtrip"
                  className="flex gap-4"
                  onValueChange={setTripType}
                  value={tripType}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roundtrip" id="roundtrip" />
                    <Label htmlFor="roundtrip">Ida y vuelta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oneway" id="oneway" />
                    <Label htmlFor="oneway">Solo ida</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="origin">Origen</Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger id="origin">
                      <SelectValue placeholder="Ciudad de origen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                      <SelectItem value="cusco">Cusco</SelectItem>
                      <SelectItem value="trujillo">Trujillo</SelectItem>
                      <SelectItem value="iquitos">Iquitos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="destination">Destino</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger id="destination">
                      <SelectValue placeholder="Ciudad de destino" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lima">Lima</SelectItem>
                      <SelectItem value="arequipa">Arequipa</SelectItem>
                      <SelectItem value="cusco">Cusco</SelectItem>
                      <SelectItem value="trujillo">Trujillo</SelectItem>
                      <SelectItem value="iquitos">Iquitos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Fecha de salida</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !departureDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {tripType === "roundtrip" && (
                  <div className="grid gap-2">
                    <Label>Fecha de regreso</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          disabled={(date) => (departureDate ? date < departureDate : false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="passengers">Pasajeros</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger id="passengers">
                      <SelectValue placeholder="Seleccionar número de pasajeros" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Pasajero</SelectItem>
                      <SelectItem value="2">2 Pasajeros</SelectItem>
                      <SelectItem value="3">3 Pasajeros</SelectItem>
                      <SelectItem value="4">4 Pasajeros</SelectItem>
                      <SelectItem value="5">5 Pasajeros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="class">Clase</Label>
                  <Select defaultValue="economy">
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Seleccionar clase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Económica</SelectItem>
                      <SelectItem value="premium">Premium Economy</SelectItem>
                      <SelectItem value="business">Ejecutiva</SelectItem>
                      <SelectItem value="first">Primera Clase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleSearch}>
                <Plane className="mr-2 h-4 w-4" /> Buscar vuelos
              </Button>
            </div>
          </CardContent>
        </Card>

        {searchPerformed ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Resultados de búsqueda</h2>

            <Tabs defaultValue="cheapest">
              <TabsList className="mb-4">
                <TabsTrigger value="cheapest">Más baratos</TabsTrigger>
                <TabsTrigger value="fastest">Más rápidos</TabsTrigger>
                <TabsTrigger value="best">Recomendados</TabsTrigger>
              </TabsList>

              <TabsContent value="cheapest" className="space-y-4">
                {flightResults
                  .sort((a, b) => a.price - b.price)
                  .map((flight) => (
                    <FlightCard key={flight.id} flight={flight} />
                  ))}
              </TabsContent>

              <TabsContent value="fastest" className="space-y-4">
                {flightResults.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </TabsContent>

              <TabsContent value="best" className="space-y-4">
                {flightResults.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Destinos populares</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {popularDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{destination.name}</h3>
                    <p className="text-sm text-muted-foreground">{destination.description}</p>
                    <p className="font-medium text-primary mt-2">Desde S/ {destination.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        setDestination(destination.name.toLowerCase())
                        setOrigin("lima")
                        setSearchPerformed(true)
                      }}
                    >
                      Ver vuelos
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface FlightCardProps {
  flight: {
    id: number
    airline: string
    airlineLogo: string
    origin: string
    destination: string
    departureTime: string
    arrivalTime: string
    duration: string
    price: number
    stops: number
    flightNumber: string
  }
}

function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={flight.airlineLogo || "/placeholder.svg"}
                alt={flight.airline}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{flight.airline}</p>
              <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center">
              <p className="text-xl font-bold">{flight.departureTime}</p>
              <p className="text-sm">{flight.origin}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-xs text-muted-foreground">{flight.duration}</p>
              <div className="relative w-24 md:w-32 h-[2px] bg-border my-2">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {flight.stops === 0 ? "Directo" : `${flight.stops} ${flight.stops === 1 ? "escala" : "escalas"}`}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold">{flight.arrivalTime}</p>
              <p className="text-sm">{flight.destination}</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-2xl font-bold text-primary">S/ {flight.price.toFixed(2)}</p>
            <Button>Seleccionar</Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline" className="flex items-center gap-1">
            <Luggage className="h-3 w-3" /> Equipaje de mano incluido
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Puntualidad 95%
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {(Number.parseInt(flight.flightNumber.slice(-2)) % 10) + 5} asientos
            disponibles
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

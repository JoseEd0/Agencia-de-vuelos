"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Plane } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchFlightForm() {
  const [tripType, setTripType] = useState("roundtrip")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Buscar vuelos</h3>
        <RadioGroup defaultValue="roundtrip" className="flex gap-4" onValueChange={setTripType} value={tripType}>
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

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="origin">Origen</Label>
          <Input id="origin" placeholder="Ciudad de origen" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="destination">Destino</Label>
          <Input id="destination" placeholder="Ciudad de destino" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Fecha de salida</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !departureDate && "text-muted-foreground")}
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
                  className={cn("w-full justify-start text-left font-normal", !returnDate && "text-muted-foreground")}
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

      <Button className="w-full" size="lg">
        <Plane className="mr-2 h-4 w-4" /> Buscar vuelos
      </Button>
    </div>
  )
}

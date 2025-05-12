import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DestinationCardProps {
  destination: {
    id: number
    name: string
    image: string
    price: number
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={destination.image || "/placeholder.svg"} alt={destination.name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{destination.name}</h3>
          <p className="font-medium text-primary">Desde S/ {destination.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/vuelos?destino=${encodeURIComponent(destination.name)}`}>Ver vuelos</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

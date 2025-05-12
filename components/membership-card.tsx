import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface MembershipCardProps {
  membership: {
    id: number
    name: string
    description: string
    benefits: string[]
    price: number
    featured?: boolean
  }
}

export function MembershipCard({ membership }: MembershipCardProps) {
  return (
    <Card className={cn("flex flex-col", membership.featured && "border-primary shadow-lg")}>
      <CardHeader>
        <CardTitle>{membership.name}</CardTitle>
        <CardDescription>{membership.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="text-2xl font-bold mb-4">
          {membership.price === 0 ? "Gratis" : `S/ ${membership.price.toFixed(2)}/año`}
        </div>
        <ul className="space-y-2">
          {membership.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={membership.featured ? "default" : "outline"}>
          Seleccionar
        </Button>
      </CardFooter>
    </Card>
  )
}

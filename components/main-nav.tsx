"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plane } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === "/",
    },
    {
      href: "/vuelos",
      label: "Vuelos",
      active: pathname === "/vuelos",
    },
    {
      href: "/pasajeros",
      label: "Pasajeros",
      active: pathname === "/pasajeros",
    },
    {
      href: "/membresias",
      label: "Membresías",
      active: pathname === "/membresias",
    },
    {
      href: "/compras",
      label: "Compras",
      active: pathname === "/compras",
    },
    {
      href: "/equipamiento",
      label: "Equipamiento",
      active: pathname === "/equipamiento",
    },
    {
      href: "/reclamos",
      label: "Reclamos",
      active: pathname === "/reclamos",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">SkyWay Airlines</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  route.active ? "text-foreground font-medium" : "text-foreground/60",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <Plane className="h-6 w-6" />
              <span className="font-bold">SkyWay Airlines</span>
            </Link>
            <nav className="mt-8 flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-foreground/60 transition-colors hover:text-foreground/80",
                    route.active ? "text-foreground font-medium" : "",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <Plane className="h-6 w-6" />
          <span className="font-bold">SkyWay</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <Button asChild size="sm">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

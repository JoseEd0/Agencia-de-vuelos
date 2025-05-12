import type { Membresia, MembresiaCreate } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.skyway-airlines.com"

// Función para obtener todas las membresías
export async function getMembresias(): Promise<Membresia[]> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/membresias/`)
    // if (!response.ok) throw new Error('Error al obtener membresías')
    // return await response.json()

    // Datos de ejemplo para simular la respuesta de la API
    return [
      {
        id: 1,
        nombre: "Básica",
        descripcion: "Membresía básica para viajeros ocasionales",
        beneficios: ["Acumulación de puntos", "Check-in prioritario"],
        precio: 0,
        duracion: "1 año",
        pasajeroId: 1,
        fechaInicio: "2023-01-01",
        fechaFin: "2024-01-01",
      },
      {
        id: 2,
        nombre: "Premium",
        descripcion: "Membresía premium para viajeros frecuentes",
        beneficios: [
          "Acumulación de puntos x2",
          "Check-in prioritario",
          "Equipaje adicional",
          "Selección de asientos gratis",
        ],
        precio: 349.9,
        duracion: "1 año",
        pasajeroId: 2,
        fechaInicio: "2023-02-15",
        fechaFin: "2024-02-15",
      },
      {
        id: 3,
        nombre: "Ejecutiva",
        descripcion: "Membresía ejecutiva para viajeros de negocios",
        beneficios: [
          "Acumulación de puntos x3",
          "Check-in prioritario",
          "Equipaje adicional",
          "Selección de asientos gratis",
          "Acceso a salas VIP",
        ],
        precio: 699.9,
        duracion: "1 año",
        pasajeroId: 3,
        fechaInicio: "2023-03-10",
        fechaFin: "2024-03-10",
      },
    ]
  } catch (error) {
    console.error("Error al obtener membresías:", error)
    throw error
  }
}

// Función para crear una nueva membresía
export async function createMembresia(membresia: MembresiaCreate): Promise<Membresia> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/membresias/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(membresia),
    // })
    // if (!response.ok) throw new Error('Error al crear membresía')
    // return await response.json()

    // Simulación de respuesta
    return {
      id: Math.floor(Math.random() * 1000) + 4,
      ...membresia,
    }
  } catch (error) {
    console.error("Error al crear membresía:", error)
    throw error
  }
}

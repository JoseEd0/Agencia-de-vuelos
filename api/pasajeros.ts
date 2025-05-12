import type { Pasajero, PasajeroCreate } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.skyway-airlines.com"

// Función para obtener todos los pasajeros
export async function getPasajeros(): Promise<Pasajero[]> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/pasajeros/`)
    // if (!response.ok) throw new Error('Error al obtener pasajeros')
    // return await response.json()

    // Datos de ejemplo para simular la respuesta de la API
    return [
      {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@example.com",
        telefono: "+51912345678",
        fechaNacimiento: "1985-05-15",
        nacionalidad: "Peruana",
        numeroDocumento: "12345678A",
        tipoDocumento: "DNI",
      },
      {
        id: 2,
        nombre: "María",
        apellido: "González",
        email: "maria.gonzalez@example.com",
        telefono: "+51998765432",
        fechaNacimiento: "1990-10-20",
        nacionalidad: "Peruana",
        numeroDocumento: "87654321B",
        tipoDocumento: "DNI",
      },
      {
        id: 3,
        nombre: "Carlos",
        apellido: "Rodríguez",
        email: "carlos.rodriguez@example.com",
        telefono: "+51923456789",
        fechaNacimiento: "1978-03-25",
        nacionalidad: "Peruana",
        numeroDocumento: "23456789C",
        tipoDocumento: "DNI",
      },
    ]
  } catch (error) {
    console.error("Error al obtener pasajeros:", error)
    throw error
  }
}

// Función para crear un nuevo pasajero
export async function createPasajero(pasajero: PasajeroCreate): Promise<Pasajero> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/pasajeros/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(pasajero),
    // })
    // if (!response.ok) throw new Error('Error al crear pasajero')
    // return await response.json()

    // Simulación de respuesta
    return {
      id: Math.floor(Math.random() * 1000) + 4,
      ...pasajero,
    }
  } catch (error) {
    console.error("Error al crear pasajero:", error)
    throw error
  }
}

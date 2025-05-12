import type { Reclamo, ReclamoCreate } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.skyway-airlines.com"

// Función para obtener todos los reclamos
export async function getAllReclamos(): Promise<Reclamo[]> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/claim/findAllClaim`)
    // if (!response.ok) throw new Error('Error al obtener reclamos')
    // return await response.json()

    // Datos de ejemplo para simular la respuesta de la API
    return [
      {
        id: 1,
        pasajeroId: 1,
        titulo: "Retraso en el vuelo",
        descripcion: "Mi vuelo MAD-BCN se retrasó más de 3 horas sin explicación",
        fechaCreacion: "2023-07-15",
        estado: "Abierto",
        prioridad: "Alta",
      },
      {
        id: 2,
        pasajeroId: 2,
        titulo: "Equipaje dañado",
        descripcion: "Mi maleta llegó con daños en la rueda y un rasguño en la parte frontal",
        fechaCreacion: "2023-08-20",
        estado: "En proceso",
        prioridad: "Media",
        respuesta: "Estamos evaluando los daños para proceder con la compensación",
      },
      {
        id: 3,
        pasajeroId: 3,
        titulo: "Cobro incorrecto",
        descripcion: "Me han cobrado dos veces por el mismo servicio de equipaje adicional",
        fechaCreacion: "2023-09-05",
        estado: "Resuelto",
        prioridad: "Baja",
        respuesta: "Hemos verificado el cobro duplicado y realizado el reembolso correspondiente",
      },
    ]
  } catch (error) {
    console.error("Error al obtener reclamos:", error)
    throw error
  }
}

// Función para obtener un reclamo específico
export async function getOneReclamo(id: number): Promise<Reclamo> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/claim/findOneClaim/${id}`)
    // if (!response.ok) throw new Error('Error al obtener reclamo')
    // return await response.json()

    // Simulación de respuesta
    const reclamos = await getAllReclamos()
    const reclamo = reclamos.find((r) => r.id === id)

    if (!reclamo) {
      throw new Error("Reclamo no encontrado")
    }

    return reclamo
  } catch (error) {
    console.error(`Error al obtener reclamo con id ${id}:`, error)
    throw error
  }
}

// Función para crear un nuevo reclamo
export async function createReclamo(reclamo: ReclamoCreate): Promise<Reclamo> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/claim/createClaim`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(reclamo),
    // })
    // if (!response.ok) throw new Error('Error al crear reclamo')
    // return await response.json()

    // Simulación de respuesta
    return {
      id: Math.floor(Math.random() * 1000) + 4,
      ...reclamo,
    }
  } catch (error) {
    console.error("Error al crear reclamo:", error)
    throw error
  }
}

// Función para actualizar un reclamo
export async function updateReclamo(id: number, reclamo: Partial<ReclamoCreate>): Promise<Reclamo> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/claim/updateClaim/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(reclamo),
    // })
    // if (!response.ok) throw new Error('Error al actualizar reclamo')
    // return await response.json()

    // Simulación de respuesta
    const reclamoActual = await getOneReclamo(id)

    return {
      ...reclamoActual,
      ...reclamo,
    }
  } catch (error) {
    console.error(`Error al actualizar reclamo con id ${id}:`, error)
    throw error
  }
}

// Función para eliminar un reclamo
export async function removeReclamo(id: number): Promise<void> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/claim/removeClaim/${id}`, {
    //   method: 'DELETE',
    // })
    // if (!response.ok) throw new Error('Error al eliminar reclamo')

    // Simulación de respuesta
    console.log(`Reclamo con id ${id} eliminado correctamente`)
  } catch (error) {
    console.error(`Error al eliminar reclamo con id ${id}:`, error)
    throw error
  }
}

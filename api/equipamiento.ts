import type { Equipamiento, EquipamientoCreate } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.skyway-airlines.com"

// Función para obtener todo el equipamiento
export async function getAllEquipamiento(): Promise<Equipamiento[]> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/equipment/findAllEquipment`)
    // if (!response.ok) throw new Error('Error al obtener equipamiento')
    // return await response.json()

    // Datos de ejemplo para simular la respuesta de la API
    return [
      {
        id: 1,
        nombre: "Maleta de cabina",
        descripcion: "Maleta de cabina de 55x40x20 cm",
        tipo: "Equipaje",
        disponible: true,
        precio: 89.99,
        imagen: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 2,
        nombre: "Maleta facturada",
        descripcion: "Maleta facturada de 75x50x30 cm",
        tipo: "Equipaje",
        disponible: true,
        precio: 139.99,
        imagen: "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 3,
        nombre: "Almohada de viaje",
        descripcion: "Almohada cervical para viajes largos",
        tipo: "Accesorios",
        disponible: true,
        precio: 49.9,
        imagen: "https://images.unsplash.com/photo-1520996729250-7d888a835cc9?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 4,
        nombre: "Adaptador universal",
        descripcion: "Adaptador de corriente universal para viajes internacionales",
        tipo: "Electrónica",
        disponible: false,
        precio: 79.9,
        imagen: "https://images.unsplash.com/photo-1621972660772-6a0427d5e102?q=80&w=200&auto=format&fit=crop",
      },
    ]
  } catch (error) {
    console.error("Error al obtener equipamiento:", error)
    throw error
  }
}

// Función para obtener un equipamiento específico
export async function getOneEquipamiento(id: number): Promise<Equipamiento> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/equipment/findOneEquipment/${id}`)
    // if (!response.ok) throw new Error('Error al obtener equipamiento')
    // return await response.json()

    // Simulación de respuesta
    const equipamientos = await getAllEquipamiento()
    const equipamiento = equipamientos.find((e) => e.id === id)

    if (!equipamiento) {
      throw new Error("Equipamiento no encontrado")
    }

    return equipamiento
  } catch (error) {
    console.error(`Error al obtener equipamiento con id ${id}:`, error)
    throw error
  }
}

// Función para crear un nuevo equipamiento
export async function createEquipamiento(equipamiento: EquipamientoCreate): Promise<Equipamiento> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/equipment/createEquipment`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(equipamiento),
    // })
    // if (!response.ok) throw new Error('Error al crear equipamiento')
    // return await response.json()

    // Simulación de respuesta
    return {
      id: Math.floor(Math.random() * 1000) + 5,
      ...equipamiento,
    }
  } catch (error) {
    console.error("Error al crear equipamiento:", error)
    throw error
  }
}

// Función para actualizar un equipamiento
export async function updateEquipamiento(id: number, equipamiento: Partial<EquipamientoCreate>): Promise<Equipamiento> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/equipment/updateEquipment/${id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(equipamiento),
    // })
    // if (!response.ok) throw new Error('Error al actualizar equipamiento')
    // return await response.json()

    // Simulación de respuesta
    const equipamientoActual = await getOneEquipamiento(id)

    return {
      ...equipamientoActual,
      ...equipamiento,
    }
  } catch (error) {
    console.error(`Error al actualizar equipamiento con id ${id}:`, error)
    throw error
  }
}

// Función para eliminar un equipamiento
export async function removeEquipamiento(id: number): Promise<void> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/equipment/removeEquipment/${id}`, {
    //   method: 'DELETE',
    // })
    // if (!response.ok) throw new Error('Error al eliminar equipamiento')

    // Simulación de respuesta
    console.log(`Equipamiento con id ${id} eliminado correctamente`)
  } catch (error) {
    console.error(`Error al eliminar equipamiento con id ${id}:`, error)
    throw error
  }
}

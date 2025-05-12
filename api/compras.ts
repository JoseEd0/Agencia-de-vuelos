import type { Compra, CompraCreate } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.skyway-airlines.com"

// Función para obtener todas las compras
export async function getCompras(): Promise<Compra[]> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/compras/`)
    // if (!response.ok) throw new Error('Error al obtener compras')
    // return await response.json()

    // Datos de ejemplo para simular la respuesta de la API
    return [
      {
        id: 1,
        pasajeroId: 1,
        fechaCompra: "2023-05-10",
        total: 1450.5,
        estado: "Completada",
        metodoPago: "Tarjeta de crédito",
        detalles: [
          {
            id: 1,
            compraId: 1,
            producto: "Vuelo Lima-Cusco",
            cantidad: 1,
            precioUnitario: 420.5,
            subtotal: 420.5,
          },
          {
            id: 2,
            compraId: 1,
            producto: "Seguro de viaje",
            cantidad: 1,
            precioUnitario: 130.0,
            subtotal: 130.0,
          },
          {
            id: 3,
            compraId: 1,
            producto: "Equipaje adicional",
            cantidad: 2,
            precioUnitario: 450.0,
            subtotal: 900.0,
          },
        ],
      },
      {
        id: 2,
        pasajeroId: 2,
        fechaCompra: "2023-06-15",
        total: 2850.75,
        estado: "Completada",
        metodoPago: "PayPal",
        detalles: [
          {
            id: 4,
            compraId: 2,
            producto: "Vuelo Lima-Arequipa",
            cantidad: 1,
            precioUnitario: 320.75,
            subtotal: 320.75,
          },
          {
            id: 5,
            compraId: 2,
            producto: "Alojamiento",
            cantidad: 3,
            precioUnitario: 510.0,
            subtotal: 1530.0,
          },
          {
            id: 6,
            compraId: 2,
            producto: "Tour Ciudad Blanca",
            cantidad: 2,
            precioUnitario: 500.0,
            subtotal: 1000.0,
          },
        ],
      },
    ]
  } catch (error) {
    console.error("Error al obtener compras:", error)
    throw error
  }
}

// Función para crear una nueva compra
export async function createCompra(compra: CompraCreate): Promise<Compra> {
  try {
    // En un entorno real, esto haría una solicitud a la API
    // const response = await fetch(`${API_URL}/compras/`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(compra),
    // })
    // if (!response.ok) throw new Error('Error al crear compra')
    // return await response.json()

    // Simulación de respuesta
    const detalles = compra.detalles.map((detalle, index) => ({
      id: Math.floor(Math.random() * 1000) + 10,
      compraId: Math.floor(Math.random() * 1000) + 3,
      ...detalle,
    }))

    return {
      id: Math.floor(Math.random() * 1000) + 3,
      ...compra,
      detalles,
    }
  } catch (error) {
    console.error("Error al crear compra:", error)
    throw error
  }
}

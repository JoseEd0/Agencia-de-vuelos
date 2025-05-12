// Tipos para Pasajero
export interface Pasajero {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  fechaNacimiento: string
  nacionalidad: string
  numeroDocumento: string
  tipoDocumento: string
}

export interface PasajeroCreate {
  nombre: string
  apellido: string
  email: string
  telefono: string
  fechaNacimiento: string
  nacionalidad: string
  numeroDocumento: string
  tipoDocumento: string
}

// Tipos para Membresia
export interface Membresia {
  id: number
  nombre: string
  descripcion: string
  beneficios: string[]
  precio: number
  duracion: string
  pasajeroId: number
  fechaInicio: string
  fechaFin: string
}

export interface MembresiaCreate {
  nombre: string
  descripcion: string
  beneficios: string[]
  precio: number
  duracion: string
  pasajeroId: number
  fechaInicio: string
  fechaFin: string
}

// Tipos para Compra
export interface Compra {
  id: number
  pasajeroId: number
  fechaCompra: string
  total: number
  estado: string
  metodoPago: string
  detalles: DetalleCompra[]
}

export interface CompraCreate {
  pasajeroId: number
  fechaCompra: string
  total: number
  estado: string
  metodoPago: string
  detalles: DetalleCompraCreate[]
}

export interface DetalleCompra {
  id: number
  compraId: number
  producto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

export interface DetalleCompraCreate {
  producto: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

// Tipos para Equipamiento
export interface Equipamiento {
  id: number
  nombre: string
  descripcion: string
  tipo: string
  disponible: boolean
  precio: number
  imagen: string
}

export interface EquipamientoCreate {
  nombre: string
  descripcion: string
  tipo: string
  disponible: boolean
  precio: number
  imagen: string
}

// Tipos para Reclamo
export interface Reclamo {
  id: number
  pasajeroId: number
  titulo: string
  descripcion: string
  fechaCreacion: string
  estado: string
  prioridad: string
  respuesta?: string
}

export interface ReclamoCreate {
  pasajeroId: number
  titulo: string
  descripcion: string
  fechaCreacion: string
  estado: string
  prioridad: string
}

// Tipos para errores de validación
export interface ValidationError {
  loc: string[]
  msg: string
  type: string
}

export interface HTTPValidationError {
  detail: ValidationError[]
}

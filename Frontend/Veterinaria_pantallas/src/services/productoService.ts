// src/services/productoService.ts
import { api } from "./api";

export interface Producto {
  id?: string;       // Prisma usa UUID → string
  nombre: string;
  precio: number;
  stock: number;
  imagen: string;
  categoriaId: string;

  categoria?: {
    id: string;
    nombre: string;
    descripcion: string;
    icono: string;
  };
}

// DTO de creación (lo mismo que enviará el formulario)
export type CreateProductoDto = Omit<Producto, "id" | "categoria">;

// DTO actualización (parcial)
export type UpdateProductoDto = Partial<CreateProductoDto>;

export const productoService = {
  // GET /producto
  async getAll(): Promise<Producto[]> {
    const res = await api.get<Producto[]>("/producto");
    return res.data;
  },

  // GET /producto/:id
  async getById(id: string): Promise<Producto> {
    const res = await api.get<Producto>(`/producto/${id}`);
    return res.data;
  },

  // POST /producto
  async create(data: CreateProductoDto): Promise<Producto> {
    const res = await api.post<Producto>("/producto", data);
    return res.data;
  },

  // PATCH /producto/:id
  async update(id: string, data: UpdateProductoDto): Promise<Producto> {
    const res = await api.patch<Producto>(`/producto/${id}`, data);
    return res.data;
  },

  // DELETE /producto/:id
  async remove(id: string): Promise<void> {
    await api.delete(`/producto/${id}`);
  },
};

// src/services/categoriaProductoService.ts
import { api } from "./api";

// 📌 Modelo según Prisma
export interface CategoriaProducto {
  id?: string; // si tu Prisma usa ID UUID (String), se deja así
  nombre: string;
  descripcion: string;
  icono: string;
  productos?: any[]; // si quieres puedes tiparlo luego
}

// 📌 DTOs
export type CreateCategoriaProductoDto = Omit<CategoriaProducto, "id" | "productos">;

export type UpdateCategoriaProductoDto = Partial<CreateCategoriaProductoDto>;

export const categoriaProductoService = {
  // GET /categoria-producto
  async getAll(): Promise<CategoriaProducto[]> {
    const res = await api.get<CategoriaProducto[]>("/categoria-producto");
    return res.data;
  },

  // GET /categoria-producto/:id
  async getById(id: string): Promise<CategoriaProducto> {
    const res = await api.get<CategoriaProducto>(`/categoria-producto/${id}`);
    return res.data;
  },

  // POST /categoria-producto
  async create(data: CreateCategoriaProductoDto): Promise<CategoriaProducto> {
    const res = await api.post<CategoriaProducto>("/categoria-producto", data);
    return res.data;
  },

  // PATCH /categoria-producto/:id
  async update(id: string, data: UpdateCategoriaProductoDto): Promise<CategoriaProducto> {
    const res = await api.patch<CategoriaProducto>(`/categoria-producto/${id}`, data);
    return res.data;
  },

  // DELETE /categoria-producto/:id
  async remove(id: string): Promise<void> {
    await api.delete(`/categoria-producto/${id}`);
  },
};

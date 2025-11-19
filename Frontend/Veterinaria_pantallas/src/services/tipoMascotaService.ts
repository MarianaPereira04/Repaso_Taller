// src/services/tipoMascotaService.ts
import { api } from "./api";

export interface TipoMascota {
  id?: string;         // si en tu Prisma el id es number, cámbialo a number
  nombre: string;
  descripcion: string;
  icono: string;
}

export type CreateTipoMascotaDto = Omit<TipoMascota, "id">;
export type UpdateTipoMascotaDto = Partial<CreateTipoMascotaDto>;

export const tipoMascotaService = {
  async getAll(): Promise<TipoMascota[]> {
    const res = await api.get<TipoMascota[]>("/tipo-mascota"); // 👈 OJO ruta
    return res.data;
  },

  async getById(id: string): Promise<TipoMascota> {
    const res = await api.get<TipoMascota>(`/tipo-mascota/${id}`);
    return res.data;
  },

  async create(data: CreateTipoMascotaDto): Promise<TipoMascota> {
    const res = await api.post<TipoMascota>("/tipo-mascota", data);
    return res.data;
  },

  async update(id: string, data: UpdateTipoMascotaDto): Promise<TipoMascota> {
    const res = await api.patch<TipoMascota>(`/tipo-mascota/${id}`, data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/tipo-mascota/${id}`);
  },
};

// src/services/mascotaService.ts
import { api } from "./api";

export interface TipoMascota {
  id: string;
  nombre?: string;
  descripcion?: string;
}

export interface Mascota {
  id?: string;
  nombre: string;
  raza: string;
  edad: number;
  sexo: string;
  propietario: string;
  estadoSalud: string;
  tipoMascotaId: string;
  tipoMascota?: TipoMascota;
}

// Para formularios: todo en string menos lo que luego convertimos
export type CreateMascotaDto = {
  nombre: string;
  raza: string;
  edad: string;          // lo convertimos a number antes de enviar
  sexo: string;
  propietario: string;
  estadoSalud: string;
  tipoMascotaId: string; // por ahora será un texto, luego dropdown
};

export type UpdateMascotaDto = Partial<CreateMascotaDto>;

export const mascotaService = {
  async getAll(): Promise<Mascota[]> {
    const res = await api.get<Mascota[]>("/mascota");
    return res.data;
  },

  async getById(id: string): Promise<Mascota> {
    const res = await api.get<Mascota>(`/mascota/${id}`);
    return res.data;
  },

  async create(data: CreateMascotaDto): Promise<Mascota> {
    const res = await api.post<Mascota>("/mascota", {
      ...data,
      edad: Number(data.edad),
    });
    return res.data;
  },

  async update(id: string, data: UpdateMascotaDto): Promise<Mascota> {
    const res = await api.patch<Mascota>(`/mascota/${id}`, {
      ...data,
      edad:
        data.edad !== undefined && data.edad !== null
          ? Number(data.edad)
          : undefined,
    });
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/mascota/${id}`);
  },
};

// src/services/usuarioService.ts
import { api } from "./api";

export interface Usuario {
  id?: string;        // en backend seguro es string (UUID)
  nombre: string;
  correo: string;
  telefono?: string;
  rol: string;
  estado?: string;
}

// lo que se manda al crear
export type CreateUsuarioDto = Omit<Usuario, "id">;

// lo que se manda al actualizar (parcial)
export type UpdateUsuarioDto = Partial<CreateUsuarioDto>;

export const usuarioService = {
  // GET /usuarios
  async getAll(): Promise<Usuario[]> {
    const res = await api.get<Usuario[]>("/usuarios");
    return res.data;
  },

  // GET /usuarios/:id
  async getById(id: string): Promise<Usuario> {
    const res = await api.get<Usuario>(`/usuarios/${id}`);
    return res.data;
  },

  // POST /usuarios
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const res = await api.post<Usuario>("/usuarios", data);
    return res.data;
  },

  // PATCH /usuarios/:id
  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    const res = await api.patch<Usuario>(`/usuarios/${id}`, data);
    return res.data;
  },

  // DELETE /usuarios/:id
  async remove(id: string): Promise<void> {
    await api.delete(`/usuarios/${id}`);
  },
};

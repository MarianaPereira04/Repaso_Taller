import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../theme/genericos/create.css";
import BaseLayout from "../../layout/BaseLayout";
import {
  usuarioService,
  UpdateUsuarioDto,
} from "../../services/usuarioService";

interface RouteParams {
  id: string;
}

const EditarUsuario: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<UpdateUsuarioDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await usuarioService.getById(id);
        setForm({
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono ?? "",
          rol: data.rol,
          estado: data.estado ?? "",
        });
      } catch (error) {
        console.error("Error cargando usuario para edición", error);
        alert("No se pudo cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (field: keyof UpdateUsuarioDto, value: string) => {
    if (!form) return;
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form) return;

    try {
      await usuarioService.update(id, form);
      // opcional: alert("Usuario actualizado");
      history.push("/users");
    } catch (error) {
      console.error("Error actualizando usuario", error);
      alert("Ocurrió un error actualizando el usuario");
    }
  };

  if (loading || !form) {
    return (
      <BaseLayout title="Editar Usuario">
        <p>Cargando datos...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Editar Usuario">
      <form className="usuario-form">
        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre completo</label>
          <input
            className="campo-input"
            type="text"
            value={form.nombre ?? ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
        </div>

        {/* Correo */}
        <div className="campo">
          <label className="campo-label">Correo electrónico</label>
          <input
            className="campo-input"
            type="email"
            value={form.correo ?? ""}
            onChange={(e) => handleChange("correo", e.target.value)}
          />
        </div>

        {/* Teléfono */}
        <div className="campo">
          <label className="campo-label">Teléfono</label>
          <input
            className="campo-input"
            type="tel"
            value={form.telefono ?? ""}
            onChange={(e) => handleChange("telefono", e.target.value)}
          />
        </div>

        {/* Rol */}
        <div className="campo">
          <label className="campo-label">Rol</label>
          <input
            className="campo-input"
            type="text"
            value={form.rol ?? ""}
            onChange={(e) => handleChange("rol", e.target.value)}
          />
        </div>

        {/* Estado */}
        <div className="campo">
          <label className="campo-label">Estado</label>
          <input
            className="campo-input"
            type="text"
            value={form.estado ?? ""}
            onChange={(e) => handleChange("estado", e.target.value)}
          />
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default EditarUsuario;

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

type UsuarioUpdateErrors = Partial<Record<keyof UpdateUsuarioDto, string>>;

const EditarUsuario: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<UpdateUsuarioDto | null>(null);
  const [errors, setErrors] = useState<UsuarioUpdateErrors>({});
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
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    if (!form) return false;

    const newErrors: UsuarioUpdateErrors = {};

    if (!form.nombre?.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!form.correo?.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "El correo no tiene un formato válido";
    }

    if (!form.telefono?.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(form.telefono)) {
      newErrors.telefono = "El teléfono solo debe contener números";
    } else if (form.telefono.length < 7) {
      newErrors.telefono = "El teléfono debe tener al menos 7 dígitos";
    }

    if (!form.rol?.trim()) {
      newErrors.rol = "El rol es obligatorio";
    }

    if (!form.estado?.trim()) {
      newErrors.estado = "El estado es obligatorio";
    } else if (!["ACTIVO", "INACTIVO"].includes(form.estado)) {
      newErrors.estado = "El estado debe ser ACTIVO o INACTIVO";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!form) return;

    if (!validate()) return; // ❌ no manda si hay errores

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
          {errors.nombre && (
            <span className="campo-error">{errors.nombre}</span>
          )}
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
          {errors.correo && (
            <span className="campo-error">{errors.correo}</span>
          )}
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
          {errors.telefono && (
            <span className="campo-error">{errors.telefono}</span>
          )}
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
          {errors.rol && <span className="campo-error">{errors.rol}</span>}
        </div>

        {/* Estado — ahora también SELECT */}
        <div className="campo">
          <label className="campo-label">Estado</label>
          <select
            className="campo-input"
            value={form.estado ?? ""}
            onChange={(e) => handleChange("estado", e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
          {errors.estado && (
            <span className="campo-error">{errors.estado}</span>
          )}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default EditarUsuario;

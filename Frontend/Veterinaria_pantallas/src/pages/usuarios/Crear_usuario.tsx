import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../theme/genericos/create.css";
import BaseLayout from "../../layout/BaseLayout";
import {
  usuarioService,
  CreateUsuarioDto,
} from "../../services/usuarioService";

type UsuarioErrors = Partial<Record<keyof CreateUsuarioDto, string>>;

const CreateUsuario: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<CreateUsuarioDto>({
    nombre: "",
    correo: "",
    telefono: "" as any, // por si en el dto está como number
    rol: "",
    estado: "",
  });

  const [errors, setErrors] = useState<UsuarioErrors>({});

  const handleChange = (field: keyof CreateUsuarioDto, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: UsuarioErrors = {};

    // Nombre obligatorio
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    // Correo obligatorio + formato básico
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "El correo no tiene un formato válido";
    }

    // 🔹 Teléfono obligatorio, solo dígitos, mínimo 7
    const phone = String(form.telefono ?? "").trim(); // 👈 siempre string

    if (!phone) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.telefono = "El teléfono solo debe contener números";
    } else if (phone.length < 7) {
      newErrors.telefono = "El teléfono debe tener al menos 7 dígitos";
    }

    // Rol obligatorio
    if (!form.rol.trim()) {
      newErrors.rol = "El rol es obligatorio";
    }

    // Estado obligatorio y con valor válido
    const estado = String(form.estado ?? "").trim();  // 🔒 siempre string

    if (!estado) {
      newErrors.estado = "El estado es obligatorio";
    } else if (!["ACTIVO", "INACTIVO"].includes(estado)) {
      newErrors.estado = "El estado debe ser ACTIVO o INACTIVO";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // 👇 por si el backend espera número, lo puedes castear aquí:
      const payload: CreateUsuarioDto = {
        ...form,
        telefono: String(form.telefono), // o Number(...) si tu dto es number
      };

      await usuarioService.create(payload);
      history.push("/users");
    } catch (error) {
      console.error("Error creando usuario", error);
      alert("Ocurrió un error creando el usuario");
    }
  };

  return (
    <BaseLayout title="Crear Usuario">
      <form className="usuario-form">
        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre completo</label>
          <input
            className="campo-input"
            type="text"
            value={form.nombre}
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
            value={form.correo}
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
            value={String(form.telefono ?? "")}
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
            value={form.rol}
            onChange={(e) => handleChange("rol", e.target.value)}
          />
          {errors.rol && <span className="campo-error">{errors.rol}</span>}
        </div>

        {/* Estado — SELECT */}
        <div className="campo">
          <label className="campo-label">Estado</label>
          <select
            className="campo-input"
            value={form.estado}
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
          Registrar
        </button>
      </form>
    </BaseLayout>
  );
};

export default CreateUsuario;

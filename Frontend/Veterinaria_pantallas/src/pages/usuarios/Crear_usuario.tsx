import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../../theme/genericos/create.css";
import BaseLayout from "../../layout/BaseLayout";

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
  rol: string;
  estado: string;
}

const CreateUsuario: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<Usuario>({
    nombre: "",
    correo: "",
    telefono: "",
    rol: "",
    estado: "",
  });

  const handleChange = (field: keyof Usuario, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Usuario creado:", form);
    history.push("/users");
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
        </div>

        {/* Teléfono */}
        <div className="campo">
          <label className="campo-label">Teléfono</label>
          <input
            className="campo-input"
            type="tel"
            value={form.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
          />
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
        </div>

        {/* Estado */}
        <div className="campo">
          <label className="campo-label">Estado</label>
          <input
            className="campo-input"
            type="text"
            value={form.estado}
            onChange={(e) => handleChange("estado", e.target.value)}
          />
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Registrar
        </button>
      </form>
    </BaseLayout>
  );
};

export default CreateUsuario;

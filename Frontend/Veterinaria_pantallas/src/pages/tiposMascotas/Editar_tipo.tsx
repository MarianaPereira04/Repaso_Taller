// src/pages/tiposMascotas/Editar_tipo.tsx
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

interface TipoMascota {
  nombre: string;
  descripcion: string;
  icono: string;
}

const Editar_tipo: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ tipo: TipoMascota }>();
  const tipo = location.state?.tipo || { nombre: "", descripcion: "", icono: "" };

  const [form, setForm] = useState<TipoMascota>(tipo);

  const handleChange = (field: keyof TipoMascota, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Tipo editado:", form);
    history.push("/types");
  };

  return (
    <BaseLayout title="Editar Tipo de Mascota">
      <form className="usuario-form" style={{ gap: "40px" }}>

        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre del tipo</label>
          <input
            className="campo-input"
            type="text"
            value={form.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div className="campo">
          <label className="campo-label">Descripción</label>
          <input
            className="campo-input"
            type="text"
            value={form.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
          />
        </div>

        {/* Icono */}
        <div className="campo">
          <label className="campo-label">URL del ícono</label>
          <input
            className="campo-input"
            type="text"
            value={form.icono}
            onChange={(e) => handleChange("icono", e.target.value)}
          />
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>

      </form>
    </BaseLayout>
  );
};

export default Editar_tipo;

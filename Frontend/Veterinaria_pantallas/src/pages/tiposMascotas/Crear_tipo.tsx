import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  tipoMascotaService,
  CreateTipoMascotaDto,
} from "../../services/tipoMascotaService";

const Crear_tipo: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<CreateTipoMascotaDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const handleChange = (field: keyof CreateTipoMascotaDto, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await tipoMascotaService.create(form);
      // alert("Tipo de mascota creado");
      history.push("/types");
    } catch (error) {
      console.error("Error creando tipo de mascota", error);
      alert("Ocurrió un error creando el tipo de mascota");
    }
  };

  return (
    <BaseLayout title="Crear Tipo de Mascota">
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
          Crear Tipo
        </button>
      </form>
    </BaseLayout>
  );
};

export default Crear_tipo;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  tipoMascotaService,
  CreateTipoMascotaDto,
} from "../../services/tipoMascotaService";

type TipoErrors = Partial<Record<keyof CreateTipoMascotaDto, string>>;

const Crear_tipo: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<CreateTipoMascotaDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const [errors, setErrors] = useState<TipoErrors>({});

  const handleChange = (field: keyof CreateTipoMascotaDto, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: TipoErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!form.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria";

    if (!form.icono.trim()) {
      newErrors.icono = "La URL del icono es obligatoria";
    } else if (!/^https?:\/\/.+/i.test(form.icono)) {
      newErrors.icono = "Debes ingresar una URL válida (http o https)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await tipoMascotaService.create(form);
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
          {errors.nombre && <span className="campo-error">{errors.nombre}</span>}
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
          {errors.descripcion && (
            <span className="campo-error">{errors.descripcion}</span>
          )}
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
          {errors.icono && <span className="campo-error">{errors.icono}</span>}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Crear Tipo
        </button>
      </form>
    </BaseLayout>
  );
};

export default Crear_tipo;

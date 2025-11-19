import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  tipoMascotaService,
  UpdateTipoMascotaDto,
} from "../../services/tipoMascotaService";

type TipoErrors = Partial<Record<keyof UpdateTipoMascotaDto, string>>;

const Editar_tipo: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<UpdateTipoMascotaDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const [errors, setErrors] = useState<TipoErrors>({});
  const [loading, setLoading] = useState(true);

  // Cargar datos del backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await tipoMascotaService.getById(id);
        setForm({
          nombre: data.nombre ?? "",
          descripcion: data.descripcion ?? "",
          icono: data.icono ?? "",
        });
      } catch (error) {
        console.error("Error cargando tipo", error);
        alert("No se pudo cargar el tipo de mascota");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (field: keyof UpdateTipoMascotaDto, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: TipoErrors = {};

    if (!form.nombre?.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!form.descripcion?.trim())
      newErrors.descripcion = "La descripción es obligatoria";

    if (!form.icono?.trim()) {
      newErrors.icono = "La URL del icono es obligatoria";
    } else if (!/^https?:\/\/.+/i.test(form.icono)) {
      newErrors.icono = "Ingresa una URL válida (http o https)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await tipoMascotaService.update(id, form);
      history.push("/types");
    } catch (error) {
      console.error("Error actualizando tipo", error);
      alert("No se pudo actualizar el tipo");
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Editar Tipo de Mascota">
        <p>Cargando datos...</p>
      </BaseLayout>
    );
  }

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
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default Editar_tipo;

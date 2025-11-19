import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  tipoMascotaService,
  TipoMascota,
  UpdateTipoMascotaDto,
} from "../../services/tipoMascotaService";

const Editar_tipo: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>(); // 👈 recibir ID desde la URL

  const [form, setForm] = useState<UpdateTipoMascotaDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Cargar datos originales del tipo
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await tipoMascotaService.getById(id);
        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          icono: data.icono,
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
  };

  const handleSubmit = async () => {
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

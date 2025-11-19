import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  tipoMascotaService,
  TipoMascota,
  UpdateTipoMascotaDto,
} from "../../services/tipoMascotaService";

interface RouteParams {
  id: string;
}

const Editar_tipo: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<UpdateTipoMascotaDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data: TipoMascota = await tipoMascotaService.getById(id);
        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          icono: data.icono,
        });
      } catch (error) {
        console.error("Error cargando tipo de mascota", error);
        alert("No se pudo cargar el tipo de mascota");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (field: keyof UpdateTipoMascotaDto, value: string) => {
    if (!form) return;
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form) return;

    try {
      await tipoMascotaService.update(id, form);
      // alert("Tipo de mascota actualizado");
      history.push("/types");
    } catch (error) {
      console.error("Error actualizando tipo de mascota", error);
      alert("Ocurrió un error actualizando el tipo de mascota");
    }
  };

  if (loading || !form) {
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
            value={form.nombre ?? ""}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div className="campo">
          <label className="campo-label">Descripción</label>
          <input
            className="campo-input"
            type="text"
            value={form.descripcion ?? ""}
            onChange={(e) => handleChange("descripcion", e.target.value)}
          />
        </div>

        {/* Icono */}
        <div className="campo">
          <label className="campo-label">URL del ícono</label>
          <input
            className="campo-input"
            type="text"
            value={form.icono ?? ""}
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

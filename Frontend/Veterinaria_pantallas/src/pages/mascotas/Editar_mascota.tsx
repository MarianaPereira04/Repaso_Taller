import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

import {
  mascotaService,
  UpdateMascotaDto,
  Mascota,
} from "../../services/mascotaService";

import {
  tipoMascotaService,
  TipoMascota,
} from "../../services/tipoMascotaService";

interface RouteParams {
  id: string;
}

type MascotaErrors = Partial<Record<keyof UpdateMascotaDto, string>>;

const EditarMascota: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<UpdateMascotaDto | null>(null);
  const [errors, setErrors] = useState<MascotaErrors>({});
  const [loading, setLoading] = useState(true);

  const [tipos, setTipos] = useState<TipoMascota[]>([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  // Cargar datos de mascota + tipos
  useEffect(() => {
    const load = async () => {
      try {
        const [mascotaData, tiposData] = await Promise.all([
          mascotaService.getById(id),
          tipoMascotaService.getAll(),
        ]);

        setForm({
          nombre: mascotaData.nombre,
          raza: mascotaData.raza,
          edad: String(mascotaData.edad),
          sexo: mascotaData.sexo,
          propietario: mascotaData.propietario,
          estadoSalud:
            mascotaData.estadoSalud ??
            (mascotaData as any).estado_salud ??
            "",
          tipoMascotaId: mascotaData.tipoMascotaId,
        });

        setTipos(tiposData);
      } catch (error) {
        console.error("Error cargando datos para edición de mascota", error);
        alert("No se pudieron cargar los datos de la mascota");
      } finally {
        setLoading(false);
        setLoadingTipos(false);
      }
    };

    load();
  }, [id]);

  // Control de inputs
  const handleChange = (field: keyof UpdateMascotaDto, value: string) => {
    if (!form) return;
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Validaciones
  const validate = (): boolean => {
    if (!form) return false;

    const newErrors: MascotaErrors = {};

    if (!form.nombre?.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.raza?.trim()) newErrors.raza = "La raza es obligatoria";

    if (!form.edad?.trim()) {
      newErrors.edad = "La edad es obligatoria";
    } else if (isNaN(Number(form.edad))) {
      newErrors.edad = "La edad debe ser un número";
    }

    if (!form.sexo?.trim()) newErrors.sexo = "El sexo es obligatorio";
    if (!form.propietario?.trim())
      newErrors.propietario = "El propietario es obligatorio";

    if (!form.estadoSalud?.trim())
      newErrors.estadoSalud = "El estado de salud es obligatorio";

    if (!form.tipoMascotaId?.trim())
      newErrors.tipoMascotaId = "Debes seleccionar un tipo de mascota";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Enviar actualización
  const handleSubmit = async () => {
    if (!form) return;

    if (!validate()) return;

    try {
      await mascotaService.update(id, form);
      history.push("/pets");
    } catch (error) {
      console.error("Error actualizando mascota", error);
      alert("Ocurrió un error actualizando la mascota");
    }
  };

  if (loading || !form) {
    return (
      <BaseLayout title="Editar Mascota">
        <p>Cargando datos...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Editar Mascota">
      <form className="usuario-form" style={{ gap: "30px" }}>
        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre</label>
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

        {/* Tipo de mascota */}
        <div className="campo">
          <label className="campo-label">Tipo de mascota</label>
          {loadingTipos ? (
            <p>Cargando tipos...</p>
          ) : (
            <select
              className="campo-input"
              value={form.tipoMascotaId ?? ""}
              onChange={(e) => handleChange("tipoMascotaId", e.target.value)}
            >
              <option value="">Selecciona un tipo</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          )}
          {errors.tipoMascotaId && (
            <span className="campo-error">{errors.tipoMascotaId}</span>
          )}
        </div>

        {/* Raza */}
        <div className="campo">
          <label className="campo-label">Raza</label>
          <input
            className="campo-input"
            type="text"
            value={form.raza ?? ""}
            onChange={(e) => handleChange("raza", e.target.value)}
          />
          {errors.raza && <span className="campo-error">{errors.raza}</span>}
        </div>

        {/* Edad */}
        <div className="campo">
          <label className="campo-label">Edad</label>
          <input
            className="campo-input"
            type="number"
            value={form.edad ?? ""}
            onChange={(e) => handleChange("edad", e.target.value)}
          />
          {errors.edad && <span className="campo-error">{errors.edad}</span>}
        </div>

        {/* Sexo */}
        <div className="campo">
          <label className="campo-label">Sexo</label>
          <input
            className="campo-input"
            type="text"
            value={form.sexo ?? ""}
            onChange={(e) => handleChange("sexo", e.target.value)}
          />
          {errors.sexo && <span className="campo-error">{errors.sexo}</span>}
        </div>

        {/* Propietario */}
        <div className="campo">
          <label className="campo-label">Propietario</label>
          <input
            className="campo-input"
            type="text"
            value={form.propietario ?? ""}
            onChange={(e) => handleChange("propietario", e.target.value)}
          />
          {errors.propietario && (
            <span className="campo-error">{errors.propietario}</span>
          )}
        </div>

        {/* Estado de salud */}
        <div className="campo">
          <label className="campo-label">Estado de salud</label>
          <input
            className="campo-input"
            type="text"
            value={form.estadoSalud ?? ""}
            onChange={(e) => handleChange("estadoSalud", e.target.value)}
          />
          {errors.estadoSalud && (
            <span className="campo-error">{errors.estadoSalud}</span>
          )}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default EditarMascota;

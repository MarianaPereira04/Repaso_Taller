import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  mascotaService,
  CreateMascotaDto,
} from "../../services/mascotaService";
import {
  tipoMascotaService,
  TipoMascota,
} from "../../services/tipoMascotaService";

type MascotaErrors = Partial<Record<keyof CreateMascotaDto, string>>;

const RegistrarMascota: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<CreateMascotaDto>({
    nombre: "",
    raza: "",
    edad: "",
    sexo: "",
    propietario: "",
    estadoSalud: "",
    tipoMascotaId: "",
  });

  const [errors, setErrors] = useState<MascotaErrors>({});
  const [tipos, setTipos] = useState<TipoMascota[]>([]);
  const [loadingTipos, setLoadingTipos] = useState(true);

  // 🔹 Traer los tipos de mascota del backend cuando se monta la pantalla
  useEffect(() => {
    const loadTipos = async () => {
      try {
        const data = await tipoMascotaService.getAll();
        setTipos(data);
      } catch (error) {
        console.error("Error cargando tipos de mascota", error);
        alert("No se pudieron cargar los tipos de mascota");
      } finally {
        setLoadingTipos(false);
      }
    };

    loadTipos();
  }, []);

  const handleChange = (field: keyof CreateMascotaDto, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: MascotaErrors = {};

    // Nombre obligatorio
    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    // Tipo de mascota obligatorio
    if (!form.tipoMascotaId) {
      newErrors.tipoMascotaId = "Debes seleccionar un tipo de mascota";
    }

    // Raza obligatoria
    if (!form.raza.trim()) {
      newErrors.raza = "La raza es obligatoria";
    }

    // Edad obligatoria, numérica, >= 0
    const edadStr = String(form.edad ?? "").trim();
    const edadNum = Number(edadStr);

    if (!edadStr) {
      newErrors.edad = "La edad es obligatoria";
    } else if (isNaN(edadNum)) {
      newErrors.edad = "La edad debe ser un número";
    } else if (edadNum < 0) {
      newErrors.edad = "La edad no puede ser negativa";
    }

    // Sexo obligatorio
    if (!form.sexo.trim()) {
      newErrors.sexo = "El sexo es obligatorio";
    }

    // Propietario obligatorio
    if (!form.propietario.trim()) {
      newErrors.propietario = "El nombre del propietario es obligatorio";
    }

    // Estado de salud obligatorio
    if (!form.estadoSalud.trim()) {
      newErrors.estadoSalud = "El estado de salud es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Si el backend espera edad numérica, la puedes transformar aquí:
      const payload: CreateMascotaDto = {
        ...form,
        edad: String(form.edad), // o Number(form.edad) según tu DTO
      };

      await mascotaService.create(payload);
      // opcional: alert("Mascota registrada correctamente");
      history.push("/pets");
    } catch (error) {
      console.error("Error registrando mascota:", error);
      alert("Ocurrió un error registrando la mascota");
    }
  };

  return (
    <BaseLayout title="Registrar Mascota">
      <form className="usuario-form" style={{ gap: "30px" }}>
        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre</label>
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

        {/* Tipo de mascota (desplegable) */}
        <div className="campo">
          <label className="campo-label">Tipo de mascota</label>
          {loadingTipos ? (
            <p>Cargando tipos...</p>
          ) : (
            <>
              <select
                className="campo-input"
                value={form.tipoMascotaId}
                onChange={(e) => handleChange("tipoMascotaId", e.target.value)}
              >
                <option value="">Selecciona un tipo</option>
                {tipos.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre}
                  </option>
                ))}
              </select>
              {errors.tipoMascotaId && (
                <span className="campo-error">{errors.tipoMascotaId}</span>
              )}
            </>
          )}
        </div>

        {/* Raza */}
        <div className="campo">
          <label className="campo-label">Raza</label>
          <input
            className="campo-input"
            type="text"
            value={form.raza}
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
            value={String(form.edad ?? "")}
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
            value={form.sexo}
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
            value={form.propietario}
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
            value={form.estadoSalud}
            onChange={(e) => handleChange("estadoSalud", e.target.value)}
          />
          {errors.estadoSalud && (
            <span className="campo-error">{errors.estadoSalud}</span>
          )}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Registrar Mascota
        </button>
      </form>
    </BaseLayout>
  );
};

export default RegistrarMascota;

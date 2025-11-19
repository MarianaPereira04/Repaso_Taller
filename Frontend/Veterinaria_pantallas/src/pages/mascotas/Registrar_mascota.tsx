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
  };

  const handleSubmit = async () => {
    if (!form.tipoMascotaId) {
      alert("Selecciona un tipo de mascota");
      return;
    }

    try {
      await mascotaService.create(form);
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
        </div>

        {/* Tipo de mascota (desplegable) */}
        <div className="campo">
          <label className="campo-label">Tipo de mascota</label>
          {loadingTipos ? (
            <p>Cargando tipos...</p>
          ) : (
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
        </div>

        {/* Edad */}
        <div className="campo">
          <label className="campo-label">Edad</label>
          <input
            className="campo-input"
            type="number"
            value={form.edad}
            onChange={(e) => handleChange("edad", e.target.value)}
          />
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
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Registrar Mascota
        </button>
      </form>
    </BaseLayout>
  );
};

export default RegistrarMascota;

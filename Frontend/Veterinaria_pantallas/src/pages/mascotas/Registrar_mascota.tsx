// src/pages/mascotas/RegistrarMascota.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css"; 

export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  sexo: string;
  propietario: string;
  estado_salud: string;
}

const RegistrarMascota: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<Mascota>({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    propietario: "",
    estado_salud: "",
  });

  const handleChange = (field: keyof Mascota, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Mascota registrada:", form);
    history.push("/pets");
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

        {/* Especie */}
        <div className="campo">
          <label className="campo-label">Especie</label>
          <input
            className="campo-input"
            type="text"
            value={form.especie}
            onChange={(e) => handleChange("especie", e.target.value)}
          />
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
            type="text"
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
            value={form.estado_salud}
            onChange={(e) => handleChange("estado_salud", e.target.value)}
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

// src/pages/mascotas/DetalleMascota.tsx
import React from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/detalle.css";

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

const DetalleMascota: React.FC = () => {
  const history = useHistory();

  const mascota: Mascota = {
    nombre: "Firulais",
    especie: "Perro",
    raza: "Labrador",
    edad: "3",
    sexo: "Macho",
    propietario: "Juan Pérez",
    estado_salud: "Sano",
  };

  return (
    <BaseLayout title="Detalle Mascota">
      <div className="usuario-detalle">
        {/* Imagen circular */}
        <div className="detalle-imagen" style={{ marginBottom: "16px" }}>
          <img src="/assets/perfil.webp" alt="Mascota" />
        </div>

        {/* Información */}
        <div className="detalle-info" style={{ gap: "5px"}}>
          <div className="detalle-item"><strong>Nombre:</strong> <span>{mascota.nombre}</span></div>
          <div className="detalle-item"><strong>Especie:</strong> <span>{mascota.especie}</span></div>
          <div className="detalle-item"><strong>Raza:</strong> <span>{mascota.raza}</span></div>
          <div className="detalle-item"><strong>Edad:</strong> <span>{mascota.edad}</span></div>
          <div className="detalle-item"><strong>Sexo:</strong> <span>{mascota.sexo}</span></div>
          <div className="detalle-item"><strong>Propietario:</strong> <span>{mascota.propietario}</span></div>
          <div className="detalle-item"><strong>Estado de salud:</strong> <span>{mascota.estado_salud}</span></div>
        </div>

        {/* Botón volver */}
        <div
          className="boton-crear-usuario"
          onClick={() => history.push("/pets")}
        >
          Volver a la lista
        </div>
      </div>
    </BaseLayout>
  );
};

export default DetalleMascota;

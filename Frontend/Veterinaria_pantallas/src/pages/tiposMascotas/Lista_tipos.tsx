// src/tiposMascotas/Listar_tipo.tsx
import React from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import { IonButton } from "@ionic/react";

interface TipoMascota {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string; // ruta de la imagen o icono
}

const Listar_tipo: React.FC = () => {
  const history = useHistory();

  const tipos: TipoMascota[] = [
    { id: 1, nombre: "Perro", descripcion: "Animales domésticos leales y activos", icono: "/assets/tipo_mascota.png" },
    { id: 2, nombre: "Gato", descripcion: "Felinos domésticos independientes y curiosos", icono: "/assets/tipo_mascota.png" },
  ];

  return (
    <BaseLayout title="Lista de Tipos de Mascotas">
      <div className="usuarios-container">
        {tipos.map((t) => (
          <div key={t.id} className="usuario-card">
            <img src={t.icono} alt={t.nombre} style={{ width: "80px", height: "80px", marginBottom: "10px" }} />
            <h3>{t.nombre}</h3>
            <h3>{t.descripcion}</h3>
            <div className="card-actions">
              <IonButton size="small" onClick={() => history.push("/types/edit")}>Editar</IonButton>
            </div>
          </div>
        ))}
      </div>

      <div
        className="boton-lista"
        onClick={() => history.push("/types/create")}
      >
        Crear nuevo tipo
      </div>

      <div
        className="boton-lista"
        onClick={() => history.push("/pets")}
      >
        Volver a Mascotas
      </div>
    </BaseLayout>
  );
};

export default Listar_tipo;

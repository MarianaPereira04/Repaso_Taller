import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/detalle.css";
import { mascotaService, Mascota } from "../../services/mascotaService";

interface RouteParams {
  id: string;
}

const DetalleMascota: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await mascotaService.getById(id);
        setMascota(data);
      } catch (error) {
        console.error("Error cargando detalle de mascota", error);
        alert("No se pudo cargar la mascota");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <BaseLayout title="Detalle Mascota">
        <p>Cargando mascota...</p>
      </BaseLayout>
    );
  }

  if (!mascota) {
    return (
      <BaseLayout title="Detalle Mascota">
        <p>Mascota no encontrada</p>
        <div
          className="boton-crear-usuario"
          onClick={() => history.push("/pets")}
        >
          Volver a la lista
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Detalle Mascota">
      <div className="usuario-detalle">
        {/* Imagen circular */}
        <div className="detalle-imagen" style={{ marginBottom: "16px" }}>
          <img src="/assets/perfil.webp" alt="Mascota" />
        </div>

        {/* Información */}
        <div className="detalle-info" style={{ gap: "5px" }}>
          <div className="detalle-item">
            <strong>Nombre:</strong> <span>{mascota.nombre}</span>
          </div>
          <div className="detalle-item">
            <strong>Especie / Tipo:</strong>{" "}
            <span>{mascota.tipoMascota?.nombre ?? mascota.tipoMascotaId}</span>
          </div>
          <div className="detalle-item">
            <strong>Raza:</strong> <span>{mascota.raza}</span>
          </div>
          <div className="detalle-item">
            <strong>Edad:</strong> <span>{mascota.edad}</span>
          </div>
          <div className="detalle-item">
            <strong>Sexo:</strong> <span>{mascota.sexo}</span>
          </div>
          <div className="detalle-item">
            <strong>Propietario:</strong> <span>{mascota.propietario}</span>
          </div>
          <div className="detalle-item">
            <strong>Estado de salud:</strong>{" "}
            <span>{mascota.estadoSalud}</span>
          </div>
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

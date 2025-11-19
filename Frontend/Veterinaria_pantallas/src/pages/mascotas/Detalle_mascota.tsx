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

  /** 🔹 Validadores suaves */
  const safeText = (value?: string | number) => {
    if (value === null || value === undefined || value === "") return "No registrado";
    return String(value);
  };

  const safeTipo = () => {
    if (!mascota) return "No registrado";

    return mascota.tipoMascota?.nombre 
      ?? mascota.tipoMascotaId 
      ?? "No registrado";
  };

  const safeEdad = () => {
    if (!mascota) return "Edad no disponible";
    if (mascota.edad === undefined || mascota.edad === null) return "Edad no disponible";
    if (Number.isNaN(Number(mascota.edad))) return "Edad no válida";
    return mascota.edad;
  };

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

        {/* Información con validación */}
        <div className="detalle-info" style={{ gap: "5px" }}>
          
          <div className="detalle-item">
            <strong>Nombre:</strong> 
            <span>{safeText(mascota.nombre)}</span>
          </div>

          <div className="detalle-item">
            <strong>Especie / Tipo:</strong> 
            <span>{safeTipo()}</span>
          </div>

          <div className="detalle-item">
            <strong>Raza:</strong> 
            <span>{safeText(mascota.raza)}</span>
          </div>

          <div className="detalle-item">
            <strong>Edad:</strong> 
            <span>{safeEdad()}</span>
          </div>

          <div className="detalle-item">
            <strong>Sexo:</strong> 
            <span>{safeText(mascota.sexo)}</span>
          </div>

          <div className="detalle-item">
            <strong>Propietario:</strong> 
            <span>{safeText(mascota.propietario)}</span>
          </div>

          <div className="detalle-item">
            <strong>Estado de salud:</strong> 
            <span>{safeText(mascota.estadoSalud)}</span>
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

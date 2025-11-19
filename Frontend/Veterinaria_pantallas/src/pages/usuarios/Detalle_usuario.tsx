import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import "../../theme/genericos/detalle.css";
import { usuarioService, Usuario } from "../../services/usuarioService";

interface RouteParams {
  id: string;
}

const DetalleUsuario: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await usuarioService.getById(id);
        setUsuario(data);
      } catch (error) {
        console.error("Error cargando detalle de usuario", error);
        alert("No se pudo cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <BaseLayout title="Detalle Usuario">
        <p>Cargando usuario...</p>
      </BaseLayout>
    );
  }

  if (!usuario) {
    return (
      <BaseLayout title="Detalle Usuario">
        <p>Usuario no encontrado</p>
        <div
          className="boton-crear-usuario"
          onClick={() => history.push("/users")}
        >
          Volver a la lista
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Detalle Usuario">
      <div className="usuario-detalle">
        {/* Imagen de usuario arriba */}
        <div className="detalle-imagen">
          <img src="/assets/perfil.webp" alt="Usuario" />
        </div>

        {/* Información del usuario */}
        <div className="detalle-info">
          <div className="detalle-item">
            <strong>Nombre completo:</strong> <span>{usuario.nombre}</span>
          </div>
          <div className="detalle-item">
            <strong>Correo electrónico:</strong> <span>{usuario.correo}</span>
          </div>
          <div className="detalle-item">
            <strong>Teléfono:</strong>{" "}
            <span>{usuario.telefono ?? "N/A"}</span>
          </div>
          <div className="detalle-item">
            <strong>Rol:</strong> <span>{usuario.rol}</span>
          </div>
          <div className="detalle-item">
            <strong>Estado:</strong>{" "}
            <span>{usuario.estado ?? "N/A"}</span>
          </div>
        </div>

        {/* Botón volver */}
        <div
          className="boton-crear-usuario"
          onClick={() => history.push("/users")}
        >
          Volver a la lista
        </div>
      </div>
    </BaseLayout>
  );
};

export default DetalleUsuario;

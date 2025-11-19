// src/pages/tiposMascotas/Lista_tipos.tsx
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonButton } from "@ionic/react";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import {
  tipoMascotaService,
  TipoMascota,
} from "../../services/tipoMascotaService";
import ConfirmDialog from "../../components/confirmDialog";

const Listar_tipo: React.FC = () => {
  const history = useHistory();
  const [tipos, setTipos] = useState<TipoMascota[]>([]);
  const [loading, setLoading] = useState(true);

  const [tipoAEliminar, setTipoAEliminar] = useState<TipoMascota | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await tipoMascotaService.getAll();
        console.log("Tipos de mascota desde backend:", data);
        setTipos(data);
      } catch (error) {
        console.error("Error cargando tipos de mascota", error);
        alert("Ocurrió un error cargando los tipos de mascota");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const abrirConfirmacion = (tipo: TipoMascota) => {
    setTipoAEliminar(tipo);
  };

  const cerrarConfirmacion = () => {
    setTipoAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!tipoAEliminar?.id) return;

    try {
      setDeleting(true);
      await tipoMascotaService.remove(tipoAEliminar.id);
      // quitar de la lista en pantalla
      setTipos((prev) => prev.filter((t) => t.id !== tipoAEliminar.id));
      cerrarConfirmacion();
    } catch (error) {
      console.error("Error eliminando tipo de mascota", error);
      alert("Ocurrió un error eliminando el tipo de mascota");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Lista de Tipos de Mascotas">
        <p>Cargando tipos...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Lista de Tipos de Mascotas">
      <div className="usuarios-container">
        {tipos.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay tipos registrados aún.
          </p>
        )}

        {tipos.map((t) => (
          <div key={t.id} className="usuario-card">
            {t.icono && (
              <img
                src={t.icono}
                alt={t.nombre}
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
            <h3>{t.nombre}</h3>
            <h4>{t.descripcion}</h4>
            <div className="card-actions">
              <IonButton
                size="small"
                onClick={() => history.push(`/types/${t.id}/edit`)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => abrirConfirmacion(t)}
              >
                Eliminar
              </IonButton>
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

      <div className="boton-lista" onClick={() => history.push("/pets")}>
        Volver a Mascotas
      </div>

      {/* Modal reutilizable */}
      <ConfirmDialog
        open={!!tipoAEliminar}
        title="Eliminar tipo de mascota"
        message={
          <>
            ¿Estás seguro de eliminar el tipo{" "}
            <strong>{tipoAEliminar?.nombre}</strong>?
          </>
        }
        confirmText="Sí, eliminar"
        cancelText="No"
        loading={deleting}
        onCancel={cerrarConfirmacion}
        onConfirm={confirmarEliminar}
      />
    </BaseLayout>
  );
};

export default Listar_tipo;

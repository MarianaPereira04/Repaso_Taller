// src/pages/mascotas/Lista_mascotas.tsx
import React, { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import { mascotaService, Mascota } from "../../services/mascotaService";
import ConfirmDialog from "../../components/confirmDialog";

const ListaMascotas: React.FC = () => {
  const history = useHistory();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);

  const [mascotaAEliminar, setMascotaAEliminar] = useState<Mascota | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await mascotaService.getAll();
        setMascotas(data);
      } catch (error) {
        console.error("Error cargando mascotas", error);
        alert("Ocurrió un error cargando las mascotas");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const abrirConfirmacion = (mascota: Mascota) => {
    setMascotaAEliminar(mascota);
  };

  const cerrarConfirmacion = () => {
    setMascotaAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!mascotaAEliminar?.id) return;

    try {
      setDeleting(true);
      await mascotaService.remove(mascotaAEliminar.id);
      setMascotas((prev) => prev.filter((m) => m.id !== mascotaAEliminar.id));
      cerrarConfirmacion();
    } catch (error) {
      console.error("Error eliminando mascota", error);
      alert("Ocurrió un error eliminando la mascota");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Lista de Mascotas">
        <p>Cargando mascotas...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Lista de Mascotas">
      <div className="usuarios-container">
        {mascotas.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay mascotas registradas.
          </p>
        )}

        {mascotas.map((m) => (
          <div key={m.id} className="usuario-card">
            <h3>{m.nombre}</h3>
            <p>
              <strong>Tipo / Especie:</strong>{" "}
              {m.tipoMascota?.nombre ?? m.tipoMascotaId}
            </p>
            <p>
              <strong>Propietario:</strong> {m.propietario}
            </p>
            <div className="card-actions">
              <IonButton
                size="small"
                onClick={() => history.push(`/pets/${m.id}/edit`)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                onClick={() => history.push(`/pets/${m.id}`)}
              >
                Detalle
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => abrirConfirmacion(m)}
              >
                Eliminar
              </IonButton>
            </div>
          </div>
        ))}
      </div>

      <div className="boton-lista" onClick={() => history.push("/pets/create")}>
        Registrar nueva mascota
      </div>

      <div className="boton-lista" onClick={() => history.push("/types")}>
        Gestionar tipos de mascotas
      </div>

      <div className="boton-lista" onClick={() => history.push("/users")}>
        Volver a usuarios
      </div>

      {/* Modal reutilizable */}
      <ConfirmDialog
        open={!!mascotaAEliminar}
        title="Eliminar mascota"
        message={
          <>
            ¿Estás seguro de eliminar a{" "}
            <strong>{mascotaAEliminar?.nombre}</strong>?
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

export default ListaMascotas;

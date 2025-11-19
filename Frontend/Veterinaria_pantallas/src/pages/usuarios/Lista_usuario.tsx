import React, { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import { usuarioService, Usuario } from "../../services/usuarioService";
import ConfirmDialog from "../../components/confirmDialog";

const ListaUsuario: React.FC = () => {
  const history = useHistory();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await usuarioService.getAll();
        setUsuarios(data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
        alert("Ocurrió un error cargando los usuarios");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const abrirConfirmacion = (usuario: Usuario) => {
    setUsuarioAEliminar(usuario);
  };

  const cerrarConfirmacion = () => {
    setUsuarioAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!usuarioAEliminar?.id) return;

    try {
      setDeleting(true);
      await usuarioService.remove(usuarioAEliminar.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuarioAEliminar.id));
      cerrarConfirmacion();
    } catch (error) {
      console.error("Error eliminando usuario", error);
      alert("Ocurrió un error eliminando el usuario");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Lista de Usuarios">
        <p>Cargando usuarios...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Lista de Usuarios">
      <div className="usuarios-container">

        {/* 🔹 Mensaje cuando no hay usuarios */}
        {usuarios.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay usuarios registrados.
          </p>
        )}

        {usuarios.map((u) => (
          <div key={u.id} className="usuario-card">
            <h3>{u.nombre}</h3>
            <p>{u.correo}</p>
            <p>
              <strong>Rol:</strong> {u.rol}
            </p>
            <div className="card-actions">
              <IonButton
                size="small"
                onClick={() => history.push(`/users/${u.id}/edit`)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="secondary"
                onClick={() => history.push(`/users/${u.id}`)}
              >
                Detalle
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => abrirConfirmacion(u)}
              >
                Eliminar
              </IonButton>
            </div>
          </div>
        ))}
      </div>

      <div className="boton-lista" onClick={() => history.push("/users/create")}>
        Crear nuevo usuario
      </div>

      <div className="boton-lista" onClick={() => history.push("/pets")}>
        Ver mascotas
      </div>

      <div className="boton-lista" onClick={() => history.push("/products")}>
        Ver productos
      </div>

      {/* Modal reutilizable */}
      <ConfirmDialog
        open={!!usuarioAEliminar}
        title="Eliminar usuario"
        message={
          <>
            ¿Estás seguro de eliminar a{" "}
            <strong>{usuarioAEliminar?.nombre}</strong>?
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

export default ListaUsuario;

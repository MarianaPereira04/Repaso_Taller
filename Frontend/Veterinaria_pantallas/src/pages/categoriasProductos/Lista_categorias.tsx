// src/pages/categoriasProductos/Lista_categorias.tsx
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import { IonButton } from "@ionic/react";
import {
  categoriaProductoService,
  CategoriaProducto,
} from "../../services/categoriaProductoService";
import ConfirmDialog from "../../components/confirmDialog";

const Listar_categoria: React.FC = () => {
  const history = useHistory();
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoriaAEliminar, setCategoriaAEliminar] =
    useState<CategoriaProducto | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await categoriaProductoService.getAll();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías de producto", error);
        alert("Ocurrió un error cargando las categorías");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const abrirConfirmacion = (categoria: CategoriaProducto) => {
    setCategoriaAEliminar(categoria);
  };

  const cerrarConfirmacion = () => {
    setCategoriaAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!categoriaAEliminar?.id) return;

    try {
      setDeleting(true);
      await categoriaProductoService.remove(categoriaAEliminar.id);
      setCategorias((prev) =>
        prev.filter((c) => c.id !== categoriaAEliminar.id)
      );
      cerrarConfirmacion();
    } catch (error) {
      console.error("Error eliminando categoría", error);
      alert("Ocurrió un error eliminando la categoría");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Lista de Categorías">
        <p>Cargando categorías...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Lista de Categorías">
      <div className="usuarios-container">
        {categorias.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay categorías registradas.
          </p>
        )}

        {categorias.map((c) => (
          <div key={c.id} className="usuario-card">
            {c.icono && (
              <img
                src={c.icono}
                alt={c.nombre}
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            )}
            <h3>{c.nombre}</h3>
            <h4>{c.descripcion}</h4>
            <div className="card-actions">
              <IonButton
                size="small"
                onClick={() => history.push(`/categories/${c.id}/edit`)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => abrirConfirmacion(c)}
              >
                Eliminar
              </IonButton>
            </div>
          </div>
        ))}
      </div>

      <div
        className="boton-lista"
        onClick={() => history.push("/categories/create")}
      >
        Crear nueva categoría
      </div>

      <div className="boton-lista" onClick={() => history.push("/products")}>
        Volver a Productos
      </div>

      {/* Modal reutilizable */}
      <ConfirmDialog
        open={!!categoriaAEliminar}
        title="Eliminar categoría"
        message={
          <>
            ¿Estás seguro de eliminar la categoría{" "}
            <strong>{categoriaAEliminar?.nombre}</strong>?
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

export default Listar_categoria;

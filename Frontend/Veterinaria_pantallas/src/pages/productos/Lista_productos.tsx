// src/pages/productos/ListaProductos.tsx
import React, { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import {
  productoService,
  Producto,
} from "../../services/productoService";
import ConfirmDialog from "../../components/confirmDialog";

const ListaProductos: React.FC = () => {
  const history = useHistory();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productoService.getAll();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos", error);
        alert("Ocurrió un error cargando los productos");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const abrirConfirmacion = (producto: Producto) => {
    setProductoAEliminar(producto);
  };

  const cerrarConfirmacion = () => {
    setProductoAEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar?.id) return;

    try {
      setDeleting(true);
      await productoService.remove(productoAEliminar.id);
      setProductos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
      cerrarConfirmacion();
    } catch (error) {
      console.error("Error eliminando producto", error);
      alert("Ocurrió un error eliminando el producto");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Lista de Productos">
        <p>Cargando productos...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Lista de Productos">
      <div className="productos-container">
        {productos.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay productos registrados.
          </p>
        )}

        {productos.map((p) => (
          <div key={p.id} className="producto-card">
            <div className="producto-imagen">
              <img
                src={p.imagen || "/assets/producto.png"}
                alt={p.nombre}
              />
            </div>
            <h3>{p.nombre}</h3>
            <p>
              <strong>Precio:</strong> ${p.precio}
            </p>
            {p.categoria && (
              <p>
                <strong>Categoría:</strong> {p.categoria.nombre}
              </p>
            )}
            <div className="card-actions">
              <IonButton
                size="small"
                onClick={() => history.push(`/products/${p.id}/edit`)}
              >
                Editar
              </IonButton>
              <IonButton
                size="small"
                color="secondary"
                onClick={() => history.push(`/products/${p.id}/detail`)}
              >
                Detalle
              </IonButton>
              <IonButton
                size="small"
                color="danger"
                onClick={() => abrirConfirmacion(p)}
              >
                Eliminar
              </IonButton>
            </div>
          </div>
        ))}
      </div>

      <div
        className="boton-lista"
        onClick={() => history.push("/products/create")}
      >
        Crear nuevo producto
      </div>

      <div
        className="boton-lista"
        onClick={() => history.push("/categories")}
      >
        Gestionar categorías
      </div>

      <div
        className="boton-lista"
        onClick={() => history.push("/users")}
      >
        Volver a Usuarios
      </div>

      {/* Modal reutilizable */}
      <ConfirmDialog
        open={!!productoAEliminar}
        title="Eliminar producto"
        message={
          <>
            ¿Estás seguro de eliminar el producto{" "}
            <strong>{productoAEliminar?.nombre}</strong>?
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

export default ListaProductos;

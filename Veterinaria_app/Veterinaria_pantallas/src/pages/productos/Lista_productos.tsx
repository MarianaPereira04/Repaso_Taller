// src/pages/productos/ListaProductos.tsx
import React from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css"; // reutilizamos estilos

interface Producto {
  id: number;
  nombre: string;
  precio: string;
  imagen: string;
}

const ListaProductos: React.FC = () => {
  const history = useHistory();

  const productos: Producto[] = [
    { id: 1, nombre: "Alimento para perro", precio: "$50.000", imagen: "/assets/alimento.png" },
    { id: 2, nombre: "Collar de gato", precio: "$25.000", imagen: "/assets/collar.png" },
  ];

  return (
    <BaseLayout title="Lista de Productos">
      <div className="productos-container">
        {productos.map((p) => (
          <div key={p.id} className="producto-card">
            <div className="producto-imagen">
              <img src="/assets/producto.png" alt="Alimento para perro" />
            </div>
            <h3>{p.nombre}</h3>
            <p><strong>Precio:</strong> {p.precio}</p>
            <div className="card-actions">
              <IonButton size="small" onClick={() => history.push(`/products/edit`)}>Editar</IonButton>
              <IonButton size="small" color="secondary" onClick={() => history.push(`/products/detail`)}>Detalle</IonButton>
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

      <div className="boton-lista" onClick={() => history.push("/categories")}>
        Gestionar categorías
      </div>


      <div
        className="boton-lista"
        onClick={() => history.push("/users")}
      >
        Volver a Usuarios
      </div>
    </BaseLayout>
  );
};

export default ListaProductos;

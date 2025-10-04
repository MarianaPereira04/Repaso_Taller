// src/pages/productos/DetalleProducto.tsx
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/detalle.css";

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  stock: string;
  imagen: string;
}

const DetalleProducto: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ producto: Producto }>();

  const producto = location.state?.producto || {
    nombre: "Producto ejemplo",
    descripcion: "Descripción del producto",
    categoria: "Alimento",
    stock: "20",
    imagen: "/assets/producto.png",
  };

  return (
    <BaseLayout title="Detalle Producto">
      <div className="usuario-detalle" style={{ gap: "50px" }}>
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <div className="detalle-item">
            <strong>Nombre:</strong> <span>{producto.nombre}</span>
          </div>
          <div className="detalle-item">
            <strong>Descripción:</strong> <span>{producto.descripcion}</span>
          </div>
          <div className="detalle-item">
            <strong>Categoría:</strong> <span>{producto.categoria}</span>
          </div>
          <div className="detalle-item">
            <strong>Stock:</strong> <span>{producto.stock}</span>
          </div>
        </div>

        <div
          className="boton-crear-usuario"
          onClick={() => history.push("/products")}
        >
          Volver a la lista
        </div>
      </div>
    </BaseLayout>
  );
};

export default DetalleProducto;

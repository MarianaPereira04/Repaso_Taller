// src/pages/productos/DetalleProducto.tsx
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/detalle.css";
import {
  productoService,
  Producto,
} from "../../services/productoService";

interface RouteParams {
  id: string;
}

const DetalleProducto: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await productoService.getById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto", error);
        alert("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading || !producto) {
    return (
      <BaseLayout title="Detalle Producto">
        <p>Cargando producto...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Detalle Producto">
      <div className="usuario-detalle" style={{ gap: "50px" }}>
        <div className="detalle-imagen">
          <img src={producto.imagen || "/assets/producto.png"} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <div className="detalle-item">
            <strong>Nombre:</strong> <span>{producto.nombre}</span>
          </div>
          <div className="detalle-item">
            <strong>Precio:</strong> <span>${producto.precio}</span>
          </div>
          {producto.categoria && (
            <div className="detalle-item">
              <strong>Categoría:</strong> <span>{producto.categoria.nombre}</span>
            </div>
          )}
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

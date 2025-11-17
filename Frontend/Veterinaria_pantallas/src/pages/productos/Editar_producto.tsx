// src/pages/productos/EditarProducto.tsx
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

export interface Producto {
  id?: number;
  nombre: string;
  categoria: string;
  precio: string;
  stock: string;
  imagen: string;
}

const EditarProducto: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ producto: Producto }>();

  const [form, setForm] = useState<Producto>({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  useEffect(() => {
    if (location.state?.producto) {
      setForm(location.state.producto);
    }
  }, [location.state]);

  const handleChange = (field: keyof Producto, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Producto actualizado:", form);
    history.push("/products");
  };

  return (
    <BaseLayout title="Editar Producto">
      <form className="usuario-form" style={{ gap: "40px" }}>

        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre</label>
          <input
            className="campo-input"
            type="text"
            value={form.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div className="campo">
          <label className="campo-label">Categoría</label>
          <input
            className="campo-input"
            type="text"
            value={form.categoria}
            onChange={(e) => handleChange("categoria", e.target.value)}
          />
        </div>

        {/* Precio */}
        <div className="campo">
          <label className="campo-label">Precio</label>
          <input
            className="campo-input"
            type="number"
            value={form.precio}
            onChange={(e) => handleChange("precio", e.target.value)}
          />
        </div>

        {/* Stock */}
        <div className="campo">
          <label className="campo-label">Stock</label>
          <input
            className="campo-input"
            type="number"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
          />
        </div>

        {/* Imagen */}
        <div className="campo">
          <label className="campo-label">Imagen (URL o ruta)</label>
          <input
            className="campo-input"
            type="text"
            value={form.imagen}
            onChange={(e) => handleChange("imagen", e.target.value)}
          />
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>

      </form>
    </BaseLayout>
  );
};

export default EditarProducto;

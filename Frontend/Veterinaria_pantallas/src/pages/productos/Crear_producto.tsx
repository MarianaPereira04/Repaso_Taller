// src/pages/productos/CrearProducto.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const CrearProducto: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<Producto>({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const handleChange = (field: keyof Producto, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Producto creado:", form);
    history.push("/products");
  };

  return (
    <BaseLayout title="Crear Producto">
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
          Crear Producto
        </button>
      </form>
    </BaseLayout>
  );
};

export default CrearProducto;

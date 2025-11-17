// src/pages/categoriasProductos/Crear_categoria.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

interface Categoria {
  nombre: string;
  descripcion: string;
  icono: string;
}

const Crear_categoria: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState<Categoria>({
    nombre: "",
    descripcion: "",
    icono: ""
  });

  const handleChange = (field: keyof Categoria, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Categoría creada:", form);
    history.push("/categories");
  };

  return (
    <BaseLayout title="Crear Categoría">
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

        {/* Descripción */}
        <div className="campo">
          <label className="campo-label">Descripción</label>
          <input
            className="campo-input"
            type="text"
            value={form.descripcion}
            onChange={(e) => handleChange("descripcion", e.target.value)}
          />
        </div>

        {/* Icono */}
        <div className="campo">
          <label className="campo-label">URL del ícono</label>
          <input
            className="campo-input"
            type="text"
            value={form.icono}
            onChange={(e) => handleChange("icono", e.target.value)}
          />
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Crear Categoría
        </button>
      </form>
    </BaseLayout>
  );
};

export default Crear_categoria;

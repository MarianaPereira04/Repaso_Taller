// src/pages/categoriasProductos/Crear_categoria.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  categoriaProductoService,
  CreateCategoriaProductoDto,
} from "../../services/categoriaProductoService";

const Crear_categoria: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState<CreateCategoriaProductoDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const handleChange = (field: keyof CreateCategoriaProductoDto, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await categoriaProductoService.create(form);
      // opcional: alert("Categoría creada correctamente");
      history.push("/categories");
    } catch (error) {
      console.error("Error creando categoría de producto", error);
      alert("Ocurrió un error creando la categoría");
    }
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

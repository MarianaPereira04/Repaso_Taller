// src/pages/categoriasProductos/Crear_categoria.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  categoriaProductoService,
  CreateCategoriaProductoDto,
} from "../../services/categoriaProductoService";

type CategoriaErrors = Partial<Record<keyof CreateCategoriaProductoDto, string>>;

const Crear_categoria: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<CreateCategoriaProductoDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const [errors, setErrors] = useState<CategoriaErrors>({});

  const handleChange = (field: keyof CreateCategoriaProductoDto, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // VALIDACIONES
  const validate = (): boolean => {
    const newErrors: CategoriaErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.descripcion.trim())
      newErrors.descripcion = "La descripción es obligatoria";

    if (!form.icono.trim()) {
      newErrors.icono = "La URL del icono es obligatoria";
    } else if (!/^https?:\/\/.+/i.test(form.icono)) {
      newErrors.icono = "Ingresa una URL válida (http o https)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await categoriaProductoService.create(form);
      history.push("/categories");
    } catch (error) {
      console.error("Error creando categoría", error);
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
          {errors.nombre && <span className="campo-error">{errors.nombre}</span>}
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
          {errors.descripcion && (
            <span className="campo-error">{errors.descripcion}</span>
          )}
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
          {errors.icono && <span className="campo-error">{errors.icono}</span>}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Crear Categoría
        </button>
      </form>
    </BaseLayout>
  );
};

export default Crear_categoria;

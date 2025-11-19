// src/pages/categoriasProductos/Editar_categoria.tsx
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  categoriaProductoService,
  UpdateCategoriaProductoDto,
  CategoriaProducto,
} from "../../services/categoriaProductoService";

interface RouteParams {
  id: string;
}

type CategoriaErrors = Partial<Record<keyof UpdateCategoriaProductoDto, string>>;

const Editar_categoria: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<UpdateCategoriaProductoDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const [errors, setErrors] = useState<CategoriaErrors>({});
  const [loading, setLoading] = useState(true);

  // Cargar datos originales del backend
  useEffect(() => {
    const load = async () => {
      try {
        const data: CategoriaProducto = await categoriaProductoService.getById(id);
        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          icono: data.icono,
        });
      } catch (error) {
        console.error("Error cargando categoría", error);
        alert("No se pudo cargar la categoría");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (field: keyof UpdateCategoriaProductoDto, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // VALIDACIONES
  const validate = (): boolean => {
    const newErrors: CategoriaErrors = {};

    if (!form.nombre?.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.descripcion?.trim())
      newErrors.descripcion = "La descripción es obligatoria";

    if (!form.icono?.trim()) {
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
      await categoriaProductoService.update(id, form);
      history.push("/categories");
    } catch (error) {
      console.error("Error actualizando categoría", error);
      alert("No se pudo actualizar la categoría");
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Editar Categoría">
        <p>Cargando datos...</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout title="Editar Categoría">
      <form className="usuario-form" style={{ gap: "40px" }}>
        {/* Nombre */}
        <div className="campo">
          <label className="campo-label">Nombre</label>
          <input
            className="campo-input"
            type="text"
            value={form.nombre ?? ""}
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
            value={form.descripcion ?? ""}
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
            value={form.icono ?? ""}
            onChange={(e) => handleChange("icono", e.target.value)}
          />
          {errors.icono && <span className="campo-error">{errors.icono}</span>}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default Editar_categoria;

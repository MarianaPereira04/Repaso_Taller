// src/pages/categoriasProductos/Editar_categoria.tsx
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  categoriaProductoService,
  CategoriaProducto,
  UpdateCategoriaProductoDto,
} from "../../services/categoriaProductoService";

interface RouteParams {
  id: string;
}

const Editar_categoria: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<UpdateCategoriaProductoDto>({
    nombre: "",
    descripcion: "",
    icono: "",
  });
  const [loading, setLoading] = useState(true);

  // Cargar datos originales
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
  };

  const handleSubmit = async () => {
    try {
      await categoriaProductoService.update(id, form);
      // opcional: alert("Categoría actualizada");
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
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default Editar_categoria;

// src/pages/productos/CrearProducto.tsx
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  productoService,
  CreateProductoDto,
} from "../../services/productoService";
import {
  categoriaProductoService,
  CategoriaProducto,
} from "../../services/categoriaProductoService";

interface ProductoForm {
  nombre: string;
  categoriaId: string;
  precio: string;
  stock: string;
  imagen: string;
}

const CrearProducto: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<ProductoForm>({
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await categoriaProductoService.getAll();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías", error);
        alert("No se pudieron cargar las categorías");
      } finally {
        setLoadingCategorias(false);
      }
    };

    loadCategorias();
  }, []);

  const handleChange = (field: keyof ProductoForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!form.categoriaId) {
      alert("Selecciona una categoría");
      return;
    }

    const dto: CreateProductoDto = {
      nombre: form.nombre,
      imagen: form.imagen,
      categoriaId: form.categoriaId,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    if (isNaN(dto.precio) || isNaN(dto.stock)) {
      alert("Precio y stock deben ser numéricos");
      return;
    }

    try {
      await productoService.create(dto);
      history.push("/products");
    } catch (error) {
      console.error("Error creando producto", error);
      alert("Ocurrió un error creando el producto");
    }
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

        {/* Categoría (select) */}
        <div className="campo">
          <label className="campo-label">Categoría</label>
          {loadingCategorias ? (
            <p>Cargando categorías...</p>
          ) : (
            <select
              className="campo-input"
              value={form.categoriaId}
              onChange={(e) => handleChange("categoriaId", e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          )}
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
          <label className="campo-label">Imagen (URL)</label>
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

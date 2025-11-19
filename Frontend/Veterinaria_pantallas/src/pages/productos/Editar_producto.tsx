// src/pages/productos/EditarProducto.tsx
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  productoService,
  Producto,
  UpdateProductoDto,
} from "../../services/productoService";
import {
  categoriaProductoService,
  CategoriaProducto,
} from "../../services/categoriaProductoService";

interface RouteParams {
  id: string;
}

interface ProductoForm {
  nombre: string;
  categoriaId: string;
  precio: string;
  stock: string;
  imagen: string;
}

const EditarProducto: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [form, setForm] = useState<ProductoForm>({
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const [categorias, setCategorias] = useState<CategoriaProducto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [producto, categoriasData] = await Promise.all([
          productoService.getById(id),
          categoriaProductoService.getAll(),
        ]);

        setForm({
          nombre: producto.nombre,
          categoriaId: producto.categoriaId,
          precio: String(producto.precio),
          stock: String(producto.stock),
          imagen: producto.imagen,
        });

        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error cargando datos de producto", error);
        alert("No se pudieron cargar los datos del producto");
      } finally {
        setLoading(false);
        setLoadingCategorias(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (field: keyof ProductoForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const dto: UpdateProductoDto = {
      nombre: form.nombre,
      imagen: form.imagen,
      categoriaId: form.categoriaId,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

    if (!form.categoriaId) {
      alert("Selecciona una categoría");
      return;
    }

    if (isNaN(dto.precio!) || isNaN(dto.stock!)) {
      alert("Precio y stock deben ser numéricos");
      return;
    }

    try {
      await productoService.update(id, dto);
      history.push("/products");
    } catch (error) {
      console.error("Error actualizando producto", error);
      alert("Ocurrió un error actualizando el producto");
    }
  };

  if (loading) {
    return (
      <BaseLayout title="Editar Producto">
        <p>Cargando datos...</p>
      </BaseLayout>
    );
  }

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
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default EditarProducto;

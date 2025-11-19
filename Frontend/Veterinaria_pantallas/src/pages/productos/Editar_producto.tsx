// src/pages/productos/EditarProducto.tsx
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";
import {
  productoService,
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

type ProductoErrors = Partial<Record<keyof ProductoForm, string>>;

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

  const [errors, setErrors] = useState<ProductoErrors>({});
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
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: ProductoErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!form.categoriaId) newErrors.categoriaId = "Selecciona una categoría";

    if (!form.precio.trim()) {
      newErrors.precio = "El precio es obligatorio";
    } else if (isNaN(Number(form.precio))) {
      newErrors.precio = "Debe ser un número";
    } else if (Number(form.precio) <= 0) {
      newErrors.precio = "Debe ser mayor que 0";
    }

    if (!form.stock.trim()) {
      newErrors.stock = "El stock es obligatorio";
    } else if (isNaN(Number(form.stock))) {
      newErrors.stock = "Debe ser un número";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "No puede ser negativo";
    }

    if (!form.imagen.trim()) {
      newErrors.imagen = "La URL de la imagen es obligatoria";
    } else if (!/^https?:\/\/.+/i.test(form.imagen)) {
      newErrors.imagen = "Debe ser una URL válida (http o https)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const dto: UpdateProductoDto = {
      nombre: form.nombre,
      categoriaId: form.categoriaId,
      imagen: form.imagen,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

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
          {errors.nombre && <span className="campo-error">{errors.nombre}</span>}
        </div>

        {/* Categoría */}
        <div className="campo">
          <label className="campo-label">Categoría</label>
          {loadingCategorias ? (
            <p>Cargando categorías...</p>
          ) : (
            <>
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
              {errors.categoriaId && (
                <span className="campo-error">{errors.categoriaId}</span>
              )}
            </>
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
          {errors.precio && <span className="campo-error">{errors.precio}</span>}
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
          {errors.stock && <span className="campo-error">{errors.stock}</span>}
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
          {errors.imagen && <span className="campo-error">{errors.imagen}</span>}
        </div>

        <button type="button" className="boton" onClick={handleSubmit}>
          Guardar cambios
        </button>
      </form>
    </BaseLayout>
  );
};

export default EditarProducto;

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

type ProductoErrors = Partial<Record<keyof ProductoForm, string>>;

const CrearProducto: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<ProductoForm>({
    nombre: "",
    categoriaId: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const [errors, setErrors] = useState<ProductoErrors>({});
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
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: ProductoErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";

    if (!form.categoriaId)
      newErrors.categoriaId = "Selecciona una categoría";

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

    const dto: CreateProductoDto = {
      nombre: form.nombre,
      categoriaId: form.categoriaId,
      imagen: form.imagen,
      precio: Number(form.precio),
      stock: Number(form.stock),
    };

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
          Crear Producto
        </button>
      </form>
    </BaseLayout>
  );
};

export default CrearProducto;

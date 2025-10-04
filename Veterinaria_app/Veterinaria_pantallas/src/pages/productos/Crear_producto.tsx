// src/pages/productos/CrearProducto.tsx
import React, { useState } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
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
    // Aquí se podría enviar a la API
    history.push("/products"); // Redirige a la lista de productos
  };

  return (
    <BaseLayout title="Crear Producto">
      <form className="usuario-form" style={{ gap: "60px" }}>
        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Nombre
          </IonLabel>
          <IonInput
            value={form.nombre}
            onIonChange={(e) => handleChange("nombre", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Categoría
          </IonLabel>
          <IonInput
            value={form.categoria}
            onIonChange={(e) => handleChange("categoria", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Precio
          </IonLabel>
          <IonInput
            type="text"
            value={form.precio}
            onIonChange={(e) => handleChange("precio", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Stock
          </IonLabel>
          <IonInput
            type="text"
            value={form.stock}
            onIonChange={(e) => handleChange("stock", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Imagen (ruta)
          </IonLabel>
          <IonInput
            type="text"
            value={form.imagen}
            onIonChange={(e) => handleChange("imagen", e.detail.value!)}
          />
        </IonItem>

        <div className="boton" onClick={handleSubmit}>
          Crear Producto
        </div>
      </form>
    </BaseLayout>
  );
};

export default CrearProducto;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

interface Categoria {
  nombre: string;
  descripcion: string;
  icono: string;
}

const Crear_categoria: React.FC = () => {
  const history = useHistory();
  const [form, setForm] = useState<Categoria>({ nombre: "", descripcion: "", icono: "" });

  const handleChange = (field: keyof Categoria, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Categoría creada:", form);
    history.push("/categories");
  };

  return (
    <BaseLayout title="Crear Categoría">
      <form className="usuario-form" style={{ gap: "100px" }}>
        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Nombre</IonLabel>
          <IonInput value={form.nombre} onIonChange={(e) => handleChange("nombre", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Descripción</IonLabel>
          <IonInput value={form.descripcion} onIonChange={(e) => handleChange("descripcion", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">URL del ícono</IonLabel>
          <IonInput value={form.icono} onIonChange={(e) => handleChange("icono", e.detail.value!)} />
        </IonItem>

        <div className="boton" onClick={handleSubmit}>Crear Categoría</div>
      </form>
    </BaseLayout>
  );
};

export default Crear_categoria;

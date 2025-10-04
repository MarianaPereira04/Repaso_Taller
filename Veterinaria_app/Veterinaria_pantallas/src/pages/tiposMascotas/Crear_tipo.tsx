// src/tiposMascotas/Crear_tipo.tsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

interface TipoMascota {
  nombre: string;
  descripcion: string;
  icono: string;
}

const Crear_tipo: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<TipoMascota>({ nombre: "", descripcion: "", icono: "" });

  const handleChange = (field: keyof TipoMascota, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Tipo registrado:", form);
    history.push("/types");
  };

  return (
    <BaseLayout title="Crear Tipo de Mascota">
      <form className="usuario-form" style={{ gap: "100px" }}>
        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Nombre del tipo
          </IonLabel>
          <IonInput
            value={form.nombre}
            onIonChange={(e) => handleChange("nombre", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Descripción
          </IonLabel>
          <IonInput
            value={form.descripcion}
            onIonChange={(e) => handleChange("descripcion", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            URL del icono
          </IonLabel>
          <IonInput
            value={form.icono}
            onIonChange={(e) => handleChange("icono", e.detail.value!)}
          />
        </IonItem>

        <div className="boton" onClick={handleSubmit}>
          Crear Tipo
        </div>
      </form>
    </BaseLayout>
  );
};

export default Crear_tipo;

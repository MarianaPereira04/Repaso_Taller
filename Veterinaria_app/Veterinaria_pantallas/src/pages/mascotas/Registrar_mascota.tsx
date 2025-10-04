// src/pages/mascotas/RegistrarMascota.tsx
import React, { useState } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css"; // reutilizamos estilos

export interface Mascota {
  id?: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  sexo: string;
  propietario: string;
  estado_salud: string;
}

const RegistrarMascota: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<Mascota>({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    propietario: "",
    estado_salud: ""
  });

  const handleChange = (field: keyof Mascota, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Mascota registrada:", form);
    history.push("/pets"); // redirige a la lista de mascotas
  };

  return (
    <BaseLayout title="Registrar Mascota">
      <form className="usuario-form" 
      style={{ gap: "30px" }}>
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
            Especie
          </IonLabel>
          <IonInput
            value={form.especie}
            onIonChange={(e) => handleChange("especie", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Raza
          </IonLabel>
          <IonInput
            value={form.raza}
            onIonChange={(e) => handleChange("raza", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Edad
          </IonLabel>
          <IonInput
            value={form.edad}
            onIonChange={(e) => handleChange("edad", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Sexo
          </IonLabel>
          <IonInput
            value={form.sexo}
            onIonChange={(e) => handleChange("sexo", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Propietario
          </IonLabel>
          <IonInput
            value={form.propietario}
            onIonChange={(e) => handleChange("propietario", e.detail.value!)}
          />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">
            Estado de salud
          </IonLabel>
          <IonInput
            value={form.estado_salud}
            onIonChange={(e) => handleChange("estado_salud", e.detail.value!)}
          />
        </IonItem>

        <div className="boton" onClick={handleSubmit}>
          Registrar Mascota
        </div>
      </form>
    </BaseLayout>
  );
};

export default RegistrarMascota;

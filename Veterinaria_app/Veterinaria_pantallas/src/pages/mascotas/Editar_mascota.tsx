// src/pages/mascotas/EditarMascota.tsx
import React, { useState } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css";

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

const EditarMascota: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<Mascota>({
    nombre: "Firulais",
    especie: "Perro",
    raza: "Labrador",
    edad: "3",
    sexo: "Macho",
    propietario: "Juan Pérez",
    estado_salud: "Sano",
  });

  const handleChange = (field: keyof Mascota, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Mascota editada:", form);
    history.push("/pets"); // vuelve a la lista
  };

  return (
    <BaseLayout title="Editar Mascota">
      <form className="usuario-form" style={{ gap: "30px" }}>
        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Nombre</IonLabel>
          <IonInput value={form.nombre} onIonChange={e => handleChange("nombre", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Especie</IonLabel>
          <IonInput value={form.especie} onIonChange={e => handleChange("especie", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Raza</IonLabel>
          <IonInput value={form.raza} onIonChange={e => handleChange("raza", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Edad</IonLabel>
          <IonInput value={form.edad} onIonChange={e => handleChange("edad", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Sexo</IonLabel>
          <IonInput value={form.sexo} onIonChange={e => handleChange("sexo", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Propietario</IonLabel>
          <IonInput value={form.propietario} onIonChange={e => handleChange("propietario", e.detail.value!)} />
        </IonItem>

        <IonItem className="usuario-item">
          <IonLabel position="stacked" className="label-centrado">Estado de salud</IonLabel>
          <IonInput value={form.estado_salud} onIonChange={e => handleChange("estado_salud", e.detail.value!)} />
        </IonItem>

        <div className="boton" onClick={handleSubmit}>
          Guardar cambios
        </div>
      </form>
    </BaseLayout>
  );
};

export default EditarMascota;

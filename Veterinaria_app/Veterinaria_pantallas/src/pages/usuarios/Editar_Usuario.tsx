// src/pages/users/EditarUsuario.tsx
import React, { useState } from "react";
import { IonInput, IonItem, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../../theme/genericos/create.css"; // reutilizamos los estilos
import BaseLayout from "../../layout/BaseLayout";

export interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
    estado: string;
}

const EditarUsuario: React.FC = () => {
    const history = useHistory();

    // Datos estáticos por ahora
    const [form, setForm] = useState<Usuario>({
        nombre: "Juan Pérez",
        correo: "juan@mail.com",
        telefono: "3123456789",
        rol: "Administrador",
        estado: "Activo",
    });

    const handleChange = (field: keyof Usuario, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        console.log("Usuario editado:", form);
        // aquí luego se puede guardar cambios en API
        history.push("/users");
    };

    return (
        <BaseLayout title="Editar Usuario">
            <form className="usuario-form">
                <IonItem className="usuario-item">
                    <IonLabel position="stacked" className="label-centrado">
                        Nombre completo
                    </IonLabel>
                    <IonInput
                        value={form.nombre}
                        onIonChange={(e) => handleChange("nombre", e.detail.value!)}
                    />
                </IonItem>

                <IonItem className="usuario-item">
                    <IonLabel position="stacked" className="label-centrado">
                        Correo electrónico
                    </IonLabel>
                    <IonInput
                        type="email"
                        value={form.correo}
                        onIonChange={(e) => handleChange("correo", e.detail.value!)}
                    />
                </IonItem>

                <IonItem className="usuario-item">
                    <IonLabel position="stacked" className="label-centrado">
                        Teléfono
                    </IonLabel>
                    <IonInput
                        type="tel"
                        value={form.telefono}
                        onIonChange={(e) => handleChange("telefono", e.detail.value!)}
                    />
                </IonItem>

                <IonItem className="usuario-item">
                    <IonLabel position="stacked" className="label-centrado">
                        Rol
                    </IonLabel>
                    <IonInput
                        value={form.rol}
                        onIonChange={(e) => handleChange("rol", e.detail.value!)}
                    />
                </IonItem>

                <IonItem className="usuario-item">
                    <IonLabel className="label-centrado" position="stacked">
                        Estado
                    </IonLabel>
                    <IonInput
                        value={form.estado}
                        onIonChange={(e) => handleChange("estado", e.detail.value!)}
                    />
                </IonItem>

                <div className="boton" onClick={handleSubmit}>
                    Guardar cambios
                </div>
            </form>
        </BaseLayout>
    );
};

export default EditarUsuario;

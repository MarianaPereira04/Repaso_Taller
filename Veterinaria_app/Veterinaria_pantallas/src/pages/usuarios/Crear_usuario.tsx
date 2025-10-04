import React, { useState } from "react";
import { IonInput, IonItem, IonLabel, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../../theme/genericos/create.css"; // estilos propios
import BaseLayout from "../../layout/BaseLayout";

// Modelo de usuario
export interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
    estado: string;
}

const CreateUsuario: React.FC = () => {
    const history = useHistory();

    const [form, setForm] = useState<Usuario>({
        nombre: "",
        correo: "",
        telefono: "",
        rol: "",
        estado: "",
    });

    const handleChange = (field: keyof Usuario, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        console.log("Usuario creado:", form);
        // luego aquí puedes guardar en API o contexto
        history.push("/users"); // redirigir a la lista de usuarios
    };

    return (
        <BaseLayout title="Crear Usuario">
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
                    Registrar
                </div>
            </form>
        </BaseLayout>
    );
};

export default CreateUsuario;

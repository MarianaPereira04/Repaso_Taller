import React from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css"; // podemos reutilizar estilos

interface Mascota {
    id: number;
    nombre: string;
    especie: string;
    propietario: string;
}

const ListaMascotas: React.FC = () => {
    const history = useHistory();

    const mascotas: Mascota[] = [
        { id: 1, nombre: "Firulais", especie: "Perro", propietario: "Juan Pérez" },
    ];

    return (
        <BaseLayout title="Lista de Mascotas">
            <div className="usuarios-container">
                {mascotas.map((m) => (
                    <div key={m.id} className="usuario-card">
                        <h3>{m.nombre}</h3>
                        <p><strong>Especie:</strong> {m.especie}</p>
                        <p><strong>Propietario:</strong> {m.propietario}</p>
                        <div className="card-actions">
                            <IonButton size="small" onClick={() => history.push("/pets/edit")}>Editar</IonButton>
                            <IonButton size="small" onClick={() => history.push("/pets/detail")}>Detalle</IonButton>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="boton-lista"
                onClick={() => history.push("/pets/create")}
            >
                Registrar nueva mascota
            </div>

            <div
                className="boton-lista"
                onClick={() => history.push("/types")}
            >
                Gestionar tipos de mascotas
            </div>

            <div
                className="boton-lista"
                onClick={() => history.push("/users")}
            >
                Volver a usuarios
            </div>

    
        </BaseLayout>
    );
};

export default ListaMascotas;

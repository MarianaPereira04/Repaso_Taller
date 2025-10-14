import React from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css"; // estilos nuevos para cards

interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    rol: string;
}

const ListaUsuario: React.FC = () => {
    const history = useHistory();

    const usuarios: Usuario[] = [
        { id: 1, nombre: "Juan Pérez", correo: "juan@mail.com", rol: "Admin" },
    ];

    return (
        <BaseLayout title="Lista de Usuarios">
            <div className="usuarios-container">
                {usuarios.map((u) => (
                    <div key={u.id} className="usuario-card">
                        <h3>{u.nombre}</h3>
                        <p>{u.correo}</p>
                        <p><strong>Rol:</strong> {u.rol}</p>
                        <div className="card-actions">
                            <IonButton size="small" onClick={() => history.push("/users/edit")}>Editar</IonButton>
                            <IonButton size="small" color="secondary" onClick={() => history.push("/users/detail")}>
                                Detalle
                            </IonButton>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="boton-lista"
                onClick={() => history.push("/users/create")}
            >
                Crear nuevo usuario
            </div>

            <div
                className="boton-lista"
                onClick={() => history.push("/pets")}
            >
                Ver mascotas
            </div>

            <div
                className="boton-lista"
                onClick={() => history.push("/products")}
            >
                Ver productos
            </div>
            
        </BaseLayout>
    );
};

export default ListaUsuario;

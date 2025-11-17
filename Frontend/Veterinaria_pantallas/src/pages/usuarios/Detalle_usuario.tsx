// src/pages/users/DetalleUsuario.tsx
import React from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/create.css"; // reutilizamos estilos para consistencia
import "../../theme/genericos/detalle.css";

export interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
    estado: string;
}

const DetalleUsuario: React.FC = () => {
    const history = useHistory();

    // Datos estáticos por ahora
    const usuario: Usuario = {
        nombre: "Juan Pérez",
        correo: "juan@mail.com",
        telefono: "3123456789",
        rol: "Administrador",
        estado: "Activo",
    };

    return (
        <BaseLayout title="Detalle Usuario">
            <div className="usuario-detalle">
                {/* Imagen de usuario arriba */}
                <div className="detalle-imagen">
                    <img
                        src="/assets/perfil.webp" // aquí la ruta de tu imagen
                        alt="Usuario"
                    />
                </div>

                {/* Información del usuario */}
                <div className="detalle-info">
                    <div className="detalle-item">
                        <strong>Nombre completo:</strong> <span>{usuario.nombre}</span>
                    </div>
                    <div className="detalle-item">
                        <strong>Correo electrónico:</strong> <span>{usuario.correo}</span>
                    </div>
                    <div className="detalle-item">
                        <strong>Teléfono:</strong> <span>{usuario.telefono}</span>
                    </div>
                    <div className="detalle-item">
                        <strong>Rol:</strong> <span>{usuario.rol}</span>
                    </div>
                    <div className="detalle-item">
                        <strong>Estado:</strong> <span>{usuario.estado}</span>
                    </div>
                </div>

                {/* Botón volver */}
                <div
                    className="boton-crear-usuario"
                    onClick={() => history.push("/users")}
                >
                    Volver a la lista
                </div>
            </div>
        </BaseLayout>

    );
};

export default DetalleUsuario;

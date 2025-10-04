// src/layout/BaseLayout.tsx
import React, { ReactNode } from "react";
import { IonPage, IonContent } from "@ionic/react";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, title }) => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Wrapper para centrar todo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#666666ff", // fondo gris
          }}
        >
          {/* Rectángulo tipo celular */}
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "90vh",
              background: "#dae5e9ff",
              borderRadius: "24px",
              boxShadow: "0 8px 20px rgba(26, 25, 25, 0.2)",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            {title && (
              <div
                style={{
                  backgroundColor: "#3d89b2ff",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "#fff",
                  fontWeight: 700,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  fontSize: "1.3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px", // espacio entre elementos
                }}
              >
                <img
                  src="/assets/pet.png" // ruta de la imagen izquierda
                  alt="icono izquierda"
                  style={{ width: "40px", height: "24px" }}
                />
                <span>{title}</span>
                <img
                  src="/assets/pet.png" // ruta de la imagen derecha
                  alt="icono derecha"
                  style={{ width: "40px", height: "24px" }}
                />
              </div>
            )}


            {/* Contenido dinámico */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BaseLayout;

import React from "react";
import { useHistory } from "react-router-dom";
import BaseLayout from "../../layout/BaseLayout";
import "../../theme/genericos/lista.css";
import { IonButton } from "@ionic/react";

interface Categoria {
  id: number;
  nombre: string;
  icono: string; // URL o path de la imagen
}

const Listar_categoria: React.FC = () => {
  const history = useHistory();

  const categorias: Categoria[] = [
    { id: 1, nombre: "Alimentos", icono: "/assets/categoria.png" },
    { id: 2, nombre: "Accesorios", icono: "/assets/categoria.png" },
  ];

  return (
    <BaseLayout title="Lista de Categorías">
      <div className="usuarios-container">
        {categorias.map((c) => (
          <div key={c.id} className="usuario-card">
            <img src={c.icono} alt={c.nombre} style={{ width: "80px", height: "80px", marginBottom: "10px" }} />
            <h3>{c.nombre}</h3>
            <div className="card-actions">
              <IonButton size="small" onClick={() => history.push("/categories/edit")}>
                Editar
              </IonButton>
            </div>
          </div>
        ))}
      </div>

      <div className="boton-lista" onClick={() => history.push("/categories/create")}>
        Crear nueva categoría
      </div>

      <div className="boton-lista" onClick={() => history.push("/products")}>
        Volver a Productos
      </div>
    </BaseLayout>
  );
};

export default Listar_categoria;

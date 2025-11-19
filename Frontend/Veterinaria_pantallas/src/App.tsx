import React from "react";
import { IonApp } from "@ionic/react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import CreateUsuario from "./pages/usuarios/Crear_usuario";
import ListaUsuario from "./pages/usuarios/Lista_usuario";
import EditarUsuario from "./pages/usuarios/Editar_Usuario";
import DetalleUsuario from "./pages/usuarios/Detalle_usuario";
import ListaMascotas from "./pages/mascotas/Lista_mascotas";
import RegistrarMascota from "./pages/mascotas/Registrar_mascota";
import EditarMascota from "./pages/mascotas/Editar_mascota";
import DetalleMascota from "./pages/mascotas/Detalle_mascota";
import ListaProductos from "./pages/productos/Lista_productos";
import CrearProducto from "./pages/productos/Crear_producto";
import EditarProducto from './pages/productos/Editar_producto';
import DetalleProducto from './pages/productos/Detalle_producto';
import Listar_tipo from "./pages/tiposMascotas/Lista_tipos";
import Crear_tipo from './pages/tiposMascotas/Crear_tipo';
import Editar_tipo from "./pages/tiposMascotas/Editar_tipo";
import Listar_categoria from "./pages/categoriasProductos/Lista_categorias";
import Crear_categoria from './pages/categoriasProductos/Crear_categoria';
import Editar_categoria from "./pages/categoriasProductos/Editar_categoria";

const App: React.FC = () => {
  return (
    <IonApp>
      <Router>
        <Switch>
          {/* Ruta raíz redirige a la lista */}
          <Route path="/" exact>
            <Redirect to="/users" />
          </Route>

          {/* Usuarios */}
          <Route path="/users" exact component={ListaUsuario} />
          <Route path="/users/create" exact component={CreateUsuario} />
          <Route path="/users/:id" exact component={DetalleUsuario} />
          <Route path="/users/:id/edit" exact component={EditarUsuario} />


          {/* Mascotas */}
          <Route path="/pets" exact component={ListaMascotas} />
          <Route path="/pets/create" exact component={RegistrarMascota} />
          <Route path="/pets/:id" exact component={DetalleMascota} />
          <Route path="/pets/:id/edit" exact component={EditarMascota} />


          {/* Productos */}
          <Route path="/products" exact component={ListaProductos} />
          <Route path="/products/create" exact component={CrearProducto} />
          <Route path="/products/:id/edit" exact component={EditarProducto} />
          <Route path="/products/:id/detail" exact component={DetalleProducto} />



          {/* Tipos mascotas */}
          <Route path="/types" exact component={Listar_tipo} />
          <Route path="/types/create" exact component={Crear_tipo} />
          <Route path="/types/:id/edit" exact component={Editar_tipo} />


          {/* Categorias Productos */}
          <Route path="/categories" exact component={Listar_categoria} />
          <Route path="/categories/create" exact component={Crear_categoria} />
          <Route path="/categories/:id/edit" exact component={Editar_categoria} />



        </Switch>
      </Router>
    </IonApp>
  );
};

export default App;

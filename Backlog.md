# 🐾 Backlog del Proyecto – App de Gestión de Veterinaria

## 📘 Descripción del Proyecto

La **App de Gestión de Veterinaria** permite a los administradores gestionar de forma centralizada los diferentes recursos de una clínica veterinaria, incluyendo **usuarios, mascotas, tipos de mascotas, productos y categorías de productos**.

La aplicación está diseñada para dispositivos móviles, con un enfoque en la **usabilidad y claridad visual**, evitando la sobrecarga de información. Se utilizan componentes reutilizables como **cards**, **formularios dinámicos** y **listas filtrables**, para mantener una experiencia de usuario consistente y eficiente.

El sistema busca optimizar la administración diaria de la veterinaria, garantizando el control de usuarios, el registro de mascotas y la gestión de inventarios de productos.

---

# 📋 Backlog Funcional

| ID | Como (rol) | Quiero (objetivo) | Para (beneficio) | Prioridad |
|----|-------------|------------------|------------------|------------|
| **HU01** | Administrador | Crear un nuevo usuario ingresando nombre completo, correo electrónico, teléfono, rol y estado | Registrar nuevos miembros del sistema con sus datos completos | Alta |
| **HU02** | Administrador | Editar la información de un usuario (nombre completo, correo electrónico, teléfono, rol y estado) | Mantener los datos de los usuarios actualizados | Alta |
| **HU03** | Administrador | Listar todos los usuarios mostrando nombre completo, correo electrónico y rol | Visualizar rápidamente la información general de los usuarios registrados | Alta |
| **HU04** | Administrador | Ver el detalle completo de un usuario con toda su información personal (nombre completo, correo electrónico, teléfono, rol y estado) más una imagen estática (representativa) | Consultar información específica de un usuario del sistema | Media |
| **HU19** | Administrador | Eliminar un usuario del sistema | Mantener el listado de usuarios depurado y actualizado | Alta |
| **HU05** | Administrador | Registrar una nueva mascota ingresando nombre, especie, raza, edad, sexo, propietario y estado de salud | Llevar un registro completo de las mascotas atendidas | Alta |
| **HU06** | Administrador | Editar los datos de una mascota (nombre, especie, raza, edad, sexo, propietario y estado de salud) | Actualizar información clínica o del propietario de la mascota | Alta |
| **HU07** | Administrador | Listar todas las mascotas mostrando nombre, especie y propietario | Visualizar de forma general todas las mascotas registradas | Alta |
| **HU08** | Administrador | Ver el detalle completo de una mascota con sus datos clínicos e información del propietario (nombre, especie, raza, edad, sexo, propietario y estado de salud) más una imagen estática (representativa) | Consultar información médica o de contacto de cada mascota | Media |
| **HU20** | Administrador | Eliminar una mascota del sistema | Mantener el registro de mascotas limpio y actualizado | Alta |
| **HU09** | Administrador | Crear un nuevo tipo de mascota ingresando nombre del tipo, descripción y URL del ícono | Clasificar correctamente las mascotas por su especie | Media |
| **HU10** | Administrador | Editar un tipo de mascota modificando nombre del tipo, descripción y URL del ícono | Mantener actualizada la información visual y descriptiva de las especies | Media |
| **HU11** | Administrador | Listar todos los tipos de mascotas mostrando nombre, descripción e ícono | Visualizar fácilmente las especies registradas en el sistema | Media |
| **HU21** | Administrador | Eliminar un tipo de mascota del sistema | Mantener organizada la clasificación de especies disponibles | Media |
| **HU12** | Administrador | Crear un nuevo producto ingresando nombre, categoría, precio, stock e imagen (ruta) | Registrar nuevos artículos disponibles para la venta o uso interno | Alta |
| **HU13** | Administrador | Editar un producto modificando su nombre, categoría, precio, stock e imagen (ruta) | Mantener actualizada la información del inventario | Alta |
| **HU14** | Administrador | Listar todos los productos mostrando imagen, nombre y precio | Visualizar el inventario general de productos | Alta |
| **HU15** | Administrador | Ver el detalle de un producto con su imagen, nombre, descripción, precio, categoría y stock | Consultar información detallada de cada producto | Media |
| **HU22** | Administrador | Eliminar un producto del inventario | Mantener actualizado el listado de productos disponibles | Alta |
| **HU16** | Administrador | Crear una nueva categoría de producto ingresando nombre, descripción e URL del ícono | Clasificar los productos según su tipo (alimentos, medicamentos, accesorios, etc.) | Media |
| **HU17** | Administrador | Editar una categoría modificando su nombre, descripción e URL del ícono | Mantener actualizadas las categorías de productos | Media |
| **HU18** | Administrador | Listar todas las categorías mostrando nombre, descripción e ícono | Facilitar la navegación y organización de productos en el sistema | Media |
| **HU23** | Administrador | Eliminar una categoría de producto | Mantener la estructura del catálogo actualizada y libre de elementos obsoletos | Media |

---

# ✅ Criterios de Aceptación (Gherkin)

---

## 🧩 HU01 – Crear Usuario  
**Característica:** Gestión de usuarios  

**Escenarios:**

### ✔ Crear un nuevo usuario exitosamente  
Dado que el administrador está en la pantalla "Crear Usuario"  
Cuando llena los campos: nombre completo, correo electrónico, teléfono, rol y estado  
Y hace clic en el botón "Registrar"  
Entonces el sistema registra el nuevo usuario  
Y muestra la pantalla "Lista de Usuarios"

---

## 🧩 HU02 – Editar Usuario  
**Característica:** Gestión de usuarios  

**Escenarios:**

### ✔ Editar un usuario existente  
Dado que el administrador está en la pantalla "Editar Usuario"  
Cuando modifica uno o varios de los campos: nombre completo, correo electrónico, teléfono, rol o estado  
Y hace clic en el botón "Guardar cambios"  
Entonces el sistema actualiza los datos del usuario  
Y muestra la pantalla "Lista de Usuarios"

---

## 🧩 HU03 – Listar Usuarios  
**Característica:** Gestión de usuarios  

**Escenarios:**

### ✔ Listar todos los usuarios registrados  
Dado que el administrador accede a la pantalla "Lista de Usuarios"  
Entonces el sistema muestra una lista con el nombre completo, correo electrónico y rol de cada usuario  
Y en cada usuario muestra los botones "Editar" y "Detalle"

---

## 🧩 HU04 – Ver Detalles del Usuario  
**Característica:** Gestión de usuarios  

**Escenarios:**

### ✔ Ver información detallada de un usuario  
Dado que el administrador está en la pantalla "Lista de Usuarios"  
Cuando hace clic en el botón "Detalle" de un usuario  
Entonces el sistema muestra una pantalla con los datos completos del usuario:  
nombre completo, correo electrónico, teléfono, rol, estado e imagen representativa  
Y muestra un botón para regresar a la lista

---

## 🧩 HU05 – Crear Mascota  
**Característica:** Gestión de mascotas  

**Escenarios:**

### ✔ Registrar una nueva mascota exitosamente  
Dado que el administrador está en la pantalla "Registrar Mascota"  
Cuando llena los campos: nombre, especie, raza, edad, sexo, propietario y estado de salud  
Y hace clic en el botón "Registrar mascota"  
Entonces el sistema registra la nueva mascota  
Y muestra la pantalla "Lista de Mascotas"

---

## 🧩 HU06 – Editar Mascota  
**Característica:** Gestión de mascotas  

**Escenarios:**

### ✔ Editar la información de una mascota  
Dado que el administrador está en la pantalla "Editar Mascota"  
Cuando modifica uno o varios de los siguientes campos:  
nombre, especie, raza, edad, sexo, propietario o estado de salud  
Y hace clic en el botón "Guardar cambios"  
Entonces el sistema actualiza la información de la mascota  
Y muestra la pantalla "Lista de Mascotas"

---

## 🧩 HU07 – Listar Mascotas  
**Característica:** Gestión de mascotas  

**Escenarios:**

### ✔ Listar todas las mascotas registradas  
Dado que el administrador accede a la pantalla "Lista de Mascotas"  
Entonces el sistema muestra una lista con el nombre, especie y propietario de cada mascota  
Y en cada mascota muestra los botones "Editar" y "Detalle"

---

## 🧩 HU08 – Ver Detalles de Mascota  
**Característica:** Gestión de mascotas  

**Escenarios:**

### ✔ Ver información completa de una mascota  
Dado que el administrador está en la pantalla "Lista de Mascotas"  
Cuando hace clic en el botón "Detalle" de una mascota  
Entonces el sistema muestra una pantalla con los datos:  
nombre, especie, raza, edad, sexo, propietario, estado de salud e imagen representativa  
Y muestra un botón para regresar a la lista

---

## 🧩 HU09 – Crear Tipo de Mascota  
**Característica:** Gestión de tipos de mascotas  

**Escenarios:**

### ✔ Registrar un nuevo tipo de mascota exitosamente  
Dado que el administrador está en la pantalla "Crear Tipo de Mascota"  
Cuando ingresa el nombre del tipo, la descripción y la URL del ícono  
Y hace clic en el botón "Crear tipo"  
Entonces el sistema registra el nuevo tipo de mascota  
Y muestra la pantalla "Lista de Tipos de Mascotas"

---

## 🧩 HU10 – Editar Tipo de Mascota  
**Característica:** Gestión de tipos de mascotas  

**Escenarios:**

### ✔ Editar un tipo de mascota existente  
Dado que el administrador está en la pantalla "Editar Tipo de Mascota"  
Cuando modifica el nombre, la descripción o la URL del ícono  
Y hace clic en el botón "Guardar cambios"  
Entonces el sistema actualiza la información del tipo de mascota  
Y muestra la pantalla "Lista de Tipos de Mascotas"

---

## 🧩 HU11 – Listar Tipos de Mascotas  
**Característica:** Gestión de tipos de mascotas  

**Escenarios:**

### ✔ Listar todos los tipos de mascotas registrados  
Dado que el administrador accede a la pantalla "Lista de Tipos de Mascotas"  
Entonces el sistema muestra una lista con el nombre, descripción e ícono de cada tipo registrado  
Y en cada tipo muestra un botón "Editar"

---

## 🧩 HU12 – Crear Producto  
**Característica:** Gestión de productos  

**Escenarios:**

### ✔ Registrar un nuevo producto exitosamente  
Dado que el administrador está en la pantalla "Crear Producto"  
Cuando ingresa los campos: nombre, categoría, precio, stock e imagen  
Y hace clic en el botón "Crear Producto"  
Entonces el sistema registra el nuevo producto  
Y muestra la pantalla "Lista de Productos"

---

## 🧩 HU13 – Editar Producto  
**Característica:** Gestión de productos  

**Escenarios:**

### ✔ Editar la información de un producto existente  
Dado que el administrador está en la pantalla "Editar Producto"  
Cuando modifica uno o varios campos: nombre, categoría, precio, stock o imagen  
Y hace clic en el botón "Guardar cambios"  
Entonces el sistema actualiza la información del producto  
Y muestra la pantalla "Lista de Productos"

---

## 🧩 HU14 – Listar Productos  
**Característica:** Gestión de productos  

**Escenarios:**

### ✔ Listar todos los productos registrados  
Dado que el administrador accede a la pantalla "Lista de Productos"  
Entonces el sistema muestra una lista con la imagen, nombre y precio de cada producto  
Y en cada producto muestra los botones "Editar" y "Detalle"

---

## 🧩 HU15 – Ver Detalles de Producto  
**Característica:** Gestión de productos  

**Escenarios:**

### ✔ Ver información detallada de un producto  
Dado que el administrador está en la pantalla "Lista de Productos"  
Cuando hace clic en el botón "Detalle"  
Entonces el sistema muestra una pantalla con:  
imagen del producto, nombre, descripción, precio, categoría y stock  
Y muestra un botón para regresar a la lista

---

## 🧩 HU16 – Crear Categoría de Producto  
**Característica:** Gestión de categorías  

**Escenarios:**

### ✔ Registrar una nueva categoría exitosamente  
Dado que el administrador está en la pantalla "Crear Categoría"  
Cuando ingresa nombre, descripción y la URL del ícono  
Y hace clic en el botón "Crear Categoría"  
Entonces el sistema registra la nueva categoría  
Y muestra la pantalla "Lista de Categorías"

---

## 🧩 HU17 – Editar Categoría de Producto  
**Característica:** Gestión de categorías  

**Escenarios:**

### ✔ Editar una categoría existente  
Dado que el administrador está en la pantalla "Editar Categoría"  
Cuando modifica el nombre, la descripción o la URL del ícono  
Y hace clic en el botón "Guardar cambios"  
Entonces el sistema actualiza la categoría  
Y muestra la pantalla "Lista de Categorías"

---

## 🧩 HU18 – Listar Categorías de Producto  
**Característica:** Gestión de categorías  

**Escenarios:**

### ✔ Listar todas las categorías registradas  
Dado que el administrador accede a la pantalla "Lista de Categorías"  
Entonces el sistema muestra una lista con el nombre, descripción e ícono de cada categoría  
Y en cada categoría muestra un botón "Editar"

---

## 🧩 HU19 – Eliminar Usuario  
**Característica:** Gestión de usuarios  

**Escenarios:**

### ✔ Eliminar un usuario del sistema  
Dado que el administrador está en la pantalla "Lista de Usuarios"  
Y cada usuario tiene un botón "Eliminar"  
Cuando el administrador hace clic en el botón "Eliminar" de un usuario  
Y confirma la acción en el mensaje de confirmación  
Entonces el sistema elimina el usuario seleccionado  
Y actualiza la lista mostrando solo los usuarios restantes

---

## 🧩 HU20 – Eliminar Mascota  
**Característica:** Gestión de mascotas  

**Escenarios:**

### ✔ Eliminar una mascota registrada  
Dado que el administrador está en la pantalla "Lista de Mascotas"  
Y cada mascota tiene un botón "Eliminar"  
Cuando hace clic en el botón "Eliminar" de una mascota  
Y confirma la operación  
Entonces el sistema elimina la mascota del registro  
Y muestra la lista de mascotas actualizada

---

## 🧩 HU21 – Eliminar Tipo de Mascota  
**Característica:** Gestión de tipos de mascotas  

**Escenarios:**

### ✔ Eliminar un tipo de mascota  
Dado que el administrador está en la pantalla "Lista de Tipos de Mascotas"  
Y cada tipo registrado tiene un botón "Eliminar"  
Cuando hace clic en "Eliminar" sobre un tipo de mascota  
Y confirma la acción  
Entonces el sistema elimina dicho tipo de mascota  
Y actualiza la lista de tipos registrados

---

## 🧩 HU22 – Eliminar Producto  
**Característica:** Gestión de productos  

**Escenarios:**

### ✔ Eliminar un producto del inventario  
Dado que el administrador está en la pantalla "Lista de Productos"  
Y cada producto tiene un botón "Eliminar"  
Cuando hace clic en "Eliminar" para un producto  
Y confirma la eliminación  
Entonces el sistema elimina ese producto del inventario  
Y muestra la lista actualizada sin dicho producto

---

## 🧩 HU23 – Eliminar Categoría  
**Característica:** Gestión de categorías de productos  

**Escenarios:**

### ✔ Eliminar una categoría existente  
Dado que el administrador está en la pantalla "Lista de Categorías"  
Y cada categoría tiene un botón "Eliminar"  
Cuando hace clic en "Eliminar" en una categoría  
Y confirma la acción en el mensaje correspondiente  
Entonces el sistema elimina la categoría seleccionada  
Y actualiza la lista de categorías presentes en el sistema

---



LINK TRELLO: https://trello.com/invite/b/68eda33fc59ae2df84b77533/ATTIa31bf656126f0cd53046bab93569c59a290EBD09/appveterinaria 

LINK VIDEO SUSTENTACIÓN: https://youtu.be/Bo64tPm6G-I?si=Md0Tl5rQ78KyNiOj 
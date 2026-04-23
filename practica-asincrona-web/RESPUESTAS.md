# Practica: Presentacion asincrona de informacion en un sitio web

## Actividad 1

### Que significa una peticion asincrona
Una peticion asincrona es una solicitud que el navegador hace al servidor sin detener por completo el funcionamiento de la pagina. Mientras espera la respuesta, el usuario puede seguir interactuando con la interfaz y, cuando los datos llegan, JavaScript actualiza solo la parte necesaria del contenido.

### Que ventajas tiene frente a recargar la pagina
Permite una experiencia mas rapida y fluida porque evita recargar todos los archivos del sitio. Tambien reduce esperas innecesarias, mejora la sensacion de rendimiento, consume menos recursos y hace posible interfaces mas dinamicas como buscadores, filtros, formularios y actualizaciones en tiempo real.

## Actividad 2

### Fetch API
Es la interfaz de JavaScript que permite hacer peticiones HTTP desde el navegador. Se usa para solicitar datos a una API y trabajar con respuestas en formatos como JSON.

### async / await
Son palabras reservadas de JavaScript que facilitan trabajar con operaciones asincronas. `async` indica que una funcion devolvera una promesa y `await` pausa esa funcion hasta recibir el resultado, haciendo el codigo mas claro y legible.

### JSON
Es un formato de intercambio de datos basado en texto. Se utiliza para enviar y recibir informacion estructurada entre cliente y servidor de forma sencilla.

### DOM
Es la representacion en memoria del documento HTML. JavaScript puede usar el DOM para modificar texto, agregar elementos, eliminar contenido o cambiar estilos sin recargar la pagina.

### Express
Es un framework de Node.js para crear servidores y APIs de forma simple. En esta practica se usa para servir archivos estaticos y para construir las rutas `/api/productos`.

## Actividad 3

### Donde se hace la peticion al servidor
La peticion se hace en [public/app.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/app.js:23) con:

```js
const respuesta = await fetch('/api/productos');
```

Tambien se realiza otra peticion asincrona en [public/app.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/app.js:98) para agregar productos:

```js
const respuesta = await fetch('/api/productos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoProducto)
});
```

### Donde se reciben los datos
Los datos del servidor se reciben en [public/app.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/app.js:30) con:

```js
productos = await respuesta.json();
```

Y en el envio del formulario se reciben en [public/app.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/app.js:106):

```js
const datos = await respuesta.json();
```

### Donde se actualiza la interfaz
La interfaz se actualiza principalmente en [public/app.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/app.js:55) dentro de la funcion `renderizarProductos`, donde se crean tarjetas HTML y se insertan en el contenedor `listaProductos`. Tambien se actualiza en varias lineas donde cambia `mensaje.textContent`, donde se muestran estados como "Consultando productos..." o "Productos cargados correctamente.".

## Flujo asincrono del proyecto
1. El usuario hace clic en el boton "Cargar productos".
2. JavaScript muestra un mensaje y una animacion de carga.
3. `fetch('/api/productos')` envia una solicitud GET al servidor Express.
4. El servidor responde con un arreglo de productos en formato JSON.
5. El cliente convierte la respuesta con `await respuesta.json()`.
6. JavaScript filtra o muestra los datos y crea tarjetas en el DOM.
7. La pagina se actualiza sin recargarse por completo.
8. Cuando se agrega un nuevo producto, el formulario envia una solicitud POST y la interfaz se refresca dinamicamente.

## Mejoras implementadas
1. Buscador de productos por nombre o categoria.
2. Filtro por categoria.
3. Animacion de carga mientras llega la respuesta.
4. Mensaje de "sin resultados" cuando los filtros no encuentran coincidencias.
5. Formulario asincrono para agregar productos sin recargar la pagina.

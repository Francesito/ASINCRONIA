# Practica asincrona web

Proyecto de la Unidad II de Desarrollo Web Profesional sobre presentacion asincrona de informacion con Node.js, Express, Fetch API, JSON, async/await y DOM.

## Estructura

```text
practica-asincrona-web
├── public
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── RESPUESTAS.md
├── server.js
├── package.json
└── package-lock.json
```

## Como ejecutar

1. Abre una terminal en la carpeta `practica-asincrona-web`.
2. Instala dependencias con `npm install`.
3. Inicia el servidor con `npm start` o `node server.js`.
4. Abre `http://localhost:3000` en el navegador.

## Funcionalidades

- Carga asincrona de productos con `fetch`.
- Uso de `async/await` para esperar respuestas del servidor.
- Renderizado dinamico de tarjetas en el DOM.
- Manejo de errores en cliente y servidor.
- Buscador por nombre o categoria.
- Filtro por categoria.
- Animacion de carga.
- Mensaje de "sin resultados".
- Formulario asincrono para agregar productos.

## Archivos clave

- [server.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/server.js:1): servidor Express y API.
- [public/app.js](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/app.js:1): logica asincrona, filtros y renderizado.
- [public/index.html](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/index.html:1): interfaz principal.
- [public/styles.css](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/public/styles.css:1): estilos y animaciones.
- [RESPUESTAS.md](/home/francesito/Documents/ASINCRONIA/practica-asincrona-web/RESPUESTAS.md:1): respuestas a las actividades de investigacion.

## Evidencias sugeridas

- Video corto mostrando tu rostro, la ejecucion del servidor y la carga asincrona.
- Explicacion breve usando el flujo descrito en `RESPUESTAS.md`.
- Mostrar el uso del buscador, filtro y formulario de alta de productos.

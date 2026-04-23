const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const productos = [
  { id: 1, nombre: 'Laptop', precio: 14500, categoria: 'Tecnologia' },
  { id: 2, nombre: 'Mouse Gamer', precio: 650, categoria: 'Accesorios' },
  { id: 3, nombre: 'Teclado Mecanico', precio: 1200, categoria: 'Accesorios' },
  { id: 4, nombre: 'Monitor 24 pulgadas', precio: 3200, categoria: 'Tecnologia' },
  { id: 5, nombre: 'Audifonos Bluetooth', precio: 980, categoria: 'Audio' }
];

app.get('/api/productos', (req, res) => {
  setTimeout(() => {
    res.json(productos);
  }, 1500);
});

app.post('/api/productos', (req, res) => {
  const { nombre, precio, categoria } = req.body;

  if (!nombre || !categoria || typeof precio !== 'number' || Number.isNaN(precio) || precio <= 0) {
    return res.status(400).json({
      mensaje: 'Datos invalidos. Verifica nombre, categoria y precio.'
    });
  }

  const nuevoProducto = {
    id: productos.length ? productos[productos.length - 1].id + 1 : 1,
    nombre: nombre.trim(),
    precio,
    categoria: categoria.trim()
  };

  productos.push(nuevoProducto);

  return res.status(201).json({
    mensaje: 'Producto agregado correctamente',
    producto: nuevoProducto
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});

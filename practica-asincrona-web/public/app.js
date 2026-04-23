const btnCargar = document.getElementById('btnCargar');
const mensaje = document.getElementById('mensaje');
const listaProductos = document.getElementById('listaProductos');
const buscador = document.getElementById('buscador');
const filtroCategoria = document.getElementById('filtroCategoria');
const loader = document.getElementById('loader');
const sinResultados = document.getElementById('sinResultados');
const formProducto = document.getElementById('formProducto');

let productos = [];

btnCargar.addEventListener('click', cargarProductos);
buscador.addEventListener('input', aplicarFiltros);
filtroCategoria.addEventListener('change', aplicarFiltros);
formProducto.addEventListener('submit', agregarProducto);

async function cargarProductos() {
  mostrarCarga(true);
  mensaje.textContent = 'Consultando productos...';
  listaProductos.innerHTML = '';
  sinResultados.classList.add('oculto');
  btnCargar.disabled = true;

  try {
    const respuesta = await fetch('/api/productos');

    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la informacion');
    }

    productos = await respuesta.json();
    actualizarOpcionesCategoria();
    aplicarFiltros();
    mensaje.textContent = 'Productos cargados correctamente.';
  } catch (error) {
    mensaje.textContent = 'Ocurrio un error al cargar los productos.';
    console.error(error);
  } finally {
    mostrarCarga(false);
    btnCargar.disabled = false;
  }
}

function aplicarFiltros() {
  const texto = buscador.value.trim().toLowerCase();
  const categoriaSeleccionada = filtroCategoria.value;

  const productosFiltrados = productos.filter((producto) => {
    const coincideTexto =
      producto.nombre.toLowerCase().includes(texto) ||
      producto.categoria.toLowerCase().includes(texto);

    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || producto.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  renderizarProductos(productosFiltrados);
}

function renderizarProductos(lista) {
  listaProductos.innerHTML = '';

  if (!lista.length) {
    sinResultados.classList.remove('oculto');
    return;
  }

  sinResultados.classList.add('oculto');

  lista.forEach((producto, indice) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta';
    tarjeta.style.animationDelay = `${indice * 0.07}s`;

    tarjeta.innerHTML = `
      <span class="badge">${producto.categoria}</span>
      <h3>${producto.nombre}</h3>
      <p><strong>Precio:</strong> $${formatearPrecio(producto.precio)}</p>
      <p><strong>ID:</strong> ${producto.id}</p>
    `;

    listaProductos.appendChild(tarjeta);
  });
}

function actualizarOpcionesCategoria() {
  const categorias = ['Todas', ...new Set(productos.map((producto) => producto.categoria))];

  filtroCategoria.innerHTML = categorias
    .map((categoria) => `<option value="${categoria}">${categoria}</option>`)
    .join('');
}

async function agregarProducto(evento) {
  evento.preventDefault();

  const formData = new FormData(formProducto);
  const nuevoProducto = {
    nombre: formData.get('nombre').trim(),
    precio: Number(formData.get('precio')),
    categoria: formData.get('categoria').trim()
  };

  mensaje.textContent = 'Enviando producto al servidor...';

  try {
    const respuesta = await fetch('/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible agregar el producto.');
    }

    productos.push(datos.producto);
    actualizarOpcionesCategoria();
    filtroCategoria.value = 'Todas';
    buscador.value = '';
    renderizarProductos(productos);
    mensaje.textContent = datos.mensaje;
    formProducto.reset();
  } catch (error) {
    mensaje.textContent = error.message;
    console.error(error);
  }
}

function mostrarCarga(visible) {
  loader.classList.toggle('oculto', !visible);
}

function formatearPrecio(precio) {
  return Number(precio).toLocaleString('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

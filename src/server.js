// * Requerir todo de express
const express = require('express');

// * Declarar express para su funcionalidad
const app = express();

const path = require('path');

const HomeRoutes = require('./routes/home');
const UserRoutes = require('./routes/users');

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

console.log(__dirname)

// * Escuchando el puerto 3000
app.listen(3000);

app.set("appName", "Express Course")

// * Requerir todo de morgan
const morgan = require('morgan');

// * Arreglo de productos a utilizar
let products = [
  {
    id: 1,
    name: "Televisor",
    description: "Televisor 4K de 2 pulgadas",
    color: "Rojo",
    precio: 50000,
  },
  {
    id: 2,
    name: "Keyboard gaming",
    description: "Tiene luces 8K",
    color: "RGB",
    precio: 2000,
  },
  {
    id: 3,
    name: "Mouse gaming",
    description: "5000 de DPI",
    color: "Negro con Verde",
    precio: 32500,
  },
  {
    id: 4,
    name: "PadMouse Portable",
    description: "Tiene imagenes de black clover",
    color: "Transparente",
    precio: 3000,
  },
];


// * Tipo dev de morgan
app.use(morgan('dev'));

// * Indicar que se pueda retornar tipo de datos JSON
app.use(express.json());

app.use(HomeRoutes);
app.use(UserRoutes);

// * Ruta para obtener todos los productos
app.get('/products', (req, res) => {
  res.json(products)
});


// * Ruta para crear un nuevo producto
app.post('/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.send(newProduct);
});

// * Ruta para actualizar un producto en especifico
app.put('/products/:id', (req, res) => {
  const newData = req.body;
  const idProduct = parseInt(req.params.id);
  let productFind = products.find((p) => p.id === idProduct);
  if (!productFind) return res.status(404).json({message: "No existe el producto"});
  products = products.map((p) => p.id === idProduct ? {...p, ...newData} : p);
  res.json({message: `Producto con el id ${idProduct} ha sido modificado`})
  res.send("Modificando el producto");
});

// * Ruta para eliminar un producto especifico
app.delete('/products/:id', (req, res) => {
  const idProduct = parseInt(req.params.id);
  const productFound = products.find((p) => p.id === idProduct);
  if (!productFound) return res.status(404).json({message: "No existe el producto"});
  products = products.filter((p) => p.id !== idProduct);
  res.send("Eliminando producto");
});

// * Ruta para obtener datos de un producto especifico
app.get('/products/:id', (req, res) => {
  const idProduct = parseInt(req.params.id);
  const productFind = products.find((p) => p.id === idProduct);
  if (!productFind) return res.status(404).json({message: "No existe el producto"});
  res.send(productFind);
});
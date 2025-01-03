// * Requerir todo de express
const express = require('express');

// * Declarar express para su funcionalidad
const app = express();

// * Escuchando el puerto 3000
app.listen(3000);

// * Requerir todo de morgan
const morgan = require('morgan');

// const products = [
//   {
//     id: 1,
//     name: "Televisor",
//     description: "Televisor 4K de 2 pulgadas",
//     color: "Rojo",
//     precio: 50000,
//   },
//   {
//     id: 2,
//     name: "Torre",
//     description: "Torre cont intelCore i20 1100Hz",
//     color: "Verde",
//     precio: 100000
//   },
// ]

const products = [
  {
    id: 1,
    name: "Televisor",
    description: "Televisor 4K de 2 pulgadas",
    color: "Rojo",
    precio: 50000,
  },
];

// * Tipo dev de morgan
app.use(morgan('dev'));

// * Indicar que se pueda retornar tipo de datos JSON
app.use(express.json());

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
  res.send("Modificando el producto");
});

// * Ruta para eliminar un producto especifico
app.delete('/products/:id', (req, res) => {
  res.send("Eliminando producto");
});

// * Ruta para obtener datos de un producto especifico
app.get('/products/:id', (req, res) => {
  const idProduct = parseInt(req.params.id);
  const productFind = products.find((product) => {
    return product.id === idProduct;
  });
  res.send(productFind);
});
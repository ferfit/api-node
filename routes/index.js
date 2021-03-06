const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');

module.exports = function(){

    
    /*---------Clientes---------*/
    router.post('/clientes',clienteController.nuevoCliente);
    router.get('/clientes',clienteController.mostrarClientes);
    router.get('/clientes/:id',clienteController.mostrarCliente);
    router.put('/clientes/:id',clienteController.actualizarCliente);
    router.delete('/clientes/:id',clienteController.eliminarCliente);
    /*---------Productos---------*/
    router.post('/productos',
        productoController.subirArchivo,
        productoController.nuevoProducto);
    router.get('/productos',productoController.mostrarProductos);
    router.get('/productos/:id',productoController.mostrarProducto);
    router.put('/productos/:id',
        productoController.subirArchivo,
        productoController.actualizarProducto);
    router.delete('/productos/:id',productoController.eliminarProducto);
/*---------Pedidos---------*/
router.post('/pedidos',pedidoController.nuevoPedido);
router.get('/pedidos',pedidoController.mostrarPedidos);
router.get('/pedidos/:id',pedidoController.mostrarPedido);
router.put('/pedidos/:id',pedidoController.actualizarPedido);
router.delete('/pedidos/:id',pedidoController.eliminarPedido);

    return router;
}
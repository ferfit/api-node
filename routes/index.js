const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

module.exports = function(){

    
    /*---------Clientes---------*/
    router.post('/clientes',clienteController.nuevoCliente);
    router.get('/clientes',clienteController.mostrarClientes);
    router.get('/clientes/:id',clienteController.mostrarCliente);
    router.put('/clientes/:id',clienteController.actualizarCliente);
    router.delete('/clientes/:id',clienteController.eliminarCliente);


    return router;
}
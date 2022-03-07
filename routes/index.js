const express = require('express');
const router = express.Router();

module.exports = function(){

    router.get('/',(req,res)=>{
        res.send('index pagina')
    });
    router.get('/nosotros',(req,res)=>{
        res.send('nosotros pagina')
    });

    return router;
}
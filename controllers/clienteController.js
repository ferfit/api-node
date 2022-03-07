const Clientes = require('../models/Clientes');

exports.nuevoCliente = async (req,res,next) =>{

    const cliente = new Clientes(req.body);

    try {
        //Almacena el registo
        await cliente.save();

        res.json({
            mensaje:'Se agrego un nuevo cliente'
        });

    } catch (error) {
        //Si hay un error
        console.log(error);
        next();
    }

}

exports.mostrarClientes = async (req, res,next) =>{

    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarCliente = async(req, res,next)=>{

    try {

        const cliente = await Clientes.findById(req.params.id);
        
        res.json(cliente);

    } catch (error) {

        console.log(error);
        res.json({mensaje:'Ese cliente no existe.'});
        next();

    }
}

exports.actualizarCliente = async (req,res,next) =>{

    try {

        const cliente = await Clientes.findOneAndUpdate({_id: req.params.id},
        req.body,{
            new:true //Le indicamos que nos traiga el nuevo
        });
        
        res.json(cliente);

    } catch (error) {

        console.log(error);
        res.json({mensaje:'El cliente no se actualizado correctamente.'});
        next();

    }

}

exports.eliminarCliente = async (req,res,next) =>{

    try {

        const cliente = await Clientes.findOneAndDelete(req.params.id);
        
        res.json({
            mensaje:'El cliente se eliminó exitosamente.'
        });

    } catch (error) {

        console.log(error);
        res.json({mensaje:'No se eliminó el cliente.'});
        next();

    }
}
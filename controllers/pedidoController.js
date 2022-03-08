const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req,res,next) =>{
    const pedido = new Pedidos(req.body);

    try {
        pedido.save();
        res.json({
            mensaje:'Se agrego un nuevo pedido'
        });

    } catch (error) {
        console.log(error)   ;
        next();
    }
}

exports.mostrarPedidos = async (req,res,next) =>{
    try {

        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });

        res.json(pedidos);

    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedido = async (req,res,next)=>{
    const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
        path:'pedido.producto',
        model:'Productos'
    });

    if(!pedido){
        res.json({mensaje: 'Ese pedido no existe.'});
        return next();
    }

    res.json(pedido);

}

exports.actualizarPedido = async (req,res,next) =>{
    try {
        const pedido = await Pedidos.findOneAndUpdate({
            _id:req.params.id
        },req.body,{
            new:true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });

        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarPedido = async (req,res,next)=>{
    try {
        await Pedidos.findOneAndDelete(req.params.id);
        res.json({mensaje:'El pedido se borró con exito.'});
    } catch (error) {
        console.log(error);
        next();
    }


}
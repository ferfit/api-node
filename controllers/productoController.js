const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

//Configuración de multer y subida de imagen

const configuracionMulter = {
    storage:fileStorage = multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null,__dirname+'../../uploads/');
        },
        filename:(req,file,cb) =>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
            cb(null,true);
        } else {
            cb(new Error('Formato no válido'));
        }
    }

}

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req,res,next) =>{
    upload(req,res,function(error){
        if(error){
            res.json({mensaje:error})
        }
        return next();
    })
}



//Crud productos
exports.nuevoProducto = async(req,res,next) => {
    
    const producto = new Productos(req.body);
    
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        
        await producto.save();
        res.json({
            mensaje: 'Se agregó un nuevo producto'
        })
    } catch (error) {
        console.log(error);
        next();
    }


}

exports.mostrarProductos = async(req,res,next) =>{

    try {
        
        const productos = await Productos.find({});
    
        res.json(productos);

    } catch (error) {
        console.log(error);
        next();
    }    
}

exports.mostrarProducto = async (req,res,next) =>{
    const producto = await Productos.findById(req.params.id);

    if(!producto) {
        res.json({
            mensaje:'Ese producto no existe'
        });
        return next();
    }

    res.json(producto);
}

exports.actualizarProducto = async( req,res,next)=>{
    try {

        let productoAnterior = await Productos.findById(req.params.id);
        //Contruir un nuevo producto
        let nuevoProducto = req.body;
        //Verificar si hay imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }



        const producto = await Productos.findOneAndUpdate({_id:req.params.id},
        nuevoProducto,{
            new:true //retorna el nuevo registro actualizado
        });

        res.json(producto);
        

    } catch (error) {
        console.log(error);
        next();
    }
}

//TO DO: eliminar la imagen tanto en actuazliar como eliminar producto
exports.eliminarProducto = async (req,res,next) =>{

    await Productos.findOneAndDelete(req.params.id);

    res.json({
        mensaje: 'El producto se eliminó exitosamente'
    });

    try {
        
    } catch (error) {
        console.log(error);
        next();
    }
}
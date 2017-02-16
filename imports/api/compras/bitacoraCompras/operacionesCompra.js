/**
 * Created by jvltmtz on 23/11/16.
 */
import {_} from "meteor/underscore";
import {Postulaciones} from "../../postulaciones/collection";
import {ProductosCarrito} from "../productosCarrito/collection";
import {CarritoCompras} from "../carritoCompras/collection";

const operacionesCompra = {
    _updatePostuladosCarrito(propietario) {
        const carrito = CarritoCompras.findOne({propietario: propietario});
        const productos = ProductosCarrito.find({carritoId: carrito._id},
            {fields: {postulacionId: 1}});
        let idsPost = [];
        productos.forEach((producto)=> {
            idsPost.push(producto.postulacionId);
        });

        let postulacionesBulk = Postulaciones.rawCollection().initializeUnorderedBulkOp();
        postulacionesBulk.find({_id: {$in: idsPost}}).update({$set: {estado: 2, fechaSeleccion: new Date()}});
        const execute = Meteor.wrapAsync(postulacionesBulk.execute, postulacionesBulk);
        try{
           execute();
        } catch (error){
            console.log('Error al actualizar las postulaciones a 2 ', idsPost);
        }
        //Aqui va enviar ticket.

    },
    afterInsertBitacoraCompras(bitacora) {
        this._updatePostuladosCarrito(bitacora.propietario);
    }
};
export default operacionesCompra;
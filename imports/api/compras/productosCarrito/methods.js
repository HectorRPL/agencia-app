/**
 * Created by jvltmtz on 3/11/16.
 */
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {ProductosCarrito} from "../productosCarrito/collection.js";
import {_} from 'meteor/underscore';

export const buscarPostulacion = new ValidatedMethod({
    name: 'carritoCompras.buscarPostulacion',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para buscar un producto en el carrito necesitas registrarte.', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    validate: new SimpleSchema({
        postulacionId: {type: String}
    }),
    run({postulacionId}){
        Meteor.isServer(){

        }
        let productoEnCarrito = false;
        const selector = {$and: [{postulacionId: postulacionId}, {carritoId: carritoId}]};
        const producto = ProductosCarrito.findOne(selector);
        if(producto){
            productoEnCarrito = true;
        }
        return productoEnCarrito;
    }
});

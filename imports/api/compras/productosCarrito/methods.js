/**
 * Created by jvltmtz on 3/11/16.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {DDPRateLimiter}   from 'meteor/ddp-rate-limiter';
import {ProductosCarrito} from './collection.js';
import {_} from 'meteor/underscore';

export const buscarPostulacion = new ValidatedMethod({
    name: 'productosCarrito.buscarPostulacion',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para buscar un candidato en el carrito necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        postulacionId: {type: String}
    }).validator(),
    run({postulacionId}){
        let productoEnCarrito = false;
        const producto = ProductosCarrito.findOne({postulacionId: postulacionId});
        if (producto) {
            productoEnCarrito = true;
        }
        return productoEnCarrito;
    }
});

export const agregarPostulacion = new ValidatedMethod({
    name: 'productosCarrito.agregarPostulacion',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para agregar un candidato en el carrito necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        postulacionId: {type: String},
        carritoId: {type: String},
        puestoId: {type: String}
    }).validator(),
    run({postulacionId, carritoId, puestoId}){
        let productoNuevo = {
            carritoId: carritoId,
            postulacionId: postulacionId,
            puestoId: puestoId
        };
        return ProductosCarrito.insert(productoNuevo);
    }
});

export const eliminarPostulacion = new ValidatedMethod({
    name: 'productosCarrito.eliminarPostulacion',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para eliminar un candidato en el carrito necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        postulacionId: {type: String},
        carritoId: {type: String},
    }).validator(),
    run({postulacionId, carritoId}){
        const selector = {$and: [{carritoId: carritoId}, {postulacionId: postulacionId}]};
        return ProductosCarrito.remove(selector);
    }
});

export const eliminarProductoId = new ValidatedMethod({
    name: 'productosCarrito.eliminarProductoId',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para eliminar un candidato en el carrito necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        productoId: {type: String},
    }).validator(),
    run({productoId}){
        const selector = {_id: productoId};
        return ProductosCarrito.remove(selector);
    }
});

export const eliminarTodos = new ValidatedMethod({
    name: 'productosCarrito.eliminarTodos',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para vaciar el carrito necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        carritoId: {type: String}
    }).validator(),
    run({carritoId}){
        if (Meteor.isServer) {
            return ProductosCarrito.remove({carritoId: carritoId});
        }
    }
});

const POSTULACIONES_METODOS = _.pluck([buscarPostulacion, agregarPostulacion, eliminarPostulacion,
    eliminarProductoId, eliminarTodos], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(POSTULACIONES_METODOS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}


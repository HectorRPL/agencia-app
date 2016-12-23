/**
 * Created by jvltmtz on 16/08/16.
 */
import {Meteor} from 'meteor/meteor';
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {_} from 'meteor/underscore';
import {Postulaciones} from './collection.js';
import {ProductosCarrito} from '../compras/productosCarrito/collection';


export const actualizarSeleccionadas = new ValidatedMethod({
    name: 'postulaciones.actualizarSeleccionadas',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar mas de una postulacion, necesita registrarse', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    validate: new SimpleSchema({
        carritoId: {type: String}
    }).validator(),
    run({carritoId}) {
        if (Meteor.isServer) {
            this.unblock();
            let idsPost = [];
            const productos = ProductosCarrito.find({carritoId: carritoId},
                {fields: {postulacionId: 1}});
            productos.forEach((producto)=> {
                idsPost.push(producto.postulacionId);
            });
            let postulacionesBulk = Postulaciones.rawCollection().initializeUnorderedBulkOp();
            postulacionesBulk.find({_id: {$in: idsPost}}).update({$set: {estado: 2, fechaSeleccion: new Date()}});
            const execute = Meteor.wrapAsync(postulacionesBulk.execute, postulacionesBulk);
            try{
                return execute();
            } catch (error){

            }

        }
    }
});

export const actualizarPostVistoAgencia = new ValidatedMethod({
    name: 'postulaciones.actualizarPostVistoAgencia',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar una postulacion, necesita registrarse', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    validate: new SimpleSchema({
        postulacionId: {type: String}
    }).validator(),
    run({postulacionId}) {
        return Postulaciones.update({_id: postulacionId}, {$set: {postVistoAgencia: true}});

    }
});

export const actualizarSelecVistoAgencia = new ValidatedMethod({
    name: 'postulaciones.actualizarSelecVistoAgencia',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar una postulacion, necesita registrarse',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        postulacionId: {type: String}
    }).validator(),
    run({postulacionId}) {
        return Postulaciones.update({_id: postulacionId}, {$set: {selecVistoAgencia: true}});
    }
});


const POSTULACIONES_METODOS = _.pluck([actualizarSeleccionadas], 'name');
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

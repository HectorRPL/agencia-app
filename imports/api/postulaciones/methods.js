/**
 * Created by jvltmtz on 16/08/16.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {Postulaciones} from "./collection.js";


export const contactar = new ValidatedMethod({
    name: 'postulaciones.contactar',
    validate: new SimpleSchema({
        postulacionId: {type: String}
    }).validator(),
    run({postulacionId}) {
        return Postulaciones.update({_id: postulacionId},
            {$set: {estado: 2, fechaContacto: new Date()}});
    }
});

export const actualizarPostVistoAgencia = new ValidatedMethod({
    name: 'postulaciones.actualizarVistoAgencia',
    validate: new SimpleSchema({
        tiendaId: {type: String}
    }).validator(),
    run({tiendaId}) {
        console.log('actualizarPostVistoAgencia ',tiendaId)
        return Postulaciones.update({tiendaId: tiendaId},
            {$set: {postVistoAgencia: true}});
    }
});


const POSTULACIONES_METODOS = _.pluck([contactar], 'name');
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

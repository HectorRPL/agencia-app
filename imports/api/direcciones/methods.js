/**
 * Created by jvltmtz on 15/09/16.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {_} from 'meteor/underscore';
import {DDPRateLimiter}   from 'meteor/ddp-rate-limiter';
import {Direcciones} from './collection.js';

const CAMPO_PROPIETARIO = ['propietario'];

const CAMPOS_DIRECCION = ['calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt'];

export const actualizar = new ValidatedMethod({
    name: 'direccion.actualizar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Direcciones.simpleSchema().pick(CAMPO_PROPIETARIO, CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({propietario, calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt}) {
        if (Meteor.isServer) {
            return Direcciones.update({
                propietario: propietario
            }, {
                $set: {
                    calle: calle,
                    delMpio: delMpio,
                    estado: estado,
                    estadoId: estadoId,
                    colonia: colonia,
                    codigoPostal: codigoPostal,
                    numExt: numExt,
                    numInt: numInt
                }
            });
        }
    }
});

const DIRECCION_METHODS = _.pluck([actualizar], 'name');
if (Meteor.isServer) {
    // Solo se permite 5 operaciones por conexión por segundo
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(DIRECCION_METHODS, name);
        },
        // Limite de conexión por Id
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
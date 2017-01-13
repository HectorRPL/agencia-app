/**
 * Created by jvltmtz on 15/09/16.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {_} from 'meteor/underscore';
import {Direcciones} from './collection.js';
const ID = ['id'];
const CAMPOS_DIRECCION = ['calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt'];


// ACTUALIZAR DIRECCIÓN
export const actualizar = new ValidatedMethod({
    name: 'direccion.actualizar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Direcciones.simpleSchema().pick(ID, CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({id, calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt}) {

        return Direcciones.update({
            _id: id
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
});
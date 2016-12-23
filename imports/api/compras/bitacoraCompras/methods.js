/**
 * Created by jvltmtz on 8/12/16.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {BitacoraCompras} from './collection';
import {Agencia} from '../../agencia/collection';

export const insertarCompra = new ValidatedMethod({
    name: 'bitacoraCompras.insertarCompra',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para inserta una compra necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        apiRespuesta: {type: Object, blackbox: true},
        compraExito: {type: Boolean},
        tokenPeticion: {type: String}
    }).validator({
        clean: true,
        filter: false
    }),
    run({apiRespuesta, compraExito, tokenPeticion}) {
        if (Meteor.isServer) {
            this.unblock();
            const agencia = Agencia.findOne({propietario: this.userId});
            let apiMetodoPago = {};
            let apiDetalles = {};

            if (compraExito) {
                apiMetodoPago = apiRespuesta.payment_method;
                apiDetalles = apiRespuesta.details;
                delete apiRespuesta.payment_method;
                delete apiRespuesta.details;
            }

            const bitacora = {
                propietario: agencia._id,
                apiRespuesta: apiRespuesta,
                apiMetodoPago: apiMetodoPago,
                apiDetalles: apiDetalles,
                compraExito: compraExito,
                tokenPeticion: tokenPeticion
            };

            return BitacoraCompras.insert(bitacora);
        }
    }
});

/**
 * Created by jvltmtz on 8/12/16.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {SSR} from 'meteor/meteorhacks:ssr';
import {BitacoraCompras} from './collection';
import {Agencia} from '../../agencia/collection';
import {DatosFinancieros} from '../../datosFinancieros/collection';
import {InfoEmpresa} from '../../catalogos/infoEmpresa/collection';

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


export const enviarTicket = new ValidatedMethod({
    name: 'bitacoraCompras.enviarTicket',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para enviar una compra necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        ticketId: {type: String}
    }).validator({
        clean: true,
        filter: false
    }),
    run({ticketId}) {
        if (Meteor.isServer) {
            const infoEmpresa = InfoEmpresa.findOne({_id: '1'});
            const datosCompra = BitacoraCompras.findOne({_id: ticketId});
            const datosFinancieros = DatosFinancieros.findOne({_id: '1'});

            let ticketCompra = {
                infoEmpresa: infoEmpresa,
                datosCompra: datosCompra,
                datosFinancieros: datosFinancieros
            };
            SSR.compileTemplate('ticketEmailTemplate', Assets.getText('emailTemplates/ticketCompra.html'));
            Email.send({
                to: 'demostradoras01@gmail.com',
                from: 'demostradoras01@gmail.com',
                subject: 'Ticket Compra',
                html: SSR.render('ticketEmailTemplate', ticketCompra)
            });
        }
    }
});
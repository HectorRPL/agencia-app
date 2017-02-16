/**
 * Created by jvltmtz on 8/12/16.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {SSR} from 'meteor/meteorhacks:ssr';
import {BitacoraCompras} from './collection';
import {InfoEmpresa} from '../../catalogos/infoEmpresa/collection';
import {DatosFinancieros} from '../../datosFinancieros/collection';

export const insertarCompra = new ValidatedMethod({
    name: 'bitacoraCompras.insertarCompra',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para inserta una compra necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: null,
    run({apiRespuesta, exito, datosPeticion, agenciaId}) {
        if (Meteor.isServer) {
            let apiMetodoPago = {};
            let apiDetalles = {};
            if (exito) {
                apiMetodoPago = apiRespuesta.payment_method;
                apiDetalles = apiRespuesta.details;
                delete apiRespuesta.payment_method;
                delete apiRespuesta.details;
            }

            const bitacora = {
                propietario: agenciaId,
                apiRespuesta: apiRespuesta,
                apiMetodoPago: apiMetodoPago,
                apiDetalles: apiDetalles,
                compraExito: exito,
                datosPeticion: datosPeticion
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
    }).validator(),
    run({ticketId}) {
        if (Meteor.isServer) {
            const infoEmpresa = InfoEmpresa.findOne({_id: '1'});
            const datosCompra = BitacoraCompras.findOne({_id: ticketId});
            const datosFin = DatosFinancieros.findOne({_id: '1'}, {fields: {iva: 1}});

            let ticketCompra = {
                id: ticketId,
                iva: datosFin.iva * 100,
                infoEmpresa: infoEmpresa,
                preciosPeticion: datosCompra.datosPeticion.precios,
                articuloDemos: datosCompra.apiDetalles.line_items[0],
                articuloPromo: datosCompra.apiDetalles.line_items[1],
                articuloSup: datosCompra.apiDetalles.line_items[2]
            };
            SSR.compileTemplate('ticketEmailTemplate', Assets.getText('emailTemplates/ticketCompra.html'));
            console.log('Enviar correo del ticketId ', ticketId);
            Email.send({
                to: 'j.vlt.mtz@gmail.com',
                from: 'demostradoras01@gmail.com',
                subject: 'Ticket Compra',
                html: SSR.render('ticketEmailTemplate', ticketCompra)
            });
        }
    }
});
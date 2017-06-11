/**
 * Created by Héctor on 08/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {_} from "meteor/underscore";
import {DatosFiscales} from "./collection";
import {Agencias} from "../agencias/collection.js";

const CAMPO_PROPIETARIO = ['propietario'];
const CAMPOS_DATOS_FISCALES = [
    'personaFisica',
    'rfc',
    'razonSocial',
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'email',
    'calle',
    'delMpio',
    'estado',
    'estadoId',
    'colonia',
    'numExt',
    'numInt',
    'codigoPostal',
];

export const insertarDatosFiscales = new ValidatedMethod({
    name: 'datosFiscales.insertarDatosFiscales',
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES).validator({
        clean: true,
        filter: false
    }),
    run(
        {
            personaFisica,
            rfc,
            razonSocial,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            calle,
            delMpio,
            estado,
            estadoId,
            colonia,
            numExt,
            numInt,
            codigoPostal,
        }
    ) {
       if (Meteor.isServer) {
           const agencia = Agencias.findOne({propietario: this.userId});
           return DatosFiscales.insert({
               propietario: agencia._id,
               personaFisica,
               rfc,
               razonSocial,
               nombre,
               apellidoPaterno,
               apellidoMaterno,
               email,
               calle,
               delMpio,
               estado,
               estadoId,
               colonia,
               numExt,
               numInt,
               codigoPostal,
           });
       }
    }
});

export const actualizarDatosFiscales = new ValidatedMethod({
    name: 'datosFiscales.actualizar',
    validate: DatosFiscales.simpleSchema().pick(CAMPOS_DATOS_FISCALES, CAMPO_PROPIETARIO).validator({
        clean: true,
        filter: false
    }),
    run(
        {
            propietario,
            personaFisica,
            rfc,
            razonSocial,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            email,
            calle,
            delMpio,
            estado,
            estadoId,
            colonia,
            numExt,
            numInt,
            codigoPostal,
        }
    ) {
        if (Meteor.isServer) {

            // PERSONA FÍSICA
            if (personaFisica === true) {
                return DatosFiscales.update({propietario: propietario}, {
                    $unset: {razonSocial: ''},
                    $set: {
                        personaFisica,
                        rfc,
                        email,
                        nombre,
                        apellidoPaterno,
                        apellidoMaterno,
                        calle,
                        delMpio,
                        estado,
                        estadoId,
                        colonia,
                        numExt,
                        numInt,
                        codigoPostal
                    }
                });
                // PERSONA MORAL
            } else {
                return DatosFiscales.update({propietario: propietario}, {
                    $unset: {
                        nombre: '',
                        apellidoPaterno: '',
                        apellidoMaterno: ''
                    }, $set: {
                        personaFisica,
                        rfc,
                        email,
                        razonSocial,
                        calle,
                        delMpio,
                        estado,
                        estadoId,
                        colonia,
                        numExt,
                        numInt,
                        codigoPostal
                    }
                });
            }

            /* // RESERVADO PARA AGREGAR LA DIRECCIÓN
            return DatosFiscales.update({
                propietario: agencia._id
            }, {
                $set: {
                    calle,
                    delMpio,
                    estado,
                    estadoId,
                    colonia,
                    numExt,
                    numInt,
                    codigoPostal,
                }
            })
             */;
        }
    }
});

/*
export const existeRFC = new ValidatedMethod({
    name: 'datosFiscales.existeRFC',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        rfc: {type: String}
    }).validator(),
    run({rfc}) {
        const resultado = DatosFiscales.findOne({_id: rfc});
        return resultado ? true : false;
    }
});
 */

const DATOS_FISCALES_METHODS = _.pluck([insertarDatosFiscales, actualizarDatosFiscales], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(DATOS_FISCALES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
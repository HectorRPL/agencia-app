import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Agencias} from "../agencias/collection";
import {TarjetasBancarias} from "../tarjetasBancarias/collection";
import {insertarCompra} from "../compras/bitacoraCompras/methods";
import {eliminarTarjeta} from "../tarjetasBancarias/methods";
import {Meteor} from "meteor/meteor";

var preciosSchema = new SimpleSchema({
    total: {type: Number, decimal: true},
    subtotal: {type: Number, decimal: true},
    importeiva: {type: Number, decimal: true},
    importeDescuento: {type: Number, decimal: true},
    subtotalDem: {type: Number, decimal: true},
    subtotalPro: {type: Number, decimal: true},
    subtotalSup: {type: Number, decimal: true},
    unidadDem: {type: Number, decimal: true},
    unidadPro: {type: Number, decimal: true},
    unidadSup: {type: Number, decimal: true},
    iva: {type: Number}
});

var numProductosSchema = new SimpleSchema({
    numDemos: {type: Number},
    numPromotor: {type: Number},
    numSupervisor: {type: Number},
    totalPersonal: {type: Number}
});

export const realizarCargo = new ValidatedMethod({
    name: 'conekta.realizarCargo',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para realizar una compra necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        apiTokenId: {type: String},
        carritoId: {type: String},
        numProductos: {type: numProductosSchema},
        precios: {type: preciosSchema},
    }).validator(),
    run({apiTokenId, carritoId, numProductos, precios}) {
        if (Meteor.isServer) {
            const agencia = Agencias.findOne({propietario: this.userId});
            const datosPeticion = {
                apiTokenId: apiTokenId,
                carritoId: carritoId,
                numProductos: numProductos,
                precios: precios
            };
            let resultCompra = {};
            try {
                resultCompra = ConektaUtils.comprar(datosPeticion, agencia);
            } catch (error) {
                insertarCompra.call({
                    apiRespuesta: error, exito: false,
                    datosPeticion: datosPeticion, agenciaId: agencia._id
                });
                throw new Meteor.Error(403, error.message_to_purchaser, error.code);
            }
            return insertarCompra.call({
                apiRespuesta: resultCompra, exito: true,
                datosPeticion: datosPeticion, agenciaId: agencia._id
            });
        }
    }
});

export const guardarTarjetaCompra = new ValidatedMethod({
    name: 'conekta.guardarTarjetaCompra',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para guardar una tarjeta bancaria necesitas iniciar sesión',
        reason: 'Usuario no loggeado',
    },
    validate: new SimpleSchema({
        apiTokenId: {type: String}
    }).validator(),
    run({apiTokenId}) {
        this.unblock();
        if (Meteor.isServer) {
            let result = {};
            const agencia = Agencias.findOne({propietario: this.userId});
            const user = Meteor.users.findOne({_id: agencia.propietario});
            try {
                result = ConektaUtils.crearClienteTarjeta(apiTokenId, agencia, user);
            } catch (e) {
                throw e
            }
            result.propietario = agencia._id;
            return TarjetasBancarias.insert(result);
        }

    }
});

export const agregarTarjeta = new ValidatedMethod({
    name: 'conekta.agregarTarjeta',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        apiTokenId: {type: String},
        apiClienteId: {type: String},
    }).validator(),
    run({apiTokenId, apiClienteId}) {
        if (Meteor.isServer) {
            const agencia = Agencias.findOne({propietario: this.userId});
            let result = {};
            try{
                result = ConektaUtils.agregarTarjeta(apiTokenId, apiClienteId);
            }catch (e){
                throw  e;
            }
            result.propietario = agencia._id;
            return TarjetasBancarias.insert(result);
        }
    }
});

export const borrarTarjeta = new ValidatedMethod({
    name: 'conekta.borrarTarjeta',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        id: {type: String},
        apiClienteId: {type: String},
    }).validator(),
    run({id, apiClienteId}) {
        if (Meteor.isServer) {
            try {
                ConektaUtils.eliminarTarjeta(apiClienteId);
            } catch (e) {
                throw  e
            }
            return eliminarTarjeta.call({id: id});
        }
    }
});

export const validarFechaExpiracion = new ValidatedMethod({
    name: 'conekta.validarFechaExpiracion',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        mesExpiracion: {type: String},
        anioExpiracion: {type: String},
    }).validator(),
    run({mesExpiracion, anioExpiracion}) {
        let fechaActual = new Date();
        let mesActual = fechaActual.getMonth() + 1;
        let anioActual = fechaActual.getFullYear() - 2000;
        mesExpiracion = Number.parseInt(mesExpiracion);
        anioExpiracion = Number.parseInt(anioExpiracion);
        let resultado = false;

        if (anioExpiracion > anioActual) {
            resultado = true;
        } else {
            if (anioExpiracion === anioActual && mesExpiracion === mesActual) {
                resultado = true;
            } else {
                resultado = false
            }
        }

        return resultado;
    }
});

const TARJETA_METHODS = _.pluck([realizarCargo, guardarTarjetaCompra, agregarTarjeta, borrarTarjeta, validarFechaExpiracion], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(TARJETA_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}









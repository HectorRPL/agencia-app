import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {Agencia} from '../agencia/collection';
import {TarjetaBancaria} from '../tarjetaBancaria/collection';
import {DatosFinancieros} from '../datosFinancieros/collection';
import {Meteor} from 'meteor/meteor';
import conekta from 'conekta/lib/conekta';

const MXN = 'MXN';
if (Meteor.isServer) {
    Meteor.startup(() => {
        conekta.api_key = 'key_nw7R3yrHUGFztkVCUc2DSw';
        conekta.api_version = '1.0.0';
        conekta.locale = 'es';
    });
}

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
        monto: {type: Number, decimal: true},
        numDemos: {type: Number},
        numPromotor: {type: Number},
        numSupervisor: {type: Number}
    }).validator(),
    run({apiTokenId, monto, numDemos, numPromotor, numSupervisor}) {
        if (Meteor.isServer) {
            const datosFinancieros = DatosFinancieros.findOne({_id: '1'});
            const agencia = Agencia.findOne({propietario: Meteor.userId});
            let cargo = {
                description: 'Contactos',
                amount: 2000,
                currency: MXN,
                reference_id: '',
                card: apiTokenId,
                details: {
                    name: agencia.nombre,
                    phone: agencia.telefono,
                    email: 'logan@x-men.org',
                    customer: {
                        logged_in: true
                    },
                    line_items: [
                        {
                            name: 'Demostrador(a)',
                            description: 'Imported From Mex.',
                            unit_price: datosFinancieros.precioDemos,
                            quantity: numDemos,
                            sku: '1',
                            category: 'contacto'
                        }, {
                            name: 'Promotor(a)',
                            description: 'Imported From Mex.',
                            unit_price: datosFinancieros.precioPromotor,
                            quantity: numPromotor,
                            sku: '2',
                            category: 'contacto'
                        }, {
                            name: 'Supervisor(a)',
                            description: 'Imported From Mex.',
                            unit_price: datosFinancieros.precioSupervisor,
                            quantity: numSupervisor,
                            sku: '3',
                            category: 'contacto'
                        }
                    ]
                },
            };
            try {
                let crearCargo = Meteor.wrapAsync(conekta.Charge.create, conekta.Charge);
                let result = crearCargo(cargo);
                return result.toObject();
            } catch (error) {
                throw new Meteor.Error(error.http_code, error.message_to_purchaser, error.code);
            }
        }
    }
});

export const guardarTarjeta = new ValidatedMethod({
    name: 'conekta.guardarTarjeta',
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
        if (Meteor.isServer) {
            this.unblock();
            const agencia = Agencia.findOne({propietario: Meteor.userId});
            let crearCliente = Meteor.wrapAsync(conekta.Customer.create, conekta.Customer);
            const datosCliente = {
                name: agencia.nombre,
                email: 'james.howlett@forces.gov',
                phone: agencia.telefono,
                cards: [apiTokenId]
            };
            let tarjetas = [];
            try {
                const result = crearCliente(datosCliente);
                const apiCliente = result.toObject();
                tarjetas = apiCliente.cards;
            } catch (error) {
                throw new Meteor.Error(error.http_code, error.message_to_purchaser, error.code);
            }
            for (var i = 0; i < tarjetas.length; i++) {
                let tarjetaConekta = tarjetas[i];
                let tarjetaTemp = {
                    nombre: tarjetaConekta.name,
                    tipoTarjeta: tarjetaConekta.brand,
                    numTarjeta: tarjetaConekta.last4,
                    mesExpiracion: tarjetaConekta.exp_month,
                    anioExpiracion: tarjetaConekta.exp_year,
                    apiTarjetaId: tarjetaConekta.id,
                    apiTokenId: apiTokenId,
                    apiClienteId: tarjetaConekta.customer_id,
                    propietario: agencia._id,
                };
                return TarjetaBancaria.insert(tarjetaTemp);
            }
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











import {Meteor}            from 'meteor/meteor';
import {_}                 from 'meteor/underscore';
import {ValidatedMethod}   from 'meteor/mdg:validated-method';
import {SimpleSchema}      from 'meteor/aldeed:simple-schema';
import {LoggedInMixin}     from 'meteor/tunifight:loggedin-mixin';
import {DDPRateLimiter}    from 'meteor/ddp-rate-limiter';

import {OrdenesCompra}     from './collection.js';
import {TarjetaBancaria}   from '../tarjetaBancaria/collection.js';
import {Creditos}          from '../creditos/collection.js';

const CAMPOS_SIN_IDS = ['cantidad', 'precioUnitario', 'importe', 'subtotal', 'iva', 'total'];
const CAMPOS_CON_IDS = ['_id', 'propietario', 'cantidad', 'precioUnitario', 'importe', 'subtotal', 'subtotal', 'iva', 'total'];


/*export const insert = new ValidatedMethod({
    name: 'ordenesCompra.insert',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para modificar estos datos necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: OrdenesCompra
        .simpleSchema()
        .pick(CAMPOS_SIN_IDS)
        .validator({
            clean: true,
            filter: false
        }),
    run({
        cantidad,
        precioUnitario,
        importe,
        subtotal,
        iva,
        total
    }) {
        const tarjetaActual =
            TarjetaBancaria.findOne({
                propietario: thi.userId
            });
        if (tarjetaActual) {
            //Primro se almacena la orden de compra con exito en falso.
            const ordenCompra = {
                cantidad,
                precioUnitario,
                importe,
                subtotal,
                iva,
                total,
                tipoTarjeta: tarjetaActual.tipoTarjeta,
                numeroTarjetaBloque4: tarjetaActual.numeroTarjetaBloque4,
                nombreApellidos: tarjetaActual.nombreApellidos,
            };
            OrdenesCompra.insert(ordenCompra, (err) => {
                if (err) {

                } else {
                    const creditoActual = Creditos.findOne({
                        propietario: this.userId
                    });
            Creditos.update(credito._id, {
                $set: {
                    disponible: (cantidad + creditoActual.disponible)
                }
            });
        }
        })
            ;
        } else {
            //Mteror.error(); No tienes tarjeta
        }

    }
});
*/
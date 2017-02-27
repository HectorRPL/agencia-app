/**
 * Created by jvltmtz on 1/02/17.
 */
import {Meteor} from "meteor/meteor";
import conekta from "conekta/lib/conekta";
import {Postulaciones} from "../postulaciones/collection";
import {ProductosCarrito} from "../compras/productosCarrito/collection";
import {_} from "meteor/underscore";
const MONEDA = 'MXN';

if (Meteor.isServer) {
    Meteor.startup(() => {
        const conektaConfig = Meteor.settings.private.conektaConfig;
        conekta.api_key = conektaConfig.key;
        conekta.api_version = conektaConfig.version;
        conekta.locale = conektaConfig.idioma;
    });
}

ConektaUtils = {
    comprar(datosPeticion, agencia){

        const compraConekta = this.crearObjectoCompra(datosPeticion, agencia);
        try {
            let crearCargo = Meteor.wrapAsync(conekta.Charge.create, conekta.Charge);
            let result = crearCargo(compraConekta);
            Meteor.defer(()=> {
                this.actualizarPostulaciones(datosPeticion.carritoId);
            });
            return result.toObject();
        } catch (error) {
            throw error;
        }
    },

    crearObjectoCompra(datosPeticion, agencia){

        const cargo = {
            description: 'Contactos',
            amount: 2000,
            currency: MONEDA,
            reference_id: agencia._id,
            card: datosPeticion.apiTokenId,
            details: {
                name: agencia.nombre,
                phone: agencia.telefono,
                email: agencia.correoElectronico,
                customer: {
                    logged_in: true
                },
                line_items: [
                    {
                        name: 'Demostrador(a)',
                        description: 'Contacto Perfil Demostrador(a).',
                        unit_price: datosPeticion.precios.unidadDem,
                        quantity: datosPeticion.numProductos.numDemos,
                        sku: '1',
                        category: 'contacto'
                    }, {
                        name: 'Promotor(a)',
                        description: 'Contacto Perfil Promotor(a).',
                        unit_price: datosPeticion.precios.unidadPro,
                        quantity: datosPeticion.numProductos.numPromotor,
                        sku: '2',
                        category: 'contacto'
                    }, {
                        name: 'Supervisor(a)',
                        description: 'Contacto Perfil Supervisor(a).',
                        unit_price: datosPeticion.precios.unidadSup,
                        quantity: datosPeticion.numProductos.numSupervisor,
                        sku: '3',
                        category: 'contacto'
                    }
                ]
            },
        };
        return cargo;
    },

    actualizarPostulaciones(carritoId){
        let idsPost = [];
        const productos = ProductosCarrito.find({carritoId: carritoId},
            {fields: {postulacionId: 1}});
        productos.forEach((producto)=> {
            idsPost.push(producto.postulacionId);
        });
        let postulacionesBulk = Postulaciones.rawCollection().initializeUnorderedBulkOp();
        postulacionesBulk.find({_id: {$in: idsPost}}).update({$set: {estado: 2, fechaSeleccion: new Date()}});
        const execute = Meteor.wrapAsync(postulacionesBulk.execute, postulacionesBulk);
        try {
            execute();
            this.limpiarProductos(carritoId);
        } catch (error) {
            console.log(error);
            console.log(`Error al actualizar los productos del carritoId: ${carritoId} `, idsPost);
        }
    },

    limpiarProductos(carritoId){
        ProductosCarrito.remove({carritoId: carritoId})
    },

    crearClienteTarjeta(apiTokenId, agencia){
        let crearCliente = Meteor.wrapAsync(conekta.Customer.create, conekta.Customer);
        const datosCliente = {
            name: agencia.nombre,
            email: agencia.correoElectronico,
            phone: agencia.telefono,
            cards: [apiTokenId]
        };
        try {
            const result = crearCliente(datosCliente);
            const apiCliente = result.toObject();
            if (apiCliente.cards.length > 0) {
                return this.crearObjetoTarjeta(apiCliente.cards[0], apiTokenId);
            }
        } catch (error) {
            throw new Meteor.Error(error.http_code, error.message_to_purchaser, error.code);
        }
    },

    eliminarTarjeta(apiClienteId){
        const cliente = this.buscarCliente(apiClienteId);
        const tarjeta = this.buscarTarjeta(cliente.cards);
        let eliminarTarjeta =  Meteor.wrapAsync(tarjeta.delete, tarjeta);
        try{
            let result = eliminarTarjeta();
            return result.toObject();
        } catch (error) {
            throw new Meteor.Error(error.http_code, error.message_to_purchaser, error.code);
        }
    },

    agregarTarjeta(apiTokenId, apiClienteId){
        const cliente = this.buscarCliente(apiClienteId);
        let crearTarjeta = Meteor.wrapAsync(cliente.createCard, cliente);
        try {
            let result = crearTarjeta({token: apiTokenId});
            return this.crearObjetoTarjeta(result.toObject(), apiTokenId);
        } catch (error) {
            throw new Meteor.Error(error.http_code, error.message_to_purchaser, error.code);
        }
    },

    buscarCliente(apiClienteId){
        let buscarCliente = Meteor.wrapAsync(conekta.Customer.find, conekta.Customer);
        try {
            const result = buscarCliente(apiClienteId);
            return result;
        } catch (error) {
            throw new Meteor.Error(error.http_code, error.message_to_purchaser, error.code);
        }
    },

    buscarTarjeta(tarjetas, tarjetaId){
        const result = _.find(tarjetas, (tarjeta)=>{
            return tarjeta.id === tarjetaId;
        });
        return result;
    },

    crearObjetoTarjeta(tarjetaConekta, apiTokenId){
        const tarjetaTemp = {
            nombre: tarjetaConekta.name,
            tipoTarjeta: tarjetaConekta.brand,
            numTarjeta: tarjetaConekta.last4,
            mesExpiracion: tarjetaConekta.exp_month,
            anioExpiracion: tarjetaConekta.exp_year,
            apiTarjetaId: tarjetaConekta.id,
            apiTokenId: apiTokenId,
            apiClienteId: tarjetaConekta.customer_id
        };

        return tarjetaTemp;
    }

};

/**
 * Created by jvltmtz on 4/11/16.
 */
import {Meteor} from 'meteor/meteor';
import {ProductosCarrito} from '../collection';
import {Postulaciones} from '../../../postulaciones/collection';
import {Candidatos} from '../../../candidatos/collection';
import {Puestos} from '../../../puestos/collection';
import {Vacantes} from '../../../vacantes/collection';
import {Tiendas} from '../../../tiendas/collection';
import {Cadenas} from '../../../cadenas/collection';

if (Meteor.isServer) {
    Meteor.publish('productosCarrito.count.candidatos', function (carritoId) {
        Counts.publish(this, `count.candidatos.carrito.${carritoId.carritoId}`,
            ProductosCarrito.find(carritoId));

    });

    Meteor.publish('productosCarrito.numDemostradoras', function (carritoId) {
        const selector = {$and: [carritoId, {puestoId: 1}]};
        Counts.publish(this, `count.productos.carrito.demostradoras.${carritoId.carritoId}`,
            ProductosCarrito.find(selector));

    });

    Meteor.publish('productosCarrito.numPromotores', function (carritoId) {
        const selector = {$and: [carritoId, {puestoId: 2}]};
        Counts.publish(this, `count.productos.carrito.promotores.${carritoId.carritoId}`,
            ProductosCarrito.find(selector));
    });

    Meteor.publish('productosCarrito.numSupervisores', function (carritoId) {
        const selector = {$and: [carritoId, {puestoId: 3}]};
        Counts.publish(this, `count.productos.carrito.supervisores.${carritoId.carritoId}`,
            ProductosCarrito.find(selector));

    });

    Meteor.publishComposite('productosCarritos.mostrar', function (carritoId) {
        return {
            find: function () {
                return ProductosCarrito.find(carritoId);
            },
            children: [
                {
                    find: function (producto) {
                        return Postulaciones.find({_id: producto.postulacionId});
                    },
                    children: [
                        {
                            find: function (postulacion) {
                                return Candidatos.find({_id: postulacion.candidatoId}, {
                                    fields: {
                                        nombre: 1,
                                        apellidos: 1
                                    }
                                });
                            }
                        },
                        {
                            find: function (postulacion) {
                                return Vacantes.find({_id: postulacion.vacanteId}, {
                                    fields: {
                                        marca: 1
                                    }
                                });
                            }
                        },
                        {
                            find: function (postulacion) {
                                return Tiendas.find({_id: postulacion.tiendaId});
                            },
                            children:[
                                {
                                    find: function (tienda) {
                                        return Cadenas.find({_id: tienda.cadenaId});
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    find: function (producto) {
                        console.log('puestoId ', producto.puestoId);
                        console.log('Puesto ', Puestos.findOne({_id: producto.puestoId}));
                        return Puestos.find({_id: producto.puestoId});
                    }
                }
            ]
        }
    });
}
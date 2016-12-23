/**
 * Created by jvltmtz on 7/10/16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Postulaciones} from '../../postulaciones/collection'


if (Meteor.isServer) {

    Meteor.publish('tiendas.numPostulados', function (tiendaId) {
        Counts.publish(this, `count.postulados.tienda.${tiendaId.tiendaId}`,
            Postulaciones.find(tiendaId), {noReady: true});
    });

    Meteor.publish('tiendas.numPostuladosNuevos', function (tiendaId) {
        Counts.publish(this, `count.postulados.nuevos.tienda.${tiendaId.tiendaId}`,
            Postulaciones.find({
                $and: [tiendaId, {estado: 1}, {postVistoAgencia: false}]
            }), {noReady: true});
    });

    Meteor.publish('tiendas.numSeleccionados', function (tiendaId) {
        Counts.publish(this, `count.seleccionados.tienda.${tiendaId.tiendaId}`,
            Postulaciones.find({$and: [tiendaId, {estado: 2}]}), {noReady: true});
    });

    Meteor.publish('tiendas.numSeleccionadosNuevos', function (tiendaId) {
        Counts.publish(this, `count.seleccionados.nuevos.tienda.${tiendaId.tiendaId}`,
            Postulaciones.find({
                $and: [tiendaId, {estado: 2}, {selecVistoAgencia: false}]
            }), {noReady: true});
    });
}
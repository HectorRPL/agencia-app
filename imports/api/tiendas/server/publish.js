/**
 * Created by jvltmtz on 7/10/16.
 */
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {Postulaciones} from '../../postulaciones/collection'


if (Meteor.isServer) {
    Meteor.publish('tiendas.countNuevasPostulaciones', function (tiendaId) {
        let selector = {$and: [tiendaId, {estado: 1}, {vistoAgencia: false}]};
        return Postulaciones.find(selector);
    });
}
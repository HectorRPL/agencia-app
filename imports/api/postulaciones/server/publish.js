/**
 * Created by jvltmtz on 23/08/16.
 */
import {Meteor} from 'meteor/meteor';
import {Postulaciones} from '../collection';
import {Vacantes} from '../../vacantes/collection';
import {Counts} from 'meteor/tmeasday:publish-counts';


if (Meteor.isServer) {

    Meteor.publish('postulaciones.countPostulaciones', function (vacanteId) {
        let selector = {$and: [vacanteId, {estado: 1}]};
        Counts.publish(this, 'numPostulaciones', Postulaciones.find(selector));
    });

    Meteor.publish('postulaciones.countSeleccionados', function (vacanteId) {
        let selector = {$and: [vacanteId, {estado: 2}]};
        Counts.publish(this, 'numSeleccionados', Postulaciones.find(selector));
    });

}

/**
 * Created by jvltmtz on 7/12/16.
 */

import {Meteor} from "meteor/meteor";
import {BitacoraCompras} from '../collection';

if (Meteor.isServer) {
    Meteor.publish('bitacoraCompras.respuestaApi', function (compraId) {
        return BitacoraCompras.find(compraId, {
            fields: {
                apiRespuesta: 1,
                apiDetalles: 1
            }
        });
    });
}
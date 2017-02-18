/**
 * Created by jvltmtz on 7/12/16.
 */

import {Meteor} from "meteor/meteor";
import {BitacoraCompras} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('bitacoraCompras.respuestaApi', function (id) {
        return BitacoraCompras.find(id, {
            fields: {
                apiRespuesta: 1,
                apiDetalles: 1,
                datosPeticion: 1
            }
        });
    });
}
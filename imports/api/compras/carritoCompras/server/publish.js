/**
 * Created by jvltmtz on 4/11/16.
 */

import {Meteor} from "meteor/meteor";
import {CarritoCompras} from "../collection";
import {Agencias} from "../../../agencias/collection";

if (Meteor.isServer) {
    Meteor.publish('carritoCompras.obtenerDatos', function () {
        const agencia = Agencias.findOne({propietario: this.userId});
        return CarritoCompras.find({propietario: agencia._id});

    });
}
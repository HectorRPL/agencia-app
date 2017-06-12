/**
 * Created by jvltmtz on 15/09/16.
 */
import {Meteor} from "meteor/meteor";
import {Direcciones} from "../collection";
import {Agencias} from "../../agencias/collection";

if (Meteor.isServer) {
    Meteor.publish('direcciones.agencia', function () {
        const agencia = Agencias.findOne({propietario: this.userId});
        const selector = {
            propietario: agencia._id
        };
        return Direcciones.find(selector);
    });
}
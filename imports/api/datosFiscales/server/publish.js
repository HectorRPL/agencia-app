/**
 * Created by Héctor on 08/06/2017.
 */
import {Meteor} from "meteor/meteor";
import {DatosFiscales} from "../collection";
import {Agencias} from "../../agencias/collection"

if (Meteor.isServer) {
    Meteor.publish('datosFiscales.agencia', function () {
        const agencia = Agencias.findOne({propietario: this.userId});
        const selector = {propietario: agencia._id};
        return DatosFiscales.find(selector);
    });
}
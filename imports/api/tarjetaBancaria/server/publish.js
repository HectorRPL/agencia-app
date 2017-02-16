import {Meteor} from "meteor/meteor";
import {TarjetaBancaria} from "../collection";
import {Agencias} from "../../agencias/collection";

if (Meteor.isServer) {
    Meteor.publish('tarjetaBancaria', function() {
        const agencia = Agencias.findOne({propietario: this.userId});
        const selector = {
            propietario: agencia._id
        };

        Counts.publish(this, 'numTarjetas', TarjetaBancaria.find(selector), {noReady:true});

        return TarjetaBancaria.find(selector, {
            fields: {
                propietario: 0,
                nombre: 0
            }
        });
    });
}

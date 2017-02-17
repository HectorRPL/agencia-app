import {Meteor} from "meteor/meteor";
import {TarjetasBancarias} from "../collection";
import {Agencias} from "../../agencias/collection";

if (Meteor.isServer) {
    Meteor.publish('tarjetasBancarias', function() {
        const agencia = Agencias.findOne({propietario: this.userId});
        const selector = {
            propietario: agencia._id
        };

        Counts.publish(this, 'numTarjetas', TarjetasBancarias.find(selector), {noReady:true});

        return TarjetasBancarias.find(selector, {
            fields: {
                propietario: 0,
                nombre: 0
            }
        });
    });
}

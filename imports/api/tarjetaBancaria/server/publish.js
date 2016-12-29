import {Meteor} from "meteor/meteor";
import {TarjetaBancaria} from "../collection";
import {Agencia} from "../../agencia/collection";

if (Meteor.isServer) {
    Meteor.publish('tarjetaBancaria', function() {
        const agencia = Agencia.findOne({propietario: this.userId});
        const selector = {
            propietario: agencia._id
        };

        return TarjetaBancaria.find(selector, {
            fields: {
                apiTokenId: 0,
                apiTarjetaId: 0,
                apiClienteId: 0,
                propietario: 0,
                nombre: 0
            }
        });
    });
}

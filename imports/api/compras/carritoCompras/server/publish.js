/**
 * Created by jvltmtz on 4/11/16.
 */

import {Meteor} from "meteor/meteor";
import {CarritoCompras} from '../collection';
import {Agencia} from '../../../agencia/collection';

if(Meteor.isServer){
    Meteor.publish('carritoCompras.obtenerDatos', function () {
        const agencia = Agencia.findOne({propietario: this.userId});
        return CarritoCompras.find({propietario: agencia._id});

    });
}
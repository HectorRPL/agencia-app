/**
 * Created by jvltmtz on 3/11/16.
 */
import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {CarritoCompras} from "./collection.js";
import {_} from 'meteor/underscore';

export const crear = new ValidatedMethod({
    name: 'carritoCompras.crear',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para crear el carrito necesitas registrarte.', //Optional
        reason: 'Usuario no logeado' //Optional
    },
    run(){
        if(Meteor.isServer){
            const selector = {propietario: agencia._id};
            const producto = CarritoCompras.insert(selector);
        }
    }
});

/**
 * Created by jvltmtz on 13/11/16.
 */
import {Meteor} from "meteor/meteor";
import {DatosFinancieros} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('datosFinancieros', (filter) => {
        return DatosFinancieros.find(filter);
    });
}
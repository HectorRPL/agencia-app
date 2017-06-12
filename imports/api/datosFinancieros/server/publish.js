/**
 * Created by jvltmtz on 13/11/16.
 */
import {Meteor} from "meteor/meteor";
import {DatosFinancieros} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('datosFinancieros', () => {
        if (this.userId) {
            const  selector = {_id: '1'};
            return DatosFinancieros.find(selector);
        } else {
            this.ready;
        }
    });
}
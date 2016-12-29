import {Meteor} from "meteor/meteor";
import {Puestos} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('puestos', function () {
        const selector = {};
        return Puestos.find(selector);
    });
}

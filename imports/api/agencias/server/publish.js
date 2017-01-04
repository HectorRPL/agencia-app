import {Meteor} from "meteor/meteor";
import {Agencias} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('agencias', function () {

        const selector = {
            propietario: this.userId
        };
        return Agencias.findOne(selector);
    });
}

import {Meteor} from "meteor/meteor";
import {Agencia} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('angencia', function () {

        const selector = {
            propietario: this.userId
        };
        return Agencia.findOne(selector);
    });
}

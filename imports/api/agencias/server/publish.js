import {Meteor} from "meteor/meteor";
import {Agencias} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('agencias', function () {
        if (this.userId) {
            const selector = {propietario: this.userId};
            return Agencias.find(selector);
        } else {
            this.ready
        }
    });
}
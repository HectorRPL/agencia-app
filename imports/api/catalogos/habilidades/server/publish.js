import {Meteor} from "meteor/meteor";
import {Habilidades} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('habilidades', () => {
        const selector = {};
        return Habilidades.find(selector);
    });
}

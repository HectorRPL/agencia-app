import {Meteor} from "meteor/meteor";
import {Escuelas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('escuelas', () => {
        const selector = {};
        return Escuelas.find(selector);
    });
}

import {Meteor} from "meteor/meteor";
import {Experiencias} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('experiencias', () => {
        const selector = {};
        return Experiencias.find(selector);
    });
}

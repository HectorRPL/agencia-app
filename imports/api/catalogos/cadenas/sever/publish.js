import {Meteor} from "meteor/meteor";
import {Cadenas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('cadenas', () => {
        const selector = {};
        return Cadenas.find(selector);
    });
}

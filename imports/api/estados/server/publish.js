import {Meteor} from "meteor/meteor";
import {Estados} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('estados', () => {
        const selector = {};
        return Estados.find(selector);
    });
}

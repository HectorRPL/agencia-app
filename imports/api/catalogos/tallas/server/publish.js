import {Meteor} from "meteor/meteor";
import {Tallas} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('tallas', () => {
        const selector = {};
        return Tallas.find(selector);
    });
}

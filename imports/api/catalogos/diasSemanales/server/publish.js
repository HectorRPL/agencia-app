/**
 * Created by Héctor on 28/10/2016.
 */
import {Meteor} from "meteor/meteor";
import {DiasSemanales} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('diasSemanales', () => {
        const selector = {};
        return DiasSemanales.find(selector);
    });
}

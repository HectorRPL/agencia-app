/**
 * Created by jvltmtz on 15/12/16.
 */
import {Meteor} from "meteor/meteor";
import {InfoEmpresa} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('infoEmpresa', () => {
        const selector = {_id: '1'};
        return InfoEmpresa.find(selector);
    });
}
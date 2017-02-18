/**
 * Created by jvltmtz on 3/11/16.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const CarritoCompras = new Mongo.Collection('carritoCompras');

CarritoCompras.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});


const Schema = {};
Schema.carritoCompras = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true,
    }
});

CarritoCompras.attachSchema(Schema.carritoCompras);
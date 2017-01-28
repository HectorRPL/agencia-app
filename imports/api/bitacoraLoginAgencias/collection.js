/**
 * Created by Héctor on 16/01/2017.
 */
import {Mongo} from 'meteor/mongo';
export const BitacoraLoginAgencias = new Mongo.Collection('bitacoraLoginAgencias');

BitacoraLoginAgencias.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.bitacoraLoginAgencias = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    fechaLogin: {
        type: Date
    },
    fechaLogout:{
        type: Date,
        optional: true
    },
    conexion:{
        type: Object,
        blackbox: true
    },
    estadoRegistro:{
        type: String
    },
    tipoLogin:{
        type:String
    }
});

BitacoraLoginAgencias.attachSchema(Schema.bitacoraLoginAgencias);
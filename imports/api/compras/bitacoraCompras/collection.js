/**
 * Created by jvltmtz on 3/11/16.
 */
import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import operacionesCompra from './operacionesCompra';

class BitacoraComprasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        if(doc.compraExito){
            operacionesCompra.afterInsertBitacoraCompras(doc);
        }
        return result;
    }

}


export const BitacoraCompras = new BitacoraComprasCollection('bitacoraCompras');




BitacoraCompras.deny({
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


Schema.bitacoraCompras = new SimpleSchema({
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
    },
    compraExito:{
        type: Boolean,
        defaultValue: true
    },
    apiRespuesta : {
        type: Object,
        blackbox: true,
    },
    apiMetodoPago : {
        type: Object,
        blackbox: true,
        optional: true
    },
    apiDetalles : {
        type: Object,
        blackbox: true,
        optional: true
    },
    tokenPeticion : {
        type: String
    }
});

BitacoraCompras.attachSchema(Schema.bitacoraCompras);
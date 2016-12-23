/**
 * Created by jvltmtz on 3/11/16.
 */
import { Mongo } from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Postulaciones} from '../../postulaciones/collection';
import {Puestos} from '../../puestos/collection';

export const ProductosCarrito = new Mongo.Collection('productosCarrito');

ProductosCarrito.deny({
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
Schema.productosCarrito = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    carritoId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    postulacionId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    puestoId:{
        type: Number,
        denyUpdate: true
    }
});

ProductosCarrito.attachSchema(Schema.productosCarrito);

ProductosCarrito.helpers({
    postulacion(){
        return Postulaciones.findOne({_id: this.postulacionId});
    },
    puesto(){
        return Puestos.findOne({_id: this.puestoId});
    }
});
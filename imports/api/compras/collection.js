import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class OrdenesCompraCollection extends Mongo.Collection {
    insert(doc, callback) {
            const result = super.insert(doc, callback);
            return result;
        }
        // update(doc, callback) {
        //   const result = super.update(doc, callback);
        //   return result;
        // }
        // remove(doc, callback) {
        //   const result = super.remove(doc, callback);
        //   return result;
        // }
}

export const OrdenesCompra = new OrdenesCompraCollection('ordenesCompra');

OrdenesCompra.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

const Schema = {};
Schema.ordenesCompra = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
    },
    cantidad: {
        type: Number,
        min: 1,
        max: 3,
    },
    precioUnitario: {
        type: Number,
    },
    importe: {
        type: Number,
    },
    subtotal: {
        type: Number,
    },
    iva: {
        type: Number,
    },
    total: {
        type: Number,
    },
    tipoTarjeta:{
      type:String
    },
    numeroTarjetaBloque4: {
      type: String,
      regEx: /^[0-9]{4}$/,
      max : 4,
      min : 4
    },
    nombreApellidos: {
      type: String,
      max : 30,
      min : 1,
      regEx: /^[a-zA-Z-ñáéíóú\s]+$/
    },
    exito:{
      type:Boolean,
      defaultValue:false,
    }
});

OrdenesCompra.attachSchema(Schema.ordenesCompra);

import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

class TarjetasBancariasCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        return result;
    }

    update(doc, callback) {
        const result = super.update(doc, callback);
        return result;
    }

    remove(doc, callback) {
        const result = super.remove(doc, callback);
        return result;
    }

}

export const TarjetasBancarias = new TarjetasBancariasCollection('tarjetasBancarias');

TarjetasBancarias.deny({
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
Schema.tarjetasBancarias = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true
    },
    nombre: {
        type: String,
        max: 30,
        min: 1,
        regEx: /^[a-zA-Z-ñáéíóú\s]+$/
    },
    tipoTarjeta: {
        type: String
    },
    numTarjeta: {
        type: String,
        regEx: /^[0-9]{4}$/,
        max: 4,
        min: 4
    },
    mesExpiracion: {
        type: String,
        regEx: /^[0-9]{2}$/,
        max: 2,
        min: 2
    },
    anioExpiracion: {
        type: String,
        regEx: /^[0-9]{2}$/,
        max: 2,
        min: 2
    },
    apiTarjetaId: {
        type: String
    },
    apiTokenId: {
        type: String
    },
    apiClienteId: {
        type: String
    }
});

TarjetasBancarias.attachSchema(Schema.tarjetasBancarias);

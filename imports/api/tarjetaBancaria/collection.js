import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class TarjetaBancariaCollection extends Mongo.Collection {
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

export const TarjetaBancaria = new TarjetaBancariaCollection('tarjetaBancaria');

TarjetaBancaria.deny({
  insert() {return true;},
  update() {return true;},
  remove() {return true;}
});

  const Schema = {};
  Schema.tarjetaBancaria = new SimpleSchema ({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    propietario:  {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      denyUpdate: true
    },
    nombreApellidos: {
      type: String,
      max : 30,
      min : 1,
      regEx: /^[a-zA-Z-ñáéíóú\s]+$/
    },
    tipoTarjeta: {
      type: String
    },
    numeroTarjetaBloque1: {
      type: String,
      max : 4,
      min : 4
    },
    numeroTarjetaBloque2: {
      type: String,
      regEx: /^[0-9]{4}$/,
      max : 4,
      min : 4
    },
    numeroTarjetaBloque3: {
      type: String,
      regEx: /^[0-9]{4}$/,
      max : 4,
      min : 4
    },
    numeroTarjetaBloque4: {
      type: String,
      regEx: /^[0-9]{4}$/,
      max : 4,
      min : 4
    },
    fechaExpiracionMes: {
      type: String,
      regEx: /^[0-9]{2}$/,
      max : 2,
      min : 2
    },
    fechaExpiracionAnio: {
      type: String,
      regEx: /^[0-9]{2}$/,
      max : 2,
      min : 2
    },
    codigoSeguridad: {
      type: String,
      regEx: /^[0-9]{3}$/,
      max : 3,
      min : 3
    }
  });

  TarjetaBancaria.attachSchema(Schema.tarjetaBancaria);

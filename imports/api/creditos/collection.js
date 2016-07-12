import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class CreditosCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    return result;
  }
  update(doc, callback) {
    const result = super.update(doc, callback);
    return result;
  }
  // remove(doc, callback) {
  //   const result = super.remove(doc, callback);
  //   return result;
  // }

}

export const Creditos = new CreditosCollection('creditos');

Creditos.deny({
  insert() {return true;},
  update() {return true;},
  remove() {return true;}
});

  const Schema = {};
  Schema.creditos = new SimpleSchema ({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    },
    propietario:  {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      denyUpdate: true
    },
    fechaCreacion: {
      type: Date,
      defaultValue: new Date(),
    },
    disponible: {
      type: Number,
      min : 1,
      max : 3,
    },
    usados: {
      type: Number,
      min : 1,
      max : 3,
    }
  });

  Creditos.attachSchema(Schema.creditos);

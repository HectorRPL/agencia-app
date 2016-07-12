import { Mongo } from 'meteor/mongo';

export const Paquetes = new Mongo.Collection('paquetes');

// Paquetes.allow({
//   insert(userId, paquete) {
//     return userId && paquete.propietario === userId;
//   },
//   update(userId, paquete, fields, modifier) {
//     return userId && paquete.propietario === userId;
//   },
//   remove(userId, paquete) {
//     return userId && paquete.propietario === userId;
//   }
// });

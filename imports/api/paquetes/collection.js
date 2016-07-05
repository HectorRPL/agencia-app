import { Mongo } from 'meteor/mongo';

export const Paquetes = new Mongo.Collection('paquetes');

// Paquetes.allow({
//   insert(userId, paquete) {
//     return userId && paquete.owner === userId;
//   },
//   update(userId, paquete, fields, modifier) {
//     return userId && paquete.owner === userId;
//   },
//   remove(userId, paquete) {
//     return userId && paquete.owner === userId;
//   }
// });

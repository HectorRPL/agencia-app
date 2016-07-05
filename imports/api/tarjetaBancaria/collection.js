import { Mongo } from 'meteor/mongo';

export const TarjetaBancaria = new Mongo.Collection('tarjetaBancaria');

TarjetaBancaria.allow({
  insert(userId, tarjetaBancaria) {
    return userId && tarjetaBancaria.owner === userId;
  },
  update(userId, tarjetaBancaria, fields, modifier) {
    return userId && tarjetaBancaria.owner === userId;
  },
  remove(userId, tarjetaBancaria) {
    return userId && tarjetaBancaria.owner === userId;
  }
});

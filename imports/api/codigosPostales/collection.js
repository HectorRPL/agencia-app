import { Mongo } from 'meteor/mongo';
export const CodigosPostales = new Mongo.Collection('codigosPostales');

CodigosPostales.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

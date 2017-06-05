import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Direcciones} from "../direcciones/collection";

export const Candidatos = new Mongo.Collection('candidatos');

Candidatos.deny({
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


Candidatos.attachSchema(Schema.candidato);

Candidatos.helpers({
    direccion(){
        return Direcciones.findOne({propietario: this._id});
    },
    datosContacto(){
        console.log('asdadasd', Meteor.users.findOne({_id: this.propietario}));
        return Meteor.users.findOne({_id: this.propietario});
    }
});
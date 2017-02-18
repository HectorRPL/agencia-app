import {Mongo} from "meteor/mongo";
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
    }
});
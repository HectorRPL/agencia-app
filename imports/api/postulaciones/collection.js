/**
 * Created by jvltmtz on 16/08/16.
 */
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import postulacionesCounts from './postulacionesCounts';
import {Candidatos}  from '../candidatos/collection'
import {Perfiles}  from '../perfiles/collection'
import {Direcciones}  from '../direcciones/collection'

class PostulacionesCollection extends Mongo.Collection {
    update(selector, modifier) {
        const result = super.update(selector, modifier);
        postulacionesCounts.afterUpdatePostulacion(selector, modifier);
        return result;
    }

}

export const Postulaciones = new PostulacionesCollection('postulaciones');

Postulaciones.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

const Schema = {};
Schema.postulaciones = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    vacanteId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    tiendaId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    candidatoId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    estado: {
        type: Number,
    },
    postVistoCandidato: {
        type: Boolean,
        defaultValue: false,
    },
    postVistoAgencia: {
        type: Boolean,
        defaultValue: false,
    },
    selecVistoCandidato: {
        type: Boolean,
        defaultValue: false,
    },
    selecVistoAgencia: {
        type: Boolean,
        defaultValue: false,
    },
    fechaPostulacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true,
    },
    fechaSeleccion: {
        type: Date,
        optional: true,
        denyUpdate: true,
    }
});

Postulaciones.attachSchema(Schema.postulaciones);

Postulaciones.helpers({
    candidato(){
        return Candidatos.findOne({_id: this.candidatoId});
    },
    perfilLaboral(){
        return Perfiles.findOne({candidatoId: this.candidatoId});
    },
    direccionCandidato(){
        return Direcciones.findOne({propietario: this.candidatoId});
    }

});





import {Mongo} from 'meteor/mongo';
import {Puestos} from '../puestos/collection';
import {Escuelas} from '../escuelas/collection';
import {Experiencias} from '../experiencias/collection';
import {Habilidades} from '../habilidades/collection';

export const Perfiles = new Mongo.Collection('perfiles');

Perfiles.deny({
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

Perfiles.helpers({
    puesto(){
        return Puestos.findOne({_id: this.puestoId});
    },
    escolaridad(){
        return Escuelas.findOne({_id: this.escolaridadId});
    },
    experienciasEn(){
        return Experiencias.find({_id: {$in: this.experiencias.listado}}).fetch();
    },
    hibilidadesEn(){
        return Habilidades.find({_id: {$in: this.habilidades.listado}}).fetch();
    }
});

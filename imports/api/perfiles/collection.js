import {Mongo} from 'meteor/mongo';
import {Puestos} from '../catalogos/puestos/collection';
import {Escuelas} from '../catalogos/escuelas/collection';
import {Experiencias} from '../catalogos/experiencias/collection';
import {Habilidades} from '../catalogos/habilidades/collection';

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
        let strExperiencias = '';
        let experiencias = Experiencias.find({_id: {$in: this.experiencias.listado}});
        experiencias.forEach((experiencia)=>{
            strExperiencias = experiencia.descripcion + ' | ';
        });
        return strExperiencias;
    },
    hibilidadesEn(){
        let strHabilidades = '';
        let habilidades = Habilidades.find({_id: {$in: this.habilidades.listado}}, {fields:{descripcion:1}});
        habilidades.forEach((habilidad)=>{
            strHabilidades += habilidad.descripcion + ' | ';
        });
        return strHabilidades;
    }
});

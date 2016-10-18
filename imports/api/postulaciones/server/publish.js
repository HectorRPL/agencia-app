/**
 * Created by jvltmtz on 23/08/16.
 */
import {Meteor} from 'meteor/meteor';
import {Postulaciones} from '../collection';
import {Direcciones} from '../../direcciones/collection';
import {Perfiles} from '../../perfiles/collection';
import {Escuelas} from '../../escuelas/collection';
import {Experiencias} from '../../experiencias/collection';
import {Habilidades} from '../../habilidades/collection';
import {Puestos} from '../../puestos/collection';
import {Candidatos} from '../../candidatos/collection';
import {Counts} from 'meteor/tmeasday:publish-counts';


if (Meteor.isServer) {

    Meteor.publish('postulaciones.countPostulaciones', function (vacanteId) {
        let selector = {$and: [vacanteId, {estado: 1}]};
        Counts.publish(this, 'numPostulaciones', Postulaciones.find(selector));
    });

    Meteor.publish('postulaciones.countSeleccionados', function (vacanteId) {
        let selector = {$and: [vacanteId, {estado: 2}]};
        Counts.publish(this, 'numSeleccionados', Postulaciones.find(selector));
    });

    Meteor.publishComposite('postulaciones.postuladosOseleccionados', function (tiendaId, estado) {
        const selector = {$and: [tiendaId, estado]};
        if (this.userId) {
            return {
                find: function () {
                    return Postulaciones.find(selector);
                },
                children: [
                    {
                        find: function (postulacion) {
                            return Candidatos.find({_id: postulacion.candidatoId}, {
                                fields: {
                                    nombre: 1,
                                    apellidos: 1,
                                    sexo: 1,
                                }
                            });
                        },
                        children: [
                            {
                                find: function (candidato) {
                                    return Direcciones.find({propietario: candidato._id}, {
                                        fields: {
                                            codigoPostal: 0,
                                            fechaCreacion: 0,
                                            calle: 0,
                                            colonia: 0
                                        }
                                    });
                                }
                            },
                        ]
                    },
                    {
                        find: function (postulacion) {
                            return Perfiles.find({candidatoId: postulacion.candidatoId});
                        },
                        children: [
                            {
                                find: function (perfil) {
                                    return Escuelas.find({_id: perfil.escolaridadId});
                                }

                            },
                            {
                                find: function (perfil) {
                                    return Puestos.find({_id: perfil.puestoId});
                                }
                            },
                            {
                                find: function (perfil) {
                                    const selector = {_id: {$in: perfil.habilidades.listado}};
                                    return Habilidades.find(selector);
                                }
                            },
                            {
                                find: function (perfil) {
                                    return Experiencias.find({_id: {$in: perfil.experiencias.listado}});
                                }
                            }
                        ]
                    }

                ]
            }
        } else {
            this.ready();
        }
    });

}

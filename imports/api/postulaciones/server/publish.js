/**
 * Created by jvltmtz on 23/08/16.
 */
import {Meteor} from 'meteor/meteor';
import {Postulaciones} from '../collection';
import {Direcciones} from '../../direcciones/collection';
import {Perfiles} from '../../perfiles/collection';
import {Escuelas} from '../../catalogos/escuelas/collection';
import {Experiencias} from '../../catalogos/experiencias/collection';
import {Habilidades} from '../../catalogos/habilidades/collection';
import {Puestos} from '../../catalogos/puestos/collection';
import {Candidatos} from '../../candidatos/collection';
import {Counts} from 'meteor/tmeasday:publish-counts';


if (Meteor.isServer) {


    Meteor.publishComposite('postulaciones.postuladosOseleccionados', function (tiendaId, estado) {
        let selector = {};
        if(estado.estado === 1){
            selector = tiendaId;
        }else{
            selector = {$and: [tiendaId, estado]};
        }

        if (this.userId) {
            return {
                find: function () {
                    return Postulaciones.find(selector);
                },
                children: [
                    {
                        find: function (postulacion) {
                            let fields = {
                                nombre: 1,
                                apellidos: 1,
                                sexo: 1,
                            };
                            if (postulacion.estado === 2) {
                                fields.email = 1;
                                fields.telefono = 1;
                            }
                            console.log(fields);
                            return Candidatos.find({_id: postulacion.candidatoId}, fields);
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

import {Meteor} from 'meteor/meteor';
import {Vacantes} from '../collection';
import {Postulaciones} from '../../postulaciones/collection';
import {Agencia} from '../../agencia/collection';
import {Candidatos} from '../../candidatos/collection';
import {Cadenas} from '../../cadenas/collection';
import {Estados} from '../../estados/collection';
import {Puestos} from '../../puestos/collection';
import {Direcciones} from '../../direcciones/collection';
import {Perfiles} from '../../perfiles/collection';
import {Escuelas} from '../../escuelas/collection';
import {Experiencias} from '../../experiencias/collection';
import {Habilidades} from '../../habilidades/collection';

if (Meteor.isServer) {
    Meteor.publishComposite('vacantes.misPublicaciones', function () {
        if (this.userId) {
            const agencia = Agencia.findOne({propietario: this.userId});
            const selector = {$and: [{propietario: agencia._id}, {eliminada: false}]};
            let options = {};
            options.sort = {fechaCreacion: -1};
            options.fields = {
                fechaCreacion: 1,
                cadenaId: 1,
                marca: 1,
                sucursal: 1,
                estadoId: 1,
                sueldo: 1,
                numVacantes: 1,
                numPostulaciones: 1,
                numSeleccionados: 1
            };
            return {
                find: function () {
                    return Vacantes.find(selector, options);
                },
                children: [
                    {
                        find: function (vacante) {
                            return Cadenas.find({_id: vacante.cadenaId});
                        }
                    }
                ]
            };
        } else {
            this.ready();
        }

    });

    Meteor.publishComposite('vacantes.detalle', function (vacanteId) {
        return {
            find: function () {
                return Vacantes.find(vacanteId, {
                    fields: {
                        eliminada: 0
                    }
                });
            },
            children: [
                {
                    find: function (vacante) {
                        return Cadenas.find({_id: vacante.cadenaId});
                    }
                },
                {
                    find: function (vacante) {
                        return Estados.find({_id: vacante.estadoId});
                    }
                },
                {
                    find: function (vacante) {
                        return Puestos.find({_id: vacante.puestoId});
                    }
                },
            ]
        };

    });

    Meteor.publishComposite('vacantes.candidatosOseleccionados', function (vacanteId, estado) {
        const selector = {$and: [estado, vacanteId]};
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
            };
        } else {
            this.ready();
        }
    });

}

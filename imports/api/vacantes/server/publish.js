import {Meteor} from "meteor/meteor";
import {Vacantes} from "../collection";
import {Agencias} from "../../agencias/collection";
import {Cadenas} from "../../catalogos/cadenas/collection";
import {Estados} from "../../catalogos/estados/collection";
import {Puestos} from "../../catalogos/puestos/collection";
import {Tiendas} from "../../tiendas/collection";
import {Postulaciones} from "../../postulaciones/collection";
import {Experiencias} from "../../catalogos/experiencias/collection";
import {Habilidades} from "../../catalogos/habilidades/collection";
import {Escuelas} from "../../catalogos/escuelas/collection";

if (Meteor.isServer) {
    Meteor.publishComposite('vacantes.misPublicaciones', function () {
        if (this.userId) {
            const agencia = Agencias.findOne({propietario: this.userId});
            const selector = {$and: [{propietario: agencia._id}, {eliminada: false}]};
            let options = {};
            options.sort = {fechaCreacion: -1};
            options.fields = {
                perfil: 0,
                horarios: 0,
            };
            return {
                find: function () {
                    return Vacantes.find(selector, options);
                },
                children: [
                    {
                        find: function (vacante) {
                            return Puestos.find({_id: vacante.puestoId});
                        }
                    },
                    {
                        find: function (vacante) {
                            return Estados.find({_id: vacante.estadoId});
                        }
                    }
                ]
            }
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
                        return Estados.find({_id: vacante.estadoId});
                    }
                },
                {
                    find: function (vacante) {
                        return Puestos.find({_id: vacante.puestoId});
                    }
                },
                {
                    find: function (vacante) {
                        const habilidades = vacante.perfil.habilidades.listado;
                        return Habilidades.find({_id: {$in: habilidades}});
                    }
                },
                {
                    find: function (vacante) {
                        const experiencias = vacante.perfil.experiencia.listado;
                        return Experiencias.find({_id: {$in: experiencias}});
                    }
                },
                {
                    find: function (vacante) {
                        return Escuelas.find({_id: vacante.perfil.escolaridad});
                    }
                }
            ]
        }
    });

    Meteor.publishComposite('vacantes.tiendas', function (vacanteId) {
        return {
            find: function () {
                return Tiendas.find(vacanteId, {
                    fields: {
                        fechaCreacion: 0
                    }
                });
            },
            children: [
                {
                    find: function (tienda) {
                        return Cadenas.find({_id: tienda.cadenaId});
                    }
                }
            ]
        }
    });


    Meteor.publish('vacantes.numPostulados', function (vacanteId) {
        Counts.publish(this, `count.postulados.${vacanteId.vacanteId}`,
            Postulaciones.find(vacanteId));
    });

    Meteor.publish('vacantes.numPostuladosNuevos', function (vacanteId) {
        Counts.publish(this, `count.postulados.nuevos.${vacanteId.vacanteId}`,
            Postulaciones.find({
                $and: [vacanteId, {estado: 1}, {postVistoAgencia: false}]
            }));
    });

    Meteor.publish('vacantes.numSeleccionados', function (vacanteId) {
        Counts.publish(this, `count.seleccionados.${vacanteId.vacanteId}`,
            Postulaciones.find({$and: [vacanteId, {estado: 2}]}));
    });

    Meteor.publish('vacantes.numSeleccionadosNuevos', function (vacanteId) {
        Counts.publish(this, `count.seleccionados.nuevos.${vacanteId.vacanteId}`,
            Postulaciones.find({
                $and: [vacanteId, {estado: 2}, {selecVistoAgencia: false}]
            }));
    });

}

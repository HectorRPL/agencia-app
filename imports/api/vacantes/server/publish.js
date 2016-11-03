import {Meteor} from "meteor/meteor";
import {Vacantes} from "../collection";
import {Agencia} from "../../agencia/collection";
import {Cadenas} from "../../cadenas/collection";
import {Estados} from "../../estados/collection";
import {Puestos} from "../../puestos/collection";
import {Tiendas} from "../../tiendas/collection";
import {Postulaciones} from "../../postulaciones/collection";


if (Meteor.isServer) {
    Meteor.publishComposite('vacantes.misPublicaciones', function () {
        if (this.userId) {
            const agencia = Agencia.findOne({propietario: this.userId});
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
                            console.log(`count.vacante.postulados.nuevos.${vacante._id}`);
                            Counts.publish(this, `count.vacante.postulados.nuevos.${vacante._id}`,
                                Postulaciones.find({
                                    $and: [{vacanteId: vacante._id}, {estado: 1}, {postVistoAgencia: false}]
                                }), {noReady: true});
                            return Puestos.find({_id: vacante.puestoId});
                        }
                    },
                    {
                        find: function (vacante) {
                            console.log(`count.vacante.seleccionados.nuevos.${vacante._id}`);
                            Counts.publish(this, `count.vacante.seleccionados.nuevos.${vacante._id}`,
                                Postulaciones.find({
                                    $and: [{vacanteId: vacante._id}, {estado: 2}, {selecVistoAgencia: false}]
                                }), {noReady: true});
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
                        Counts.publish(this, `count.postuladosNuevos.${tienda._id}`,
                            Postulaciones.find({$and: [{tiendaId: tienda._id}, {estado: 1}, {postVistoAgencia: false}]}), {noReady: true});
                        return Cadenas.find({_id: tienda.cadenaId});
                    }
                }
            ]
        }
    });


}

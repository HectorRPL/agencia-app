import {Meteor} from 'meteor/meteor';
import {Vacantes} from '../collection';
import {Postulaciones} from '../../postulaciones/collection';
import {Agencia} from '../../agencia/collection';
import {Candidatos} from '../../candidatos/collection';
import {Cadenas} from '../../cadenas/collection';
import {Estados} from '../../estados/collection';
import {Puestos} from '../../puestos/collection';
import {Tiendas} from '../../tiendas/collection';


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


}

/**
 * Created by Héctor on 08/06/2017.
 */
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const DatosFiscales = new Mongo.Collection('datosFiscales');

DatosFiscales.deny({
    insert() {return true;},
    update() {return true;},
    remove() {return true;}
});

const Schema = {};

Schema.datosFiscales = new SimpleSchema({
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    personaFisica: {
        type: Boolean
    },
    rfc: {
        type: String,
        // regEx: FALTA PONERLE SU REGEX,
        optional: true,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    razonSocial: {
        type: String,
        regEx: /^[a-zA-Z-Ññ.,-\s\d]+$/,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('tipoPersona').value == 'PM';
            if (shouldBeRequired) {
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return "required";
                }
            }
        },
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase();
            }
        }
    },
    nombre: {
        type: String,
        regEx: /^[a-zA-Z-Ññ-\s\d]+$/,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('tipoPersona').value == 'PF';
            if (shouldBeRequired) {
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return "required";
                }
            }
        },
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    apellidoPaterno: {
        type: String,
        regEx: /^[a-zA-Z-Ññ-\s\d]+$/,
        optional: true,
        custom: function () {
            let shouldBeRequired = this.field('tipoPersona').value == 'PF';
            if (shouldBeRequired) {
                if (!this.operator) {
                    if (!this.isSet || this.value === null || this.value === '') return "required";
                }
            }
        },
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    apellidoMaterno: {
        type: String,
        regEx: /^[a-zA-Z-Ññ-\s\d]+$/,
        optional: true,
        autoValue: function () {
            if (this.value) {
                return this.value.toUpperCase()
            }
        }
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        // autoValue: function () {
        //     return this.value.toUpperCase()
        // }
    },

    calle: {
        type: String,
        max: 40,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        // autoValue: function () {
        //     return this.value.toUpperCase()
        // }
    },
    delMpio: {
        type: String,
        max: 100,
        min: 1,
        // autoValue: function () {
        //     return this.value.toUpperCase()
        // }
    },
    estado: {
        type: String,
        max: 20,
        min: 1,
        // autoValue: function () {
        //     return this.value.toUpperCase()
        // }
    },
    estadoId: {
        type: String,
        max: 3,
        min: 1,
        regEx: /^[a-zA-Z-/.&ñáéíóú-\s\d]+$/,
        // autoValue: function () {
        //     return this.value.toUpperCase()
        // }
    },
    colonia: {
        type: String,
        max: 100,
        min: 1,
        // autoValue: function () {
        //     return this.value.toUpperCase()
        // }
    },
    numExt: {
        type: String,
        max: 20,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        autoValue: function () {
            if(this.value){
                return this.value.toUpperCase()
            }
        }
    },
    numInt: {
        type: String,
        max: 20,
        min: 1,
        regEx: /^[a-zA-Z-/.&ÑñáéíóúÁÉÍÓÚ-\s\d]+$/,
        optional: true,
        // autoValue: function () {
        //     if (this.value) {
        //         return this.value.toUpperCase()
        //     }
        // }
    },
    codigoPostal: {
        type: String,
        max: 5,
        min: 5,
        regEx: /^[0-9]{5}$/
    },

});

DatosFiscales.attachSchema(Schema.datosFiscales);
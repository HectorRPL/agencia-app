import {
    Meteor
} from 'meteor/meteor';
import {
    CodigosPostales
} from './collection';
if (Meteor.isServer) {
  Meteor.publish('estados', () => {
    const selector = {codigo:'16090'};
    console.log(CodigosPostales.find(selector));
    return CodigosPostales.find(selector);
  });
}

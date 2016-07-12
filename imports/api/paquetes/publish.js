import { Meteor } from 'meteor/meteor';

import { Paquetes } from './collection';

if (Meteor.isServer) {
  Meteor.publish('paquetes', function() {
    const selector = {};

    return Paquetes.find(selector);
  });
}

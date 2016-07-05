import { Meteor } from 'meteor/meteor';

import { TarjetaBancaria } from './collection';

if (Meteor.isServer) {
  Meteor.publish('tarjetaBancaria', function() {
    const selector =  {
        owner: this.userId
      };

    return TarjetaBancaria.find(selector);
  });
}

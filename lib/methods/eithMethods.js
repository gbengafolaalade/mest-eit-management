import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Eits} from '../../imports/api/eits.js';

Meteor.methods({

  'insertEit'(name, email, country, phone){

    if (!Meteor.user()) {
      return new Meteor.Error('Pls log in to insert');
    }
    else{

      Eits.insert({
        eitName: name,
        eitEmail: email,
        eitCountry: country,
        eitPhone: phone,
        createdAt: new Date(),
        mentor: Meteor.userId()
      });

    }



  },

  'updateEit'(id, name, email, country, phone) {
    // Check if User is has the right Permissions
    if (!Meteor.user()) {
      return new Meteor.Error('Please log in to edit');
    }

    // Find Existing Data
    const eit = Eits.findOne(id);

    // Check if User can edit eit
    if (Meteor.userId() !== eit.mentor) {
      return new Meteor.Error('Not Authorised to Edit EIT. Only mentor can edit');
    }

    // Validate Incoming Data


    // Update EIT
    Eits.update(id,{

      $set: {
      eitName: name,
      eitEmail: email,
      eitCountry: country,
      eitPhone: phone,
      createdAt: new Date(),
     },

    });
  },

  'deleteEit'(_id) {
    // Check if User is has the right Permissions
    // Check if User is has the right Permissions
    const eit = Eits.findOne(_id);
    if (!Meteor.user()) {
      return new Meteor.Error('Not Authorised');
    }
    if (Meteor.userId() !== eit.mentor) {
      return new Meteor.Error('Not Authorised to Edit EIT');
    }
    Eits.remove(_id);

    // Validate Incoming Data


    // Find Existing Data


    // Check if User can edit eit


    // Delete EIT

  },

  'deleteChecked'(){
      

  }



});

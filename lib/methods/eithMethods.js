import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {Eits} from '../../imports/api/eits.js';

Meteor.methods({

  'insertEit'(name, email, country, phone){

    if (!this.userId) {
      throw new Meteor.Error('Pls log in to insert');
    }


      Eits.insert({
        eitName: name,
        eitEmail: email,
        eitCountry: country,
        eitPhone: phone,
        createdAt: new Date(),
        mentor: this.userId,
        mentorName: Meteor.users.findOne(this.userId).username,
      });





  },

  'updateEit'(_id, name, email, country, phone) {
    // Check if User is has the right Permissions
    if (!this.userId) {
      throw new Meteor.Error('Please log in to edit');
    }

    // Find Existing Data
    const eit = Eits.findOne(_id);

    // Check if User can edit eit
    if (this.userId !== eit.mentor) {
      throw new Meteor.Error('Not Authorised to Edit EIT');
    }

    // Validate Incoming Data


    // Update EIT
    Eits.update(_id,{

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
    const eit = Eits.findOne({ _id });
    if (!this.userId) {
      throw new Meteor.Error('Not Authorised');
    }
    if (this.userId !== eit.mentor) {
      throw new Meteor.Error('Not Authorised to delete EIT');
    }

    Eits.remove(_id);


    // Validate Incoming Data


    // Find Existing Data


    // Check if User can edit eit


    // Delete EIT

  },

  'deleteChecked'(){

    // Check if User is has the right Permissions
    if (!Meteor.user()) {
      return new Meteor.Error('Not Authorised');
    }
    if (Meteor.userId() !== eit.mentor) {
      return new Meteor.Error('Not Authorised to Edit EIT');
    }

    fetcher.forEach(item => Eits.remove(item._id));

    EITs.remove({ _id: { $in: ids }, mentor: Meteor.userId() });




  }



});

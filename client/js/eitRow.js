import { Template } from 'meteor/templating';

import { Eits } from '../../imports/api/eits.js';

import '../html/eitRow.html';

Template.eitRow.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Eits.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
     event.preventDefault();

      Meteor.call('deleteEit', this._id);


  },
  'click .editButton'() {
//     const fetched = Eits.findOne(this._id);
//
//     const eitId = fetched._id;
//     const eitName = fetched.eitName;
//     const eitEmail = fetched.eitEmail;
//     const eitCountry = fetched.eitCountry;
//     const eitPhone = fetched.eitPhone;
// ..console.log(eitName);
//
//
//     //document.getElementById("editName").value = eitName;
//
//     // $('input#editmyHidden').val(eitId);
//     $('input#editName').val(eitName);
//     // $('input#editEmail').val(eitEmail);
//     // $('input#editCountry').val(eitCountry);
//     // $('input#editPhone').val(eitPhone);
//
//      // FlowRouter.go('/editEIT');

  },
});

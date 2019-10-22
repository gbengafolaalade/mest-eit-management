import { Template } from 'meteor/templating';

import { Eits } from '../api/eits.js';

import './eitTemplate.html';

Template.eitTemplate.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Eits.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Eits.remove(this._id);
  },
  'click .editButton'() {
    const fetched = Eits.findOne(this._id);

    const eitId = fetched._id;
    const eitName = fetched.eitName;
    const eitEmail = fetched.eitEmail;
    const eitCountry = fetched.eitCountry;
    const eitPhone = fetched.eitPhone;

    $('input#myHidden').val(eitId);
    $('input#name').val(eitName);
    $('input#email').val(eitEmail);
    $('input#country').val(eitCountry);
    $('input#phone').val(eitPhone);
     // console.log(fetched);

  },
});

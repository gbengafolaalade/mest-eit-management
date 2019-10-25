import { Template } from 'meteor/templating';

import { Eits } from '../../imports/api/eits.js';

import '../html/editEIT.html';

Template.editEIT.helpers({

  eit(){
    const id = FlowRouter.getParam("id");
    return Eits.findOne(id);
  }


});

Template.editEIT.events({

  'submit .edit-eit'(event){

    event.preventDefault();

    // const target = event.target;
    const name = event.target.editName.value;
    const email = event.target.editEmail.value;
    const country = event.target.editCountry.value;
    const phone = event.target.editPhone.value;
      const id = FlowRouter.getParam("id");
    // console.log(name);
    // console.log(email);
    // console.log(country);
    // console.log(phone);

    Meteor.call('updateEit', id,name,email,country,phone);


    event.target.editmyHidden.value =  '';
    event.target.editName.value =  '';
    event.target.editEmail.value =  '';
    event.target.editCountry.value =  '';
    event.target.editPhone.value =  '';
    alert('EIT updated succesfully. Go Back to Home');

    // FlowRouter.go('/')




  //mongodb+srv://gbenga:AQXsu8RRtauwCr9@cluster0-bfsk0.mongodb.net/test



  },
// FlowRouter.go('/');
});

// Business Logic for AddressBook ---------

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, street, city, zipCode, state) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.street = street,
  this.city = city,
  this.state = state,
  this.zipCode = zipCode
}
  // this.address = address

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Contact.prototype.address = function() {
//   return this.street + ", " + this.city + ", " + this.state + " " + this.zipCode;
// }

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);

  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".street").html(contact.street);
  $(".city").html(contact.city);
  $(".state").html(contact.state);
  $(".zipCode").html(contact.zipCode);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
  showContact(this.id);
  $("#buttons").on("click", ".deleteButton", function() {
   addressBook.deleteContact(this.id);
   $("#show-contact").hide();
   displayContactDetails(addressBook);
  });
});
}
// User Interface Logic ---------
var addressBook = new AddressBook();


function displayContactDetails(addressBookToDisplay) {

  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {

    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "<br> " + contact.phoneNumber + "<br> " + contact.email + "<br> " + contact.street + ",  " + "<br>" + contact.city + ",  " + contact.state.toUpperCase() + " " + contact.zipCode + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

$(".addressType").on("click", function() {
  if (businessRadio) {
    $(".addressInputDiv").show();

  }else if (personalRadio) {
    $(".addressInputDiv").show();
  };
});

$(document).ready(function() {

  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var businessRadio = $("#businessAddress:checked").val();
    var personalRadio = $("#personalAddress:checked").val();
    var inputtedStreet = $("input#new-street").val();
    var inputtedCity = $("input#new-city").val();
    var inputtedZipCode = $("input#new-zipCode").val();
    var inputtedState = $("input#new-state").val();

    // $(".addressInputDiv").show(businessRadio);
    // $("")

    // var alternateAddress = $('input[]:checked').val();


    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-zipCode").val("");
    $("input#new-state").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedStreet, inputtedCity, inputtedZipCode, inputtedState);


    addressBook.addContact(newContact);

    displayContactDetails(addressBook);

  })
});

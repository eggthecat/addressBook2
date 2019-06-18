// Business Logic for AddressBook ---------
// This is a global variable because it's declared at the 'top level' of our file. That is, it's not inside of a function or method, and is therefore available to the entire file (hence the name global variable). While we generally want to avoid working with global variables, we make an exception because we're using this global variable to mimic a database.
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
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;

}
// start by utilizing our findContact() method.
function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  // We show the hidden #show-contact content with the contact's full information.
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  // The first is the type of the event we're listening for. In our case, we want code to trigger when <li>s are clicked, but we could specify other events like hover or keyup as well.
  // The second is the child element that should trigger this event listener. In this case, it's all <li>s inside ul#contacts
  $("ul#contacts").on("click", "li", function() {
    // this refers to the li, which has a specific ID. In other words, we are passing a contact's unique ID into this function. Remember, we must pass the contact into the showContact() function; otherwise, it won't know which contact we are talking about.
    // Now we can click on an <li> and see that contact's detail info appear in the DOM!
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

// This method will display Contact info in the DOM; hence its name. It takes an AddressBook object as an argument.
function displayContactDetails(addressBookToDisplay) {
  // First we save our jQuery ul#contacts element in a variable called contactsList.
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  // Next we iterate through the Contacts saved in the AddressBook provided as an argument to displayContactDetails().
  addressBookToDisplay.contacts.forEach(function(contact) {
    // We assign each Contact to a <li> with a dynamic id matching the Contact's id property.
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " " + contact.phoneNumber + " " + contact.email +"</li>";
  });
  contactsList.html(htmlForContactInfo);
};
AddressBook.prototype.coolDude = 'sweet';

$(document).ready(function() {
  // We add a form submission event listener
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    // We gather user-provided form input from form fields for first name, last name, and phone number, and assign them to variables (inputtedFirstName, inputtedLastName, etc.)
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    // Let's also make sure to empty out our form fields after submission:
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    // We create a new Contact object, passing in this gathered information as arguments.
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
    // We add the newContact to our AddressBook using the addContact() method.
    addressBook.addContact(newContact);
    // Finally, we log the list of Contacts in our AddressBook to the console, to double-check the new contact has been added. (We'll add logic for displaying contacts in our user interface in the next lesson.)
    // Let's call this new method whenever we add a new Contact
    displayContactDetails(addressBook);
    console.log(addressBook.coolDude);
  })
});

$(function() {

  var jsonData = null;

  


  var slideAllUp = function() {
    $('#new-contact-container').slideUp();
    $('#show-all-contacts-container').slideUp();
    $('#show-contact-by-id-container').slideUp();
    $('#search-contacts-container').slideUp();
  }


  $('#btn-new-contact').on('click', function() {
    slideAllUp()
    $('#new-contact-container').slideDown();
  });

  $('#btn-new-contact-submit').on('click', function() {
    var newContact = {};
    newContact.first_name = $('#first-name').val();
    newContact.last_name = $('#last-name').val();
    newContact.email = $('#email').val();
    $('#new-contact-result').empty();
    $.ajax({
      url: '/api/contacts',
      method: 'post',
      data: newContact,
      dataType: 'json',
      success: function(response) {
        $('<p>').text(response.first_name + ' ' + response.last_name + ' added!').appendTo('#new-contact-result');
      },
      error: function(response) {
        $('<p>').text(response.error_message).appendTo('#new-contact-result');
      }
    });
  });


  $('#btn-show-all-contacts').on('click', function() {
    slideAllUp()
    $('#show-all-contacts-container').empty();
    $.getJSON('/api/contacts', function(data) {
      for (i = 0; i < data.length; i++) {
        $('<div>').text(data[i].first_name).appendTo('#show-all-contacts-container');
        $('<div>').text(data[i].last_name).appendTo('#show-all-contacts-container');
        $('<div>').text(data[i].email).appendTo('#show-all-contacts-container');
        $('<hr>').appendTo('#show-all-contacts-container');
      }
      $('#show-all-contacts-container').slideDown();
    });
  });


  $('#btn-show-contact-by-id').on('click', function() {
    slideAllUp()
    $('#show-contact-by-id-container').slideDown();
  });


  $('#btn-search-contacts').on('click', function() {
    slideAllUp()
    $('#search-contacts-container').slideDown();
  });

});
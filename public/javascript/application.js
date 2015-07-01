$(function() {

  var $activeButton = null;


  var slideAllUp = function() {
    $('#new-contact-container').slideUp();
    $('#show-all-contacts-container').slideUp();
    $('#show-contact-by-id-container').slideUp();
    $('#search-contacts-container').slideUp();
  }


  $('#btn-new-contact').on('click', function() {
    $activeButton = $(this);
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
      }
    });
  });


  $('#btn-show-all-contacts').on('click', function() {
    $activeButton = $(this);
    slideAllUp()
    $('#show-all-contacts-container').empty();
    $.getJSON('/api/contacts', function(data) {
      for (i = 0; i < data.length; i++) {
        $('<div>').text('ID: ' + data[i].id).appendTo('#show-all-contacts-container');
        $('<div>').text(data[i].first_name).appendTo('#show-all-contacts-container');
        $('<div>').text(data[i].last_name).appendTo('#show-all-contacts-container');
        $('<div>').text(data[i].email).appendTo('#show-all-contacts-container');
        $('<button>').text('Delete This Contact').attr('id', data[i].id).addClass('btn-delete').appendTo('#show-all-contacts-container');
        $('<hr>').appendTo('#show-all-contacts-container');
      }
      $('#show-all-contacts-container').slideDown();
    });
  });


  $('#btn-show-contact-by-id').on('click', function() {
    $activeButton = $(this);
    slideAllUp()
    $('#show-contact-by-id-container').slideDown();
  });

  $('#btn-id-to-show').on('click', function() {
    var obj = {};
    obj.id = $('#id-to-show').val();
    $('#show-contact-by-id-results').empty();
    $.ajax({
      url: '/api/contact/search-by-id',
      method: 'post',
      data: obj,
      dataType: 'json',
      success: function(response) {
        if (response.error_message) {
          $('<div>').text(response.error_message).appendTo('#show-contact-by-id-results');
        } else {
          $('<div>').text('ID: ' + response.id).appendTo('#show-contact-by-id-results');
          $('<div>').text(response.first_name).appendTo('#show-contact-by-id-results');
          $('<div>').text(response.last_name).appendTo('#show-contact-by-id-results');
          $('<div>').text(response.email).appendTo('#show-contact-by-id-results');
        }
      }
    });
  });


  $('#btn-search-contacts').on('click', function() {
    $activeButton = $(this);
    slideAllUp()
    $('#search-contacts-container').slideDown();
  });

  $('#btn-search-contacts-submit').on('click', function() {
    var obj = {};
    obj.string = $('#search-contacts-string').val();
    $('#search-contacts-results').empty();
    $.ajax({
      url: '/api/contact/search',
      method: 'post',
      data: obj,
      dataType: 'json',
      success: function(response) {
        for (i = 0; i < response.length; i++) {
          $('<div>').text('ID: ' + response[i].id).appendTo('#search-contacts-results');
          $('<div>').text(response[i].first_name).appendTo('#search-contacts-results');
          $('<div>').text(response[i].last_name).appendTo('#search-contacts-results');
          $('<div>').text(response[i].email).appendTo('#search-contacts-results');
          $('<hr>').appendTo('#search-contacts-results');
        }
      }
    });
  });


  $('body').on('click', '.btn-delete', function() {
    debugger;
    var confirmation = confirm("Are you sure you want to delete this contact?");
    if (confirmation == true) {
      var obj = {};
      obj.id = $(this).attr('id');
      $.ajax({
        url: '/api/contact/delete',
        method: 'delete',
        data: obj,
        dataType: 'json',
        success: function(response) {
          alert(response.message);
        }
      });
    }
  });

});
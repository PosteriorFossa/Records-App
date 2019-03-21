// ==== Variables =====

var data;

// ==== AJAX call ====

const $request = $.ajax({url: "http://www.json-generator.com/api/json/get/coSwXiWUky?indent=2", success: function(result){
    data = result; // assign results to variable
    console.log(data)
  }});

// ==== Functions ====

function showError () {
  $('#error').css({'visibility':'visible'});
}

function hideError () {
  $('#error').css({'visibility':'hidden'});
}

function appendResults(person) {
  let personID = person.guid.substring(0,2);
  $('#results').append(`
          <tr>
            <td>${personID}.</td>
            <td>${person.name}</td>
            <td>${person.company}</td>
            <td>${person.address}</td>
            <td>${person.email}</td>
            <td>${person.phone}</td>
            <td>${person.balance}</td>
          </tr>`) 
}

function searchRecords () {
  var search = $('#search').val().toLowerCase();
  if (search.length > 0) { // validate
    var searchType = $('select').val().toLowerCase();
    var match = false;
    hideError();
    
     
    if (search=="all") {
      // empty table for each search (moved inside if statements to ensure only empty on successful search"
      $('#results').empty(); 
      match=true;
      for (let i=0; i<data.length; i++) {
        var person = data[i];
        appendResults(person);
      }
    } else {
      $('#results').empty();
      
      for (let i=0; i<data.length; i++) {
        var person = data[i];
        if (person[searchType].toLowerCase().includes(search)) { // searches for partial match
          // append row to table
          appendResults(person);
          match = true;      
        }
      }
    }      
        
    if (match==false) {
      showError();
      $('#error').html('<p class="noResults">No results. Please try again</p>');
    }      
      
            
    } else {
    showError();
    $('#error').html('<p class="emptyField">Please enter a search term</p>'); // .html over append as you want to overwrite content, not add
  }
} 

// ==== Event Listeners ====


$('button').on('click', function () {
  searchRecords();  
}) 

// Copy command

$('#results').on('click', '.copy', function (event) { // need to select parent container, then use target class as parameter, since you are working with dynamic content

  // var result = getElementsByTagName('tr')[event.target];
  $query = $(event.target).parent()[0]
  $query.select();
  document.execCommand('copy')
  
}) 




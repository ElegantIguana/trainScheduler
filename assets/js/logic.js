$(document).ready(function() {


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCTuhn1yKVA6Jd8NMp490Kg5rBRb8hjJp0",
    authDomain: "trainscheduler-50cfc.firebaseapp.com",
    databaseURL: "https://trainscheduler-50cfc.firebaseio.com",
    projectId: "trainscheduler-50cfc",
    storageBucket: "",
    messagingSenderId: "800598368453"
  };
  firebase.initializeApp(config);

  //database variable
  var database = firebase.database();

  // checks to see if user pushed the button
  $("#trainInfoBtn").on("click", function() {
  	event.preventDefault();

  	//user input is assigned to these variables
  	var trainName = $("#name").val().trim();
  	var destination = $("#dest").val().trim();
  	
  	//modifying user input
  	var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X"); 

  });



});
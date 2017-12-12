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
  	//console.log(trainName);
  	var destination = $("#dest").val().trim();
  	//console.log(destination);

  	//modifying user input
  	var firstTime = moment($("#firstTime").val().trim(), "hh:mm").subtract(1, "years").format("X");
  	//console.log(firstTime);
  	var frequency = $("#freq").val().trim();
  	//console.log(frequency);

  	//What time is it?
  	var currentTime = moment();
  	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm")); 

  	//all new train info compiled into new object
  	var newTrain = {

  		train: trainName,
  		trainGoing: destination,
  		trainComing: firstTime,
  		everyXMin: frequency
  	};

  	//adding new train to firebase
  	database.ref().push(newTrain);

  	//clears elements on page before new text is added
  	$("#name").val("");
  	$("#dest").val("");
    $("#firstTime").val("");
  	$("#freq").val("");

  	return false;

  }); //end of onclick event




});
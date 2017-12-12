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

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());
	//store input in variables
	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().trainGoing;
	var firstTime = childSnapshot.val().trainComing;
	var frequency = childSnapshot.val().everyXMin;

	//cleaning up data format
	var trainTime = moment.unix(firstTime).format("hh:mm");
	//calculates the diff between times
	var difference = moment().diff(moment(trainTime), "minutes");

	var trainRemain = difference % frequency;

	var minUntil = frequency - trainRemain;
	var nextArrival = moment().add(minUntil, "minutes").format("hh:mm");

	//finally display data to the DOM
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

//done
});
});
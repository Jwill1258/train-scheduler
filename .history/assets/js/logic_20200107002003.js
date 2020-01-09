// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCFnCrE0px7tv5TuKNodRGbvgcFqUhnW0g",
  authDomain: "train-scheduler-3ba68.firebaseapp.com",
  databaseURL: "https://train-scheduler-3ba68.firebaseio.com",
  projectId: "train-scheduler-3ba68",
  storageBucket: "train-scheduler-3ba68.appspot.com",
  messagingSenderId: "69111214744",
  appId: "1:69111214744:web:d1410487c60dd6097396ed"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$("#add-train").on("click", function (event) {
    event.preventDefault();

    //user input
    var traName = $("#train-name").val().trim();
    var traDes = $("#destination").val().trim();
    var traTime = $("#time").val().trim();
    var traFreq = $("#frequency").val().trim();
  
    //local "temporary" object for holding data
    var newTra = {
      name: traName,
      destination: traDes,
      time: traTime,
      frequency: traFreq
    };
  
    // Uploads train data to the database
    database.ref().push(newTra);
  
    // Logs everything to console
    console.log(newTra.name);
    console.log(newTra.destination);
    console.log(newTra.time);
    console.log(newTra.frequency);
  
    alert("train successfully added");

    // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
  var traName = childSnapshot.val().name;
  var traDes = childSnapshot.val().destination;
  var traTime = childSnapshot.val().time;
  var traFreq = childSnapshot.val().frequency;



  // train Info
  console.log(traName);
  console.log(traDes);
  console.log(traTime);
  console.log(traFreq);
    var firstTimeConverted = moment(traTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("current time:" + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference in time:" + diffTime);

    var tRemainder = diffTime % traFreq;
    console.log(tRemainder);

    var traMin= traFreq-tRemainder;
    console.log("min til train" + traMin);

    var traArr = moment().add(traMin, "minutes");
    console.log("arrival time:" + moment (traArr).format("hh:mm"));
    
    var newRow = $("<tr>").append(
        $("<td>").text(traName),
        $("<td>").text(traDes),
        $("<td>").text(traFreq),
        $("<td>").text(traArr),
        $("<td>").text(traMin),
    );
    $("#train-table > tbody").append(newRow);
});
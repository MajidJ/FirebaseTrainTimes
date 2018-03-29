'use strict';


 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAZNpta-SayyWiFtK-nDISWXuTVQVuIs-o",
    authDomain: "employeedatamanage-340b6.firebaseapp.com",
    databaseURL: "https://employeedatamanage-340b6.firebaseio.com",
    projectId: "employeedatamanage-340b6",
    storageBucket: "employeedatamanage-340b6.appspot.com",
    messagingSenderId: "322499376194"
};
firebase.initializeApp(config);

// Global Variables
let database = firebase.database();
let trainName;
let trainDestination;
let trainFirstTime;
let trainFrequency;

$(document).ready(function() {

   

    // add firebase to DOM if there's something to show every time there's a value for a new child
    database.ref().on('value', function(snapshot) {
        // console.log(snapshot.val());
        $('#trainTimes > tbody').empty();
        snapshot.forEach(function(child) {
            
            let value = child.val();

            trainName = value.name;
            trainDestination = value.destination;
            trainFirstTime = value.first_time;
            trainFrequency = value.frequency;


            let tableRow = $('<tr>');
            tableRow.append(`<td>${trainName}</td>`);
            tableRow.append(`<td>${trainDestination}</td>`);
            tableRow.append(`<td>${trainFrequency}</td>`);
            tableRow.append(`<td>n/a</td>`);
            tableRow.append(`<td>n/a</td>`);
            $('#trainTimes > tbody').append(tableRow);

            // console.log(trainName, trainDestination, trainFirstTime, trainFrequency)

        });
    });





});


$(document).on('click', '#addTrain', function() {
    event.preventDefault();
    // console.log('the button got clicked yo!');


    // pass new submitted values
    trainName = $('#trainName').val().trim();
    trainDestination = $('#destination').val().trim();
    trainFirstTime = $('#firstTrainTime').val().trim();
    trainFrequency = $('#frequency').val().trim();

    // create object for this submitted train
    const pushObject = {
        name : trainName,
        destination : trainDestination,
        first_time : trainFirstTime,
        frequency : trainFrequency
    };

    console.log(pushObject);
    // pass values to firebase
    database.ref().push(pushObject);


});
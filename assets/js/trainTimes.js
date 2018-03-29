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
let nextTrainTimeInMinutes;
let nextTrainTime;

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
            trainFrequency = parseInt(value.frequency);

            //convert first time to minutes
            let trainHoursToMinutes = parseInt(moment(trainFirstTime, 'HH:mm').format('HH') * 60);
            let trainRemainderMinutes = parseInt(moment(trainFirstTime, 'HH:mm').format('mm'));
            let trainTimeInMinutes = trainHoursToMinutes + trainRemainderMinutes;
            console.log(trainFirstTime, trainTimeInMinutes);

            //convert current time to minutes
            let currentHoursToMinutes = parseInt(moment().format('HH') * 60);
            let currentRemainderMinutes = parseInt(moment().format('mm'));
            let currentTimeInMinutes = currentHoursToMinutes + currentRemainderMinutes;
            console.log(currentTimeInMinutes, trainFrequency);

            //Loop through time adding duration until it is greater than current time

            if (currentTimeInMinutes > trainTimeInMinutes) {
                for (let i = trainTimeInMinutes; i < currentTimeInMinutes; i = i + trainFrequency) {
                    nextTrainTimeInMinutes = i + trainFrequency;
                    // console.log(i);
                }
                // nextTrainTimeInMinutes = moment(nextTrainTimeInMinutes, 'mm').format('HH:mm');
                // console.log(nextTrainTimeInMinutes);
                nextTrainTimeInMinutes = nextTrainTimeInMinutes - currentTimeInMinutes;

            } else {
                nextTrainTimeInMinutes = trainTimeInMinutes - currentTimeInMinutes;
                // console.log(nextTrainTimeInMinutes);
            }

            nextTrainTime = getTimeFromMins(nextTrainTimeInMinutes + currentTimeInMinutes);   


            //Then get the difference between that new time and current time (in minutes)


            let tableRow = $('<tr>');
            tableRow.append(`<td>${trainName}</td>`);
            tableRow.append(`<td>${trainDestination}</td>`);
            tableRow.append(`<td>${trainFrequency}</td>`);
            tableRow.append(`<td>${nextTrainTime}</td>`);
            tableRow.append(`<td>${nextTrainTimeInMinutes}</td>`);
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



function getTimeFromMins(mins) {

    let h = mins / 60 | 0;
    let m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("HH:mm");
}
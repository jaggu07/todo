// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function() {
  var config = {
   apiKey: "AIzaSyDz_qY-iLp3jq67YysvBOmlqnoBSm_6v9Y",
    authDomain: "sampletodo-f6e7f.firebaseapp.com",
    databaseURL: "https://sampletodo-f6e7f.firebaseio.com",
    storageBucket: "sampletodo-f6e7f.appspot.com",
    messagingSenderId: "1071291415987"
  };
  firebase.initializeApp(config);
})

.controller("calenderCntrl", function($scope,$firebaseArray,$cordovaCalendar) {
  var ref = firebase.database().ref();
     var messagesRef = ref.child("messages");
    var data = $firebaseArray(messagesRef);
    $scope.submit=function(title,start,end){
      data.$add({
        End:end,
        Start:start,
        Title:title
      }).then(function(ref){
        alert("success")
        $scope.firebaseData=data;
        $scope.calender($scope.firebaseData);
      });
    }  
    
    $scope.calender=function(q){
      q.forEach(function(data){
      $scope.todoTask=data.Title;
      $scope.todoDate=new Date(Number(data.Start));
      $scope.todoEnd=new Date(Number(data.End));
        $cordovaCalendar.createEvent({
          title: $scope.todoTask,
          startDate: $scope.todoDate,
          endDate: $scope.todoEnd

          }).then(function (result) {
          alert("result")
          }, function (err) {
        alert("err")
      });
    })
    }
    });
/*var submitValue = function () {
  alert(1);
}*/

var app = angular.module('financing-calc-app', []);

app.controller('annuity-controller', function($scope, $location, $http) {
   $scope.duration = "";
   $scope.interest = "";

   $scope.debt = "";
   var leftToTypeIn = ["duration","interest rate", "amount to borrow"];

   $scope.an = reloadHint(leftToTypeIn);

   $scope.send = function() {

     if ($scope.duration.length < 1) {
       removeFromArray("duration",leftToTypeIn);
     }
     if ($scope.interest.length < 1) {
       removeFromArray("interest rate",leftToTypeIn);
     }
     if ($scope.debt.length < 1) {
       removeFromArray("amount to borrow",leftToTypeIn);
     }
     $scope.an = reloadHint(leftToTypeIn);
     if($scope.duration != "" && $scope.interest != "" && $scope.debt != "") {
     try {
         $http.get('http://172.17.0.2:3000/financing/an/'
             + $scope.debt + '/' + $scope.interest + '/' + $scope.duration
           ).then(function(response) {
             $scope.an = 'Your monthly rate is about ' + response.data.an +'.';
         });
       } catch (e) {
         $scope.an = 'We are very sorry to tell you that our service is temporarily unavailable. Please try again later.';
       }
     }
   }

  $scope.changeView = function(view) {
    $location.path(view);
  }
});


app.controller("debt-controller", function($scope, $location, $http) {
     $scope.duration = "";
     $scope.interest = "";

     $scope.an = "";
     var leftToTypeIn = ["duration","interest rate", "monthly rate"];

     $scope.debt = reloadHint(leftToTypeIn);

     $scope.send = function() {

       if ($scope.duration.length < 1) {
         removeFromArray("duration",leftToTypeIn);
       }
       if ($scope.interest.length < 1) {
         removeFromArray("interest rate",leftToTypeIn);
       }
       if ($scope.an.length < 1) {
         removeFromArray("monthly rate",leftToTypeIn);
       }
       $scope.debt = reloadHint(leftToTypeIn);
       if($scope.duration != "" && $scope.interest != "" && $scope.an != "") {
       try {
           $http.get('http://172.17.0.2:3000/financing/debt/'
               + $scope.an + '/' + $scope.interest + '/' + $scope.duration
             ).then(function(response) {
               $scope.debt = 'Your amount to borrow is about ' + response.data.debt +'.';
           });
         } catch (e) {
           $scope.debt = 'We are very sorry to tell you that our service is temporarily unavailable. Please try again later.';
         }
       }
     }

    $scope.changeView = function(view) {
      $location.path(view);
    }
});


var reloadHint = function(leftToTypeIn) {
  return "Please type in desired " + displayArray(leftToTypeIn);
}

var removeFromArray = function(str, arr) {
    var i = arr.indexOf(str)
     if(i > -1) {
       arr.splice(i,1);
     }
};

var displayArray = function(arr) {
  var r = "";
  if (arr.length > 0) r = arr[0];
  if (arr.length < 2) return r;

  for (i = 1; i < arr.length - 1; i++) {
    r = r + ", "+ arr[i];
  }
  r = r + " and " + arr[arr.length -1];
  return r;
};

var app = angular.module('app', ['ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', function ( $scope, $http ) {
  $http.get( '/api/clients')
    .then(function(response) {
      $scope.data = response.data;
    });
    
  $scope.showState = function( s ) {
    var state = [ 'None', 'Active', '', '', '', 'Login', 'Denied' ];
  
    return state[ s ];
  }
  
  $scope.showTime = function( t ) {
    var d = new Date( t ); 
    var str = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' +
    d.getHours() + ':' + d.getMinutes();  
    console.log(str);
    return str;
  }
 
  $scope.gridOptions = {
    columnDefs: [
      { name:'name'},
      { name:'email'},
      { name:'clientIP'},
      { name:'gwid' },
      { name:'lastPingTime', cellTemplate:'<div class="ui-grid-cell-contents">{{grid.appScope.showTime( row.entity.lastPingTime )}}</div>' },
      { name:'auth', cellTemplate:'<a href="/api/clients/activate?ip={{ row.entity.clientIP }}" target="_blank" class="ui-grid-cell-contents">{{grid.appScope.showState( row.entity.auth )}}</a>' }
    ],
    data: 'data'
  }
        
  $scope.data = [];

}]);
var app = angular.module('app', ['ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', function ( $scope, $http, $interval ) {
  
  timeouts = {}
  timeouts.validation = 3000;
  timeouts.expiration = 10000;
  
  $interval( function () {
    $http.get( '/api/clients')
    .then(function(response) {
      $scope.data = response.data;
    });
  }, 5000);
  
  $http.get( '/api/clients')
  .then(function(response) {
    $scope.data = response.data;
  });
    
  $scope.showState = function( s, lastPingTime ) {
    var state = [ 'None', 'Active', '', '', '', 'Login', 'Denied' ];
    var now = Date.now();
    
    if ( state == 'Login' ) {      
      if (  now > lastPingTime + timeouts.validation ) {
        state = 'Login Timeout';
      }
    } else if ( state == 'Active' ) {
      if ( now > lastPingTime + timeouts.expiration  ) {
        state = 'Session Timeout';
      }
    }
  
    return state[ s ];
  }
  
  $scope.showTime = function( t ) {
    var str = '';
    
    if ( t > 0 ) {
      var d = new Date( t ); 
      str = ( '0' + d.getDate()).slice(-2) + '-' + ( '0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear() + ' ' +
       ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);    
    }
    
    return str;
  }
 
  $scope.gridOptions = {
    columnDefs: [
      { name:'name'},
      { name:'email'},
      { name:'clientIP'},
      { name:'gwid' },
      { name:'loginTime', cellTemplate:'<div class="ui-grid-cell-contents">{{grid.appScope.showTime( row.entity.loginTime )}}</div>' },
      { name:'lastLogOutTime', cellTemplate:'<div class="ui-grid-cell-contents">{{grid.appScope.showTime( row.entity.lastLogOutTime )}}</div>' },
      { name: 'data', cellTemplate:'<div class="ui-grid-cell-contents">{{ (((row.entity.incoming ) / ( 1024 * 1024)) + ((row.entity.outgoing ) / ( 1024 * 1024))).toFixed(1) }} MB</div>'},
      { name:'lastPingTime', cellTemplate:'<div class="ui-grid-cell-contents">{{grid.appScope.showTime( row.entity.lastPingTime )}}</div>' },
      { name:'auth', cellTemplate:'<a href="/api/clients/activate?ip={{ row.entity.clientIP }}" target="_blank" class="ui-grid-cell-contents">{{grid.appScope.showState( row.entity.auth, row.entity.lastPingTime )}}</a>' }
    ],
    data: 'data'
  }
        
  $scope.data = [];

}]);
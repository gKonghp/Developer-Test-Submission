'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl',
      controllerAs: 'mainCtrl'
  });
}])

.controller('MainCtrl', ['$cookies' ,'$location',function($cookies, $location) {
  var vm = this;
  vm.taskName = null;
  vm.startTask_click = startTask;
  function startTask(){
      var tasks = $cookies.getObject("tasks");
      if(tasks == undefined || tasks == null){
        tasks = {tasks:[{id: 0, name: vm.taskName, startTime: 0, status: 1}]};
      }
      $cookies.putObject("tasks", tasks);
      $location.path("task_list");
  }
}]);
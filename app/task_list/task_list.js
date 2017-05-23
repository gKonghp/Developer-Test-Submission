'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/task_list', {
    templateUrl: 'task_list/task_list.html',
    controller: 'TaskListCtrl',
      controllerAs: 'tasksCtrl'
  });
}])

.controller('TaskListCtrl', ['$cookies' ,'$location','$interval', function($cookies, $location, $interval) {
    var vm = this;
    var tasksCookie = $cookies.getObject("tasks")||{};
    console.log(tasksCookie);
    if(tasksCookie != undefined || tasksCookie !=  null) {
        $cookies.remove('tasks');
        vm.tasks = tasksCookie.tasks;
    }
    angular.element(document).ready(function() {
        $interval(countTime, 1000);
    });

    vm.startTask_click = startTask;
    vm.finish_click = finish;
    vm.pause_click = pause;
    vm.continue_click = continueCount;
    function startTask(){
        var tasksCookie = $cookies.getObject("tasks");
        if(tasksCookie == undefined || tasksCookie == null){
            tasksCookie = {tasks:[{id: 0, name: vm.taskName, startTime: 0, status: 1}]};
        }else{
            tasksCookie.tasks.push({id: vm.tasks.length, name: vm.taskName, startTime: 0, status: 1});
        }
        vm.tasks = tasksCookie.tasks;
        $cookies.putObject("tasks", tasksCookie);

        $location.path("task_list");
        vm.taskName = "";
    }
    function continueCount(task){
      vm.tasks[task.id].status = 1;
        updateTask();
    }
    function pause(task){
      // task.status = 0;
        vm.tasks[task.id].status = 0;
        updateTask();
    }
    function finish(task){
        // task.status = 2;
        vm.tasks[task.id].status = 2;
        updateTask();
    }

    function countTime(){
      if(vm.tasks != null || vm.tasks != undefined) {
          vm.tasks.forEach(function (item) {
              if (item.status == 1) {
                  item.startTime += 1;
              }
          });
      }
    }

    function updateTask(){
        console.log(vm.tasks);
        $cookies.putObject("tasks", {tasks:vm.tasks});
    }

}]);
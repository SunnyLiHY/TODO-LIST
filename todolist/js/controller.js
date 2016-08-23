var app = angular.module("todolist",[]);
app.controller("todoCtrl",function($scope,dateFilter){

	$scope.todolist = localStorage.getItem('todolist')?angular.fromJson(localStorage.getItem('todolist')):[];

	$scope.donecount = function(){
		var count = 0;
		angular.forEach($scope.todolist,function(todo){
			if(todo.done)
				count += 1;
		});
		return count;
	};

	$scope.notdonecount = function(){
		var count = 0;
		angular.forEach($scope.todolist,function(todo){
			if(!todo.done)
				count += 1;
		});
		return count;
	};

	$scope.allDone = allDone;
	$scope.addTodo = addTodo;
	$scope.deleteTodo = deleteTodo;
	$scope.storeAll = storeAll;

	function allDone(){
		//angular有自己的生命周期。循环给一个 angular监听的变量复值时。最好还是用angular自带的循环方法。“angular.forEach”
		angular.forEach($scope.todolist,function(todo){
			todo.done = $scope.isAllDone;
		});
		$scope.storeAll();
	}

	function addTodo(){
		$scope.todolist.push({ id: maxId() + 1, text: $scope.content, done: false, time: dateFilter(new Date(), 'yyyy-MM-dd HH:mm:ss') });
        $scope.content = '';
        $scope.storeAll();
	}

	function deleteTodo(todo){
		$scope.todolist.splice($scope.todolist.indexOf(todo), 1);
        $scope.storeAll();
	}

	function storeAll(){
		localStorage.setItem('todolist', angular.toJson($scope.todolist));
	}

	function maxId(){
		for(var i=0; i<$scope.todolist.length; i++){
			for(var j=0; j<$scope.todolist.length-i-1; j++){
				if($scope.todolist[j].id>$scope.todolist[j+1].id){
					var temp = $scope.todolist[j];
					$scope.todolist[j] = $scope.todolist[j+1];
					$scope.todolist[j+1] = temp;
				}
			}
		}
		return $scope.todolist[$scope.todolist.length-1].id;
	}
	
});
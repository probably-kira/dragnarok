angular.module('ExampleApp', ['probably-kira.dragnarok']).
  controller('MainCtrl', function ($scope) {
	$scope.collection = ['img/heroes/hero1.jpg', 'img/heroes/hero2.jpg', 'img/heroes/hero3.jpg']
	$scope.otherCollection = [];
  });
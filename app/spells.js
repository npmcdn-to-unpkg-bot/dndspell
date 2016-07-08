var spellApp = angular.module('spell', []);

spellApp.controller('SpellController', function($scope, $http){
    $scope.spells= [];

    $http.get('data/spells.json')
        .success(function(results){
        		var array = [];

        		for(var spell in results){
							var obj = results[spell];
							obj.name = spell;
							array.push(obj)
						}
            $scope.spells = array;
						$scope.selectedSpell = $scope.spells[0];
        })
		.error(function(){
			alert('ruh roh');	
		});

});

var spellApp = angular.module('spell', []);

spellApp.controller('SpellController', function($scope, $http){
    $scope.spells = [];
    $scope.saved = localStorage.getItem('spells');
    $scope.savedSpells = (localStorage.getItem('spells') !== null)
    											? JSON.parse($scope.saved)
    											: [];

    $scope.saveSpell = function(){
			$scope.savedSpells.push($scope.selectedSpell);
			localStorage.setItem('spells', JSON.stringify($scope.savedSpells));
		};

    $scope.removeSpell = function(spellName){
    	var index = -1;
    	for(var i = 0; i < $scope.savedSpells.length; i++){
    		if($scope.savedSpells[i].name === spellName){
					index = i;
				}
			}
			
			if(index > -1) {
				$scope.savedSpells.splice(index, 1);
				localStorage.setItem('spells', JSON.stringify($scope.savedSpells));
			}
		};

		$scope.isSpellSaved = function(spellName){
    	for(var i = 0; i < $scope.savedSpells.length; i++){
    		if($scope.savedSpells[i].name === spellName){
    			return true;
				}
			}

			return false;
		};

		$scope.areSpellsSaved = function(){
			return $scope.savedSpells.length > 0;
		};

		$scope.clearSavedSpells = function(){
			localStorage.clear();
			$scope.savedSpells = [];
		};

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
						console.log($scope.savedSpells);
        })
		.error(function(){
			alert('ruh roh');	
		});

});

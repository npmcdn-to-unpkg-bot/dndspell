var spellApp = angular.module('spell', []);

spellApp.controller('SpellController', function($scope, $http){
    $scope.spells = [];

    $http.get('data/spells.json')
        .success(function(results){
        		var spells = [];

        		for(var spell in results){
							var jsonObject = results[spell];
							jsonObject.name = spell;
							spells.push(jsonObject)
						}

            $scope.spells = spells;
						$scope.selectedSpell = $scope.spells[0];
        })
		.error(function(){
			alert('Error loading the JSON file containing the spells.');	
		});

    $scope.favoriteSpells = (localStorage.getItem('spells') !== null)
    											? JSON.parse(localStorage.getItem('spells'))
    											: [];

    $scope.saveSpell = function(){
			$scope.favoriteSpells.push($scope.selectedSpell);
			localStorage.setItem('spells', JSON.stringify($scope.favoriteSpells));
		};

    $scope.removeSpell = function(spellName){
    	var index = -1;
    	for(var i = 0; i < $scope.favoriteSpells.length; i++){
    		if($scope.favoriteSpells[i].name === spellName){
					index = i;
				}
			}
			
			if(index > -1) {
				$scope.favoriteSpells.splice(index, 1);
				localStorage.setItem('spells', JSON.stringify($scope.favoriteSpells));
			}
		};

		$scope.isSpellSaved = function(spellName){
    	for(var i = 0; i < $scope.favoriteSpells.length; i++){
    		if($scope.favoriteSpells[i].name === spellName){
    			return true;
				}
			}

			return false;
		};

		$scope.areSpellsSaved = function(){
			return $scope.favoriteSpells.length > 0;
		};

		$scope.clearSavedSpells = function(){
			localStorage.clear();
			$scope.favoriteSpells = [];
		};
});

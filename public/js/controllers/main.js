angular.module('foodController', [])

	// inject the food service factory into our controller
	.controller('mainController', ['$scope','Foods', function($scope, Foods) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
		Foods.get()
			.success(function(data) {
				$scope.foods = data;
				$scope.loading = false;
			});


		// GET =====================================================================
		// when landing on the page, get total
		// use the service to get all the foods price

		getSum();
		
		function getSum() {
			Foods.getTotal()
				.success(function(data) {
					$scope.total = data;
					$scope.loading = false;
				});
		}

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrder = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.foods != undefined && $scope.total.tax != undefined && $scope.total.subtotal != undefined && $scope.total.subtotal != undefined) {
				$scope.loading = true;

				var orderData = { subtotal : $scope.total.subtotal,
					tax :  $scope.total.tax,
					balance : $scope.total.balance,
					items : $scope.foods

				};

				// call the create function from our service (returns a promise object)
				Foods.createOrder(orderData)

					// if successful creation, call our get function to get all the new foods
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of foods
						getSum();

					});

			}
		};


		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.foodname != undefined && $scope.formData.price != undefined && $scope.formData.description != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Foods.create($scope.formData)

					// if successful creation, call our get function to get all the new foods
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of foods
						getSum();

					});

			}
		};



		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteFood = function(id) {
			$scope.loading = true;

			Foods.delete(id)
				// if successful creation, call our get function to get all the new foods
				.success(function(data) {
					$scope.loading = false;
					$scope.foods = data; // assign our new list of foods
					getSum();
				});
		};

		// update  the    food


		// $scope.updateFood = function() {
        //
		// 	// validate the formData to make sure that something is there
		// 	// if form is empty, nothing will happen
		// 	if ($scope.formData.foodname != undefined && $scope.formData.price != undefined && $scope.formData.description != undefined) {
		// 		$scope.loading = true;
        //
		// 		// call the update  function from our service (returns a promise object)
		// 		Foods.update($scope.formData)
        //
		// 			// if successful creation, call our get function to get all the new foods
		// 			.success(function(data) {
		// 				$scope.loading = false;
		// 				$scope.formData = {}; // clear the form so our user is ready to enter another
		// 				$scope.foods = data; // assign our new list of foods
		// 				getSum();
        //
		// 			});
        //
		// 	}
		// };






	}]);
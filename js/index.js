angular.module('app', ['ngAnimate'])
.directive('infiniteScroll', function($window, $document, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			
			// Check if user initiated scroll
			var userScroll = false;
			function mouseEvent(e) { 
				userScroll = true; 
			}
			// Mozilla/Webkit 
			if(window.addEventListener) {
				document.addEventListener('DOMMouseScroll', mouseEvent, false); 
			}
			//for IE/OPERA etc 
			document.onmousewheel = mouseEvent;
									
			// infinite scrolling logic
			angular.element($window).bind("scroll", function() {
				var h = element[0].scrollHeight - $window.innerHeight;
				var offset = $window.pageYOffset;
				
				if(h == offset && userScroll) {
					$window.scrollTo(0, 0);
					userScroll = false;
					scope.viewportCounterDown = scope.viewportCounterDown + 1;
					scope.$apply();
				}
				else if(offset == 0 && userScroll) {
					$window.scrollTo(0, h);
					userScroll = false;
					scope.viewportCounterUp = scope.viewportCounterUp + 1;
					scope.$apply();
				}
			});
			
			// save viewport height to scope
			var reportValues = function() {
				scope.viewportHeight = $window.innerHeight;
				scope.$apply();
			}
			reportValues();
			$window.scrollTo(0, $window.innerHeight/2);
			angular.element($window).bind("resize", reportValues);
		}
	}
})
.directive('visible', function($window, $document, $timeout){
	return {
		restrict: 'AE',
		scope: {
			'visibleModel' : '='
		},
		link: function(scope, element, attr) {
			
			// check if element is in viewport
			var checkVisibility = function() {
				var h = $window.innerHeight;
				var box = element[0].getBoundingClientRect();
				var offset = $window.pageYOffset;
				if((offset) > (box.top + offset - h) && (offset - element[0].offsetHeight) < (box.top + offset)) {
					scope.visibleModel = true;
					scope.$apply();
				} else {
					scope.visibleModel = false;
					scope.$apply();
				}
			}
			
			// initiate
			$timeout(function(){
				checkVisibility();
			}, 1);
			
			// check on scroll and resize
			angular.element($window).bind("scroll", checkVisibility);
			angular.element($window).bind("resize", checkVisibility);		
		}
	}
})
.controller('MainController', function($scope) {
	
	$scope.message = 'Mia Yoshida';
	
	$scope.viewportCounterDown = 0;
	$scope.viewportCounterUp = 0;
	
	var count = function(num) {
		if(num > 15)
			$scope.message = 'Don\'t you have better things to do?';
		else if(num > 10)
			$scope.message = 'Still scrolling?!';
		else if(num > 7)
			$scope.message = 'Whoo hoo!';
		else if(num > 5)
			$scope.message = 'Get it now?';
		else if(num > 3)
			$scope.message = 'Try scrolling up too!';
		else if(num > 1)
			$scope.message = 'Confused? Watch your scrollbar...';
		else if(num > 0)
			$scope.message = 'Welcome back.';
	}
	
	$scope.$watch('viewportCounterDown', function(newValue, oldValue) {
		count($scope.viewportCounterDown + $scope.viewportCounterUp);
	})
	$scope.$watch('viewportCounterUp', function(newValue, oldValue) {
		count($scope.viewportCounterDown + $scope.viewportCounterUp);
	})
		
	$scope.forests = [


	 		{
                'name' : 'Design Slip',
                'summary' : 'pen and pencil, finished in Adobe Illustrator',
                'location' : 'Personal Poster, VCD2',
                'image' : 'img/pp.jpg'
        	},
            {
                'name' : 'Sit',
                'summary' : 'pen and pencil drawing',
                'location' : 'Pashley Bicycle Ad series, VCD2',
                'image' : 'img/Sit.jpg'
        	},
            {
                'name' : 'Ride',
                'summary' : 'pen and pencil drawing',
                'location' : 'Pashley Bicycle Ad series, VCD2',
                'image' : 'img/Ride.jpg'
        	},
            {
                'name' : 'Repeat',
                'summary' : 'pen and pencil drawing',
                'location' : 'Pashley Bicycle Ad series, VCD2',
                'image' : 'img/Repeat.jpg'
        	},
            {
                'name' : 'Squid',
                'summary' : ' colored pencil and pen',
                'location' : 'Typeface Style, History of Design',
                'image' : 'img/squid.jpg'
        	},
			{
                'name' : 'Hourglass',
                'summary' : 'white crayola clay and acrylic paint',
                'location' : 'Glyphs, History of Design',
                'image' : 'img/hour.png'
        	},
            {
                'name' : 'Dont Stop Me Now',
                'summary' : 'pen',
                'location' : 'Song representation, Drawing for Communication',
                'image' : 'img/dsmn.png'
        	},
            {
                'name' : 'Geography',
                'summary' : 'pen',
                'location' : 'Visual Notes, Drawing for Communicaiton',
                'image' : 'img/geography.png'
        	},
            {
                'name' : 'Carpal Tunnel Syndrome',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/carpal.jpg'
        	},
            {
                'name' : 'Delusional',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/delusional.jpg'
        	},
        	{
                'name' : 'Lack of Physical Fitness',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/fitness.jpg'
        	},
        	{
                'name' : 'Greed',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/greed.jpg'
        	},
        	{
                'name' : 'Poor Personal Hygene',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/hygene.jpg'
        	},
        	{
                'name' : 'Insomnia',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/insomnia.jpg'
        	},
        	{
                'name' : 'Isolation',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/isolation.jpg'
        	},
        	{
                'name' : 'Narcissism',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/narci.jpg'
        	},
        	{
                'name' : 'Text Language',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/text.jpg'
        	},
        	{
                'name' : 'Unhealthy Attatchments',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/unhealthy.jpg'
        	},
        	{
                'name' : 'Vision Loss',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/vision.jpg'
        	},
        	{
                'name' : 'Vitamin D Deficiency',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/vitaminD.jpg'
        	},
        	{
                'name' : 'Is It Too Late?',
                'summary' : 'pencil',
                'location' : 'Social issue series "Technology Exposure, Too Much, Too Soon?" VCD3',
                'image' : 'img/toolate.jpg',

        	},
        	{
                'name' : 'Arts and Crafts, Art Nouveau',
                'summary' : 'colored pencil and prisma colored pens',
                'location' : 'NCUR submission, History of Design',
                'image' : 'img/am.png',
        	},   
        	{
                'name' : 'Steam Boat Willie',
                'summary' : 'terricottta, mijalica and glaze',
                'location' : 'Final, Beginner Ceramics',
                'image' : 'img/steam.png',
        	},
        	{
                'name' : 'Tea Pot',
                'summary' : 'terricottta, stain and glaze',
                'location' : 'food dish, Beginner Ceramics',
                'image' : 'img/teapot.png',
        	},           	
        ];
})












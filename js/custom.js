(function ($) {

    "use strict";

        // PRE LOADER
        $(window).load(function(){
          $('.preloader').delay(500).slideUp('slow'); // set duration in brackets
        });



        $('.navbar-collapse a').on('click',function(){
          $(".navbar-collapse").collapse('hide');
        });

        $(window).scroll(function() {
          if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
              } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
              }
        });

        $(window).scroll(function() {
          if ($(this).scrollTop() > 50) {
            $('.back-to-top').fadeIn('slow');
          } else {
            $('.back-to-top').fadeOut('slow');
          }
        });

        $('.back-to-top').click(function(){
          $('html, body').animate({scrollTop : 0},800);
          return false;
        });

        // PARALLAX JS
        function initParallax() {
          $('#home').parallax("60%", 100);
          $('#about').parallax("100%", 80);

          }
        initParallax();


        // Owl Carousel
        $(function () {
                new WOW().init();
                });

          var sliderContainers = $('.cd-slider-wrapper');

        	if( sliderContainers.length > 0 ) initBlockSlider(sliderContainers);

        	function initBlockSlider(sliderContainers) {
        		sliderContainers.each(function(){
        			var sliderContainer = $(this),
        				slides = sliderContainer.children('.cd-slider').children('li'),
        				sliderPagination = createSliderPagination(sliderContainer);

        			sliderPagination.on('click', function(event){
        				event.preventDefault();
        				var selected = $(this),
        					index = selected.index();
        				updateSlider(index, sliderPagination, slides);
        			});

        			sliderContainer.on('swipeleft', function(){
        				var bool = enableSwipe(sliderContainer),
        					visibleSlide = sliderContainer.find('.is-visible').last(),
        					visibleSlideIndex = visibleSlide.index();
        				if(!visibleSlide.is(':last-child') && bool) {updateSlider(visibleSlideIndex + 1, sliderPagination, slides);}
        			});

        			sliderContainer.on('swiperight', function(){
        				var bool = enableSwipe(sliderContainer),
        					visibleSlide = sliderContainer.find('.is-visible').last(),
        					visibleSlideIndex = visibleSlide.index();
        				if(!visibleSlide.is(':first-child') && bool) {updateSlider(visibleSlideIndex - 1, sliderPagination, slides);}
        			});
        		});
        	}

        	function createSliderPagination(container){
        		var wrapper = $('<ol class="cd-slider-navigation"></ol>');
        		container.children('.cd-slider').find('li').each(function(index){
        			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
        				dot = $('<a href="#0"></a>').appendTo(dotWrapper);
        			dotWrapper.appendTo(wrapper);
        			var dotText = ( index+1 < 10 ) ? '0'+ (index+1) : index+1;
        			dot.text(dotText);
        		});
        		wrapper.appendTo(container);
        		return wrapper.children('li');
        	}

        	function updateSlider(n, navigation, slides) {
        		navigation.removeClass('selected').eq(n).addClass('selected');
        		slides.eq(n).addClass('is-visible').removeClass('covered').prevAll('li').addClass('is-visible covered').end().nextAll('li').removeClass('is-visible covered');

        		//fixes a bug on Firefox with ul.cd-slider-navigation z-index
        		navigation.parent('ul').addClass('slider-animating').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        			$(this).removeClass('slider-animating');
        		});
        	}

        	function enableSwipe(container) {
        		return ( container.parents('.touch').length > 0 );
        	}

          var $app = $('.app');
	var $img = $('.app__img');
	var $pageNav1 = $('.pages__item--1');
	var $pageNav2 = $('.pages__item--2');
  var $pageNav3 = $('.pages__item--3');

	var animation = true;
	var curSlide = 1;
	var scrolledUp = void 0,
	    nextSlide = void 0;

	var pagination = function pagination(slide, target) {
		animation = true;
		if (target === undefined) {
			nextSlide = scrolledUp ? slide - 1 : slide + 1;
		} else {
			nextSlide = target;
		}

		$('.pages__item--' + nextSlide).addClass('page__item-active');
		$('.pages__item--' + slide).removeClass('page__item-active');

		$app.toggleClass('active');
		setTimeout(function () {
			animation = false;
		}, 3000);
	};

	var navigateDown = function navigateDown() {
		if (curSlide > 1) return;
		scrolledUp = false;
		pagination(curSlide);
		curSlide++;
	};

	var navigateUp = function navigateUp() {
		if (curSlide === 1) return;
		scrolledUp = true;
		pagination(curSlide);
		curSlide--;
	};

	setTimeout(function () {
		$app.addClass('initial');
	}, 1500);

	setTimeout(function () {
		animation = false;
	}, 4500);

	$(document).on('mousewheel DOMMouseScroll', function (e) {
		var delta = e.originalEvent.wheelDelta;
		if (animation) return;
		if (delta > 0 || e.originalEvent.detail < 0) {
			navigateUp();
		} else {
			navigateDown();
		}
	});

	$(document).on("click", ".pages__item:not(.page__item-active)", function () {
		if (animation) return;
		var target = +$(this).attr('data-target');
		pagination(curSlide, target);
		curSlide = target;
	});
  var modalTrigger = $('.cd-modal-trigger'),
		transitionLayer = $('.cd-transition-layer'),
		transitionBackground = transitionLayer.children(),
		modalWindow = $('.cd-modal');

	var frameProportion = 1.78, //png frame aspect ratio
		frames = 25, //number of png frames
		resize = false;

	//set transitionBackground dimentions
	setLayerDimensions();
	$(window).on('resize', function(){
		if( !resize ) {
			resize = true;
			(!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
		}
	});

	//open modal window
	modalTrigger.on('click', function(event){
		event.preventDefault();
		transitionLayer.addClass('visible opening');
		var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;
		setTimeout(function(){
			modalWindow.addClass('visible');
		}, delay);
	});

	//close modal window
	modalWindow.on('click', '.modal-close', function(event){
		event.preventDefault();
		transitionLayer.addClass('closing');
		modalWindow.removeClass('visible');
		transitionBackground.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			transitionLayer.removeClass('closing opening visible');
			transitionBackground.off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
		});
	});

	function setLayerDimensions() {
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			layerHeight, layerWidth;

		if( windowWidth/windowHeight > frameProportion ) {
			layerWidth = windowWidth;
			layerHeight = layerWidth/frameProportion;
		} else {
			layerHeight = windowHeight*1.2;
			layerWidth = layerHeight*frameProportion;
		}

		transitionBackground.css({
			'width': layerWidth*frames+'px',
			'height': layerHeight+'px',
		});

		resize = false;
	}

})(jQuery);

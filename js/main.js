var settings = {
	slider: {
		speed: 1500,
		delay: 4000
	},
	carousel: {
		speed: 350
	}
};
(function($) {
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});
	$.fn._slider = function(options) {
		var $window = $(window),
			$this = $(this);
		if (this.length == 0) return $this;
		if (this.length > 1) {
			for (var i = 0; i < this.length; i++) $(this[i])._slider(options);
			return $this;
		}
		var current = 0,
			pos = 0,
			lastPos = 0,
			slides = [],
			$slides = $this.children('article'),
			intervalId, isLocked = false,
			i = 0;
		$this._switchTo = function(x, stop) {
			if (isLocked || pos == x) return;
			isLocked = true;
			if (stop) window.clearInterval(intervalId);
			lastPos = pos;
			pos = x;
			slides[lastPos].removeClass('top');
			slides[pos].addClass('visible').addClass('top');
			window.setTimeout(function() {
				slides[lastPos].addClass('instant').removeClass('visible');
				window.setTimeout(function() {
					slides[lastPos].removeClass('instant');
					isLocked = false;
				}, 100);
			}, options.speed);
		};
		$slides.each(function() {
			var $slide = $(this);
			slides.push($slide);
			i++;
		});
		slides[pos].addClass('visible').addClass('top');
		if (slides.length == 1) return;
		intervalId = window.setInterval(function() {
			current++;
			if (current >= slides.length) current = 0;
			$this._switchTo(current);
		}, options.delay);
	};
	$.fn._carousel = function(options) {
		var $window = $(window),
			$this = $(this);
		if (this.length == 0) return $this;
		if (this.length > 1) {
			for (var i = 0; i < this.length; i++) $(this[i])._slider(options);
			return $this;
		}
		var current = 0,
			pos = 0,
			lastPos = 0,
			slides = [],
			$slides = $this.children('article'),
			intervalId, isLocked = false,
			i = 0;
		$this._switchTo = function(x, stop) {
			if (isLocked || pos == x) return;
			isLocked = true;
			if (stop) window.clearInterval(intervalId);
			lastPos = pos;
			pos = x;
			slides[lastPos].removeClass('visible');
			window.setTimeout(function() {
				slides[lastPos].hide();
				slides[pos].show();
				window.setTimeout(function() {
					slides[pos].addClass('visible');
				}, 25);
				window.setTimeout(function() {
					isLocked = false;
				}, options.speed);
			}, options.speed);
		};
		$slides.each(function() {
			var $slide = $(this);
			slides.push($slide);
			$slide.hide();
			i++;
		});
		$this.on('click', '.next', function(event) {
			event.preventDefault();
			event.stopPropagation();
			current++;
			if (current >= slides.length) current = 0;
			$this._switchTo(current);
		}).on('click', '.previous', function(event) {
			event.preventDefault();
			event.stopPropagation();
			current--;
			if (current < 0) current = slides.length - 1;
			$this._switchTo(current);
		});
		slides[pos].show().addClass('visible');
		if (slides.length == 1) return;
	};
	(function($) {
		var $window = $(window),
			$body = $('body'),
			elem;
		$body.addClass('is-loading');
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-loading');
			}, 100);
		});
		$('form').placeholder();
		skel.on('+medium -medium', function() {
			$.prioritize('.important\\28 medium\\29', skel.breakpoint('medium').active);
		});
		if (!skel.canUse('object-fit')) $('img[data-position]').each(function() {
			var $this = $(this),
				$parent = $this.parent();
			$parent.css('background-image', 'url("' + $this.attr('src') + '")').css('background-size', 'cover').css('background-repeat', 'no-repeat').css('background-position', $this.data('position'));
			$this.css('opacity', '0');
		});
		$('.begin').on('click', function(){console.log('事件载入')})
		$('.slider')._slider(settings.slider);
		$('.carousel')._carousel(settings.carousel);
		
		elem = $('#menu').append('<a href="#menu" class="close"></a>').appendTo($body);
		elem.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			target: $body,
			visibleClass: 'is-menu-visible',
			side: 'right'
		});
	})(jQuery);
})(jQuery);
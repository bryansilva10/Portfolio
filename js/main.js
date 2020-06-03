; (function () {

	'use strict';



	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var getHeight = function () {
		var extraHeight = 0;

		if (isMobile.any()) extraHeight = 50;

		setTimeout(function () {
			$('#my-portolio-main').stop().animate({
				'height': $('.my-portolio-tab-content.active').height() + extraHeight
			});
		}, 70); //how long to re-adjust container size
	};

	var pieChart = function () {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 10,
			lineCap: 'butt',
			barColor: '#17b7e7',
			trackColor: "#000000",
			size: 160,
			animate: 1000
		});
	};

	var tabContainer = function () {
		getHeight();
		$(window).resize(function () {
			getHeight();
		})
	};

	var tabClickTrigger = function () {
		$('.my-portolio-tab-menu a').on('click', function (event) {
			event.preventDefault();
			var $this = $(this),
				data = $this.data('tab'),
				pie = $this.data('pie');

			// add/remove active class
			$('.my-portolio-tab-menu li').removeClass('active');
			$this.closest('li').addClass('active');

			$('.my-portolio-tab-content.active').addClass('animated fadeOutDown');

			setTimeout(function () {
				$('.my-portolio-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
				$('.my-portolio-tab-content[data-content="' + data + '"]').addClass('animated fadeInUp active');
				getHeight();
			}, 500); //how long to show new tab

			if (pie === 'yes') {
				setTimeout(function () {
					pieChart();
				}, 500); //
			}

		})
	};

	// Document on load.
	$(function () {
		tabContainer();
		tabClickTrigger();

	});


}());
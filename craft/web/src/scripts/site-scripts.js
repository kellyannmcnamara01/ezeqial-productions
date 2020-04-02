window.addEventListener("load", function(){


	//  ===== Scroll Throttle =====
	// * create and empty var
	var scrollThrottle;

	// * on scroll of window execute code
	$(window).bind('scroll',function(){

		// * check if scrollThrottle is null, if it is execute function and reset to null. do this every 75ms;
		// * throttling will help with the CPU and load time of a website.
		if (!scrollThrottle) {
			scrollThrottle = setTimeout(function(){
				// * call on page scroll function
				onPageScroll();
				scrollThrottle = null;
			},75);
		}
	});
	//  ===== [END] Scroll Throttle =====





	//  ===== On Page Scroll =====
	function onPageScroll(){
		// main nav banner fixed
		if ($(window).scrollTop() >= 25) {
		    $('.js--main-nav').addClass('is-scrolled');
		} else {
		    $('.js--main-nav').removeClass('is-scrolled');
		}
	}

	onPageScroll();
	//  ===== [END] On Page Scroll =====





	//  ===== Accordion =====
	$('.accordion__trigger').click(function(){
		// grabbing accordion controls and id + the accordion's panel
		var ariaControls = $(this).attr('aria-controls'),
			accordionId = $(this).attr('id'),
			accordionPanel = $('.accordion-panel[id="' + ariaControls + '"]');
			
		// change url to include selected hash
		window.location.hash = ariaControls;

		if ( $(this).attr('aria-expanded') == 'false' ) {
			$('.accordion__trigger').attr('aria-expanded', 'false');
			$('.accordion-panel').attr('aria-expanded', 'false');
			$('.accordion-panel').slideUp();

			$(this).attr('aria-expanded', 'true');
			accordionPanel.attr('aria-expanded', 'true');
			accordionPanel.slideDown();

		} else {
			$(this).attr('aria-expanded', 'false');
			accordionPanel.attr('aria-expanded', 'false');
			accordionPanel.slideUp();
		}

	});
	//  ===== [END] Accordion =====






	//  ===== Production Cards Height =====
	tallestEleHeight = 0;
	
	$('.production-card__info').each(function(){
		var eleHeight = $(this).height();

		if (eleHeight > tallestEleHeight) {
			tallestEleHeight = eleHeight;
		}

		$(this).height(tallestEleHeight);
	});
	//  ===== [END] Production Cards Height =====






	//  ===== Mobile Nav =====
	$('.hamham').click(function(){
		var ariaExpanded = $(this).attr('aria-expanded');
		console.log(ariaExpanded);

		if( ariaExpanded == 'true' ) {
			$(this).attr("aria-expanded","false");
			$('.mobile-nav').fadeOut();
		} else {
			$(this).attr("aria-expanded","true");
			$('.mobile-nav').fadeIn();
		}
	});
	//  ===== [END] Mobile Nav =====

});









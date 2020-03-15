// table of context
// -- accordion
// -- production cards height


window.addEventListener("load", function(){





	// -- accordion
	$('.accordion__trigger').click(function(){
		// grabbing accordion controls and id + the accordion's panel
		var ariaControls = $(this).attr('aria-controls'),
			accordionId = $(this).attr('id'),
			accordionPanel = $('.accordion-panel[id="' + ariaControls + '"]');

		// setting all accordions to expanded false expect the one clicked
		$('.accordion__trigger').attr('aria-expanded', false);
		$(this).attr('aria-expanded', true);

		// setting all panels to hidden true expect the one clicked
		$('.accordion-panel').attr('hidden', true);
		accordionPanel.attr('hidden', false);

		// change url to include selected hash
		window.location.hash = ariaControls;

		$('html, body').animate({
			scrollTop: $(this).offset().top - 100
		}, 1000);
	});




	// -- production cards height
	tallestEleHeight = 0;
	
	$('.production-card__info').each(function(){
		var eleHeight = $(this).height();

		if (eleHeight > tallestEleHeight) {
			tallestEleHeight = eleHeight;
		}

		$(this).height(tallestEleHeight);
	});
});
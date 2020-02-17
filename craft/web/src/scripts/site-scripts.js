// table of context
// -- accordion


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
	});
});
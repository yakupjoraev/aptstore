function tooltipBanner() {
	var tooltipContainer = document.querySelector('[data-tooltip]')
	if (!tooltipContainer) {
		return null
	}


	var popper = require('../../libs/popper.min')

	var buttons = document.querySelectorAll('[data-tooltip]');

	buttons.forEach(button => {
		var tooltip = button.querySelector('[data-tooltip-content]');

		popper.createPopper(button, tooltip, {
			placement: 'top',

			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 1],
					},
				},
			],
		});
	});


	console.log(popper);
}

tooltipBanner();




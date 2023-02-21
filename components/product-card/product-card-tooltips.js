var popper = require('../../libs/popper.min')
var tippy = require('../../libs/tippy-bundle.umd.min')

var template = document.querySelector('[data-product-card-tooltip-content]');

tippy('[data-product-card-tooltip]', {
	content: template.innerHTML,
	allowHTML: true,

	// disable arrow
	arrow: false,
	followCursor: true,
	interactive: true,
});

tippy('[data-banner-tooltip]', {
	content: template.innerHTML,
	allowHTML: true,

	// disable arrow
	arrow: false,
	followCursor: true,
	interactive: true,
});

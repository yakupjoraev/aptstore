var toArray = require('../../libs/helpers').toArray

function initPriceSelector() {
	var fields = toArray(document.querySelectorAll('[data-price-selector-field]'))

	fields.forEach(function (field) {
		var input = field.querySelector('input')

		input.addEventListener('focus', function () {
			field.classList.add('focused')
		})

		input.addEventListener('blur', function () {
			field.classList.remove('focused')
		})
	})
}

initPriceSelector()

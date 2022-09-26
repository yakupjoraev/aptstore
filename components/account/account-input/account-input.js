var toArray = require('../../../libs/helpers').toArray

function accountInput() {
	var clearButtons = toArray(document.querySelectorAll('[data-account-clear]'))

	clearButtons.forEach(function (button) {
		button.addEventListener('click', function (event) {
			var input = event.target.parentNode.querySelector('input')

			input.value = ''
			input.focus()
		})
	})
}

accountInput()

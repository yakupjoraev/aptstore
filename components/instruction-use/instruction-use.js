var show = require('../../libs/helpers').show
var hide = require('../../libs/helpers').hide

function initInstructionUse() {
	var container = document.querySelector('[data-instruction-use]')

	if (!container) return

	var input = container.querySelector('[data-instruction-use-input]')
	var content = container.querySelector('[data-instruction-use-content]')

	input.addEventListener('change', function () {
		if (input.checked) {
			show(content, 500)
		} else {
			hide(content, 500)
		}
	})
}

module.exports = initInstructionUse

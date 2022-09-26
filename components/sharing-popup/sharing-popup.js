var toArray = require('../../libs/helpers').toArray

function initSharingPopup() {
	var sharings = toArray(document.querySelectorAll('[data-sharing-popup]'))

	sharings.forEach(init)

	function init(container) {
		var open = container.querySelector('[data-sharing-popup-open]')

		open.addEventListener('click', function () {
			container.classList.toggle('open')

			if (container.classList.contains('open')) {
				window.addEventListener('click', windowClickHandler)
			} else {
				window.removeEventListener('click', windowClickHandler)
			}
		})

		function windowClickHandler(event) {
			if (!container.contains(event.target)) {
				container.classList.toggle('open')
				window.removeEventListener('click', windowClickHandler)
			}
		}
	}
}

initSharingPopup()

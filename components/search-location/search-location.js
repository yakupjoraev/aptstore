var toArray = require('../../libs/helpers').toArray

function initSearchLocation() {
	var openLocationsButton = document.querySelector('[data-location]')
	var container = document.querySelector('[data-search-location]')
	var buttons = toArray(container.querySelectorAll('[data-button]'))

	buttons.forEach(function (button) {
		button.addEventListener('click', buttonClickHandler)
	})

	function buttonClickHandler(event) {
		buttons.forEach(function (button) {
			button.classList.remove('checked')
		})

		event.target.classList.add('checked')
		openLocationsButton.innerHTML = event.target.dataset.button
		close()
	}

	container.addEventListener('click', function (event) {
		if (event.target === container) {
			close()
		}
	})

	function close() {
		container.classList.add('hide')

		container.addEventListener('transitionend', function current(event) {
			if (event.target === container) {
				container.classList.remove('hide')
				container.classList.remove('show')
				container.removeEventListener('transitionend', current)
			}
		})
	}

	openLocationsButton.addEventListener('click', function () {
		container.classList.remove('hide')
		container.classList.add('show')
	})
}

module.exports = initSearchLocation

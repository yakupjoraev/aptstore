var toArray = require('../../libs/helpers').toArray

function initDropdown() {
	var dropdowns = toArray(document.querySelectorAll('[data-dropdown]'))

	function init(dropdown) {
		var openButton = categoryContainer.querySelector('[data-dropdown-toggle]')
	}

	dropdowns.forEach(init)

	function init(dropdown) {
		var openButton = dropdown.querySelector('[data-dropdown-toggle]')

		openButton.addEventListener('click', toggleDropDownPopup)

		function toggleDropDownPopup(event) {
			dropdown.classList.toggle('active')
		}
	}

	window.addEventListener('click', function (event) {
		var target = event.target

		dropdowns.forEach(function (dropdown) {
			if (!dropdown.contains(event.target) || dropdown === target) {
				dropdown.classList.remove('active')
			}
		})
	})
}

initDropdown()

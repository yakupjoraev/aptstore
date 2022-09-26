var toArray = require('../../libs/helpers').toArray

function initBrandPage() {
	var dropdowns = toArray(document.querySelectorAll('[data-brand-page-dropdown]'))

	dropdowns.forEach(initDropDown)

	function initDropDown(dropdown) {
		var openButton = dropdown.querySelector('[data-brand-page-dropdown-toggle]')

		openButton.addEventListener('click', toggleDropDownPopup)

		function toggleDropDownPopup(event) {
			dropdown.classList.toggle('active')
		}
	}

	window.addEventListener('click', function (event) {
		dropdowns.forEach(function (dropdown) {
			if (!dropdown.contains(event.target)) {
				dropdown.classList.remove('active')
			}
		})
	})
}

initBrandPage()

var toArray = require('../../libs/helpers').toArray
var freezeBody = require('../../libs/helpers').freezeBody
var unfreezeBody = require('../../libs/helpers').unfreezeBody

function initSearchForm() {
	var exampleButtons = toArray(document.querySelectorAll('[data-fill-search-example]'))
	var container = document.querySelector('[data-search-form]')
	var searchInput = container.querySelector('[data-search-input]')
	var cancelButton = container.querySelector('[data-cancel]')
	var clearButton = container.querySelector('[data-clear]')
	var keepActive = false

	exampleButtons.forEach(function (button) {
		button.addEventListener('click', exampleButtonClickHandler)
	})

	cancelButton.addEventListener('click', function () {
		searchInput.value = ''
		toggle()
	})

	clearButton.addEventListener('click', function () {
		keepActive = true
		searchInput.value = ''
		searchInput.focus()
	})

	function exampleButtonClickHandler(event) {
		var value = event.target.dataset.fillSearchExample

		console.log(value)
	}

	searchInput.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			container.classList.remove('active')
			unfreezeBody()
		}
	})

	searchInput.addEventListener('input', toggle)
	searchInput.addEventListener('focus', toggle)

	function toggle() {
		if (searchInput.value.length > 2 || keepActive) {
			container.classList.add('active')
			freezeBody()

			if (searchInput.value.length > 2) {
				keepActive = false
			}
		} else {
			container.classList.remove('active')
			unfreezeBody()
		}
	}

	window.addEventListener('click', function (event) {
		if (event.target !== container && !container.contains(event.target)) {
			container.classList.remove('active')
			unfreezeBody()
		}
	})
}

module.exports = initSearchForm

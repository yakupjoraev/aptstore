function initTownSelector() {
	var container = document.querySelector('[data-town-selector]')

	container.addEventListener('input', function (event) {
		if (event.target.matches('[name="search-town"]')) {
			event.target.value.length
				? event.target.classList.add('notempty')
				: event.target.classList.remove('notempty')
		}
	})

	container.addEventListener('click', function (event) {
		if (event.target.matches('[data-clear]')) {
			var input = container.querySelector('[name="search-town"]')

			input.value = ''
			input.focus()
			input.classList.remove('notempty')
		}
	})
}

module.exports = initTownSelector

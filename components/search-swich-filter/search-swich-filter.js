function searchSwitchFilter(argument) {
	var container = document.querySelector('.search-swich-filter__swich')

	if (!container) {
		return null
	}

	var burger = document.querySelector('.search-swich-filter__burger')

	burger.addEventListener('click', () => {
		container.classList.toggle('active')
	})

	document.addEventListener('click', function (event) {
		if (event.target !== container && !container.contains(event.target)) {
			container.classList.remove('active')
		}
	})
}

searchSwitchFilter()

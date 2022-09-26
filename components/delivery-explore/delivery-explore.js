function deliveryExplore(argument) {
	var container = document.querySelector('.delivery-explore__swich')

	if (!container) {
		return null
	}

	var burger = document.querySelector('.delivery-explore__burger')

	burger.addEventListener('click', () => {
		container.classList.toggle('active')
	})

	document.addEventListener('click', function (event) {
		if (event.target !== container && !container.contains(event.target)) {
			container.classList.remove('active')
		}
	})
}

deliveryExplore()

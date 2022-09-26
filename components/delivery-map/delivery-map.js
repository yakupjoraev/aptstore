function deliveryMap() {
	var container = document.querySelector('[data-delivery-map]')

	if (!container) {
		return null
	}

	var map = container.querySelector('[data-delivery-map-map]')
	var tooltip = container.querySelector('[data-delivery-map-tooltip]')
	var close = container.querySelector('[data-delivery-map-close]')

	map.addEventListener('click', function (event) {
		if (event.target === map) {
			tooltip.classList.add('active')
		}
	})

	close.addEventListener('click', function () {
		tooltip.classList.toggle('active')
	})

	tooltip.addEventListener('click', function (event) {
		if (event.target === tooltip) {
			tooltip.classList.toggle('active')
		}
	})
}

deliveryMap()

function initCatalogList() {
	var openButton = document.querySelector('[data-open-catalog]')
	var container = document.querySelector('[data-catalog-list]')
	var categories = container.querySelector('[data-categories]')
	var openHistory = []
	var subcategory
	var isOpen = false

	openButton.addEventListener('click', function () {
		if (!isOpen) {
			isOpen = true
			openButton.classList.add('active')
			container.classList.add('show')
			categories.classList.remove('hide')
			categories.classList.add('show')
			window.addEventListener('keydown', keyDownHandler)

			if (subcategory) {
				subcategory.classList.remove('show')
				subcategory.classList.remove('hide')
				subcategory = null
			}
		} else {
			close()
		}
	})

	container.addEventListener('click', function (event) {
		if (event.target.matches('[data-open-subcategory]') && !event.metaKey && !event.ctrlKey) {
			if (subcategory) {
				subcategory.classList.add('slide')
				openHistory.push(subcategory)
			} else {
				categories.classList.add('hide')
			}

			subcategory = container.querySelector('[data-subcategory="' + event.target.dataset.openSubcategory + '"]')
			subcategory.classList.add('show')
			event.preventDefault()
		}

		if (event.target.matches('[data-back]')) {
			subcategory.classList.remove('show')
			subcategory.classList.remove('slide')

			if (openHistory.length) {
				subcategory = openHistory.pop()
				subcategory.classList.remove('slide')
			} else {
				categories.classList.remove('hide')
				subcategory = null
			}
		}

		if (event.target.matches('[data-close]') || event.target === container) {
			close()
		}
	})

	function keyDownHandler(event) {
		if (event.keyCode === 27) {
			close()
		}
	}

	function close() {
		openButton.classList.remove('active')
		categories.classList.remove('hide')
		categories.classList.remove('show')
		container.classList.remove('show')
		window.removeEventListener('keydown', keyDownHandler)
		isOpen = false
		openHistory.forEach(function (category) {
			category.classList.remove('show')
			category.classList.remove('slide')
		})
		openHistory.splice(0)

		if (subcategory) {
			subcategory.classList.add('hide')
		}
	}
}

module.exports = initCatalogList

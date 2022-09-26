function initShopCategorySorting() {
	var sortingContainer = document.querySelector('[data-shop-category-sorting]')

	if (!sortingContainer) {
		return null
	}

	var sortingToggleButton = sortingContainer.querySelector('[data-shop-category-sorting-toggle]')
	var isSortingOpen = false

	sortingToggleButton.addEventListener('click', toggleSortingPopup)
	sortingContainer.addEventListener('click', function (event) {
		if (event.target === sortingContainer) {
			toggleSortingPopup()
		}
	})

	function toggleSortingPopup() {
		sortingContainer.classList.toggle('active')
		isSortingOpen = !isSortingOpen
	}

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			if (isSortingOpen) {
				toggleSortingPopup()
			}
		}
	})
}

initShopCategorySorting()

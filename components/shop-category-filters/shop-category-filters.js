function initShopCategoryFilters() {
	var filtersContainer = document.querySelector('[data-shop-category-filters]')

	if (!filtersContainer) {
		return null
	}

	var filterToggleButton = filtersContainer.querySelector('[data-shop-category-filter-toggle]')
	var isFilterOpen = false

	filterToggleButton.addEventListener('click', toggleFilterPopup)
	filtersContainer.addEventListener('click', function (event) {
		if (event.target === filtersContainer) {
			toggleFilterPopup()
		}
	})

	function toggleFilterPopup() {
		filtersContainer.classList.toggle('active')
		isFilterOpen = !isFilterOpen
	}

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			if (isFilterOpen) {
				toggleSortingPopup()
			}
		}
	})
}

initShopCategoryFilters()

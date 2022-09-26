function initShopCategory() {
	var categoryContainer = document.querySelector('[data-shop-category-category]')

	if (!categoryContainer) return

	var openButton = categoryContainer.querySelector('[data-shop-category-toggle]')
	var isCategoryOpen = false

	openButton.addEventListener('click', toggleCategoryPopup)
	categoryContainer.addEventListener('click', function (event) {
		if (event.target === categoryContainer) {
			toggleCategoryPopup()
		}
	})

	function toggleCategoryPopup() {
		categoryContainer.classList.toggle('active')
		isCategoryOpen = !isCategoryOpen
	}

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			if (isCategoryOpen) {
				toggleCategoryPopup()
			}
		}
	})
}

module.exports = initShopCategory

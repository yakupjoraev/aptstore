function initBrandSearchIndex() {
	var searchInput = document.querySelector('[data-brand-search-index-input]')
	var searchResult = document.querySelector('[data-brand-search-index-result]')
	var searchClear = document.querySelector('[data-brand-search-index-clear]')

	if (searchInput && searchResult) {
		searchInput.addEventListener('input', function () {
			searchResult.style.display = searchInput.value.length > 2 ? 'block' : 'none'
		})

		if (searchClear) {
			searchClear.addEventListener('click', function () {
				searchInput.value = ''
				searchResult.style.display = 'none'
				searchInput.focus()
			})
		}
	}
}

initBrandSearchIndex()

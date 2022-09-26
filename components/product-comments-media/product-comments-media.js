function initProductCommentsMedia() {
	var toArray = require('../../libs/helpers').toArray
	var debounce = require('../../libs/helpers').debounce
	var getStyle = require('../../libs/helpers').getStyle
	var container = document.querySelector('[data-product-comments-media]')

	if (!container) {
		return null
	}

	var items = toArray(container.childNodes).filter(function (child) { return child.nodeType === 1 })

	if (!items.length) {
		return null
	}

	container.style.counterReset = 'product-comment-photo ' + (items.length + 1)

	function resizeHandler() {
		if (!visible(container)) {
			return null
		}

		var itemWidth = parseInt(getStyle(items[0]).marginLeft) * 2 + items[0].offsetWidth
		var itemsInLine = Math.floor(container.offsetWidth / itemWidth)

		items.forEach(function (item) {
			item.classList.remove('last-visible')
		})

		if (items.length > itemsInLine) {
			items[itemsInLine - 1].classList.add('last-visible')
		}
	}

	function visible(element) {
		return element.offsetWidth > 0 || element.offsetHeight > 0
	}

	window.addEventListener('resize', debounce(resizeHandler, 16))
	window.addEventListener('click', debounce(resizeHandler, 16))
	resizeHandler()
}

initProductCommentsMedia()

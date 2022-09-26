var toArray = require('../../libs/helpers').toArray
var show = require('../../libs/helpers').show
var hide = require('../../libs/helpers').hide

function initProductTabs() {
	var container = document.body.querySelector('[data-product-tabs]')

	if (!container) {
		return null
	}

	var tabs = toArray(container.querySelectorAll('[data-product-tabs-input]'))
	var sections = toArray(container.querySelectorAll('[data-product-tabs-section]'))
	var mediaQueryList = matchMedia('(min-width: 768px)')
	var active = 0

	function init() {
		tabs.forEach(function (tab) {
			tab.addEventListener('click', tabInputHandler)
		})

		if (active !== null) {
			sections[active].style.display = 'block'
		}
	}

	function destroy() {
		tabs.forEach(function (tab) {
			tab.removeEventListener('click', tabInputHandler)
		})
	}

	function tabInputHandler(event) {
		var value = Number(event.target.value)

		if (active !== null) {
			hide(sections[active], 500)
		}

		if (value === active) {
			event.target.checked = false
			active = null
		} else {
			active = value
		}

		if (active !== null) {
			show(sections[active], 500)
		}
	}

	function mediaQueryHandler(event) {
		if (event.matches) {
			destroy()

			if (active === null) {
				active = 0
			}

			tabs[active].checked = true
		} else {
			init()
		}
	}

	mediaQueryList.addEventListener('change', mediaQueryHandler)
	mediaQueryHandler(mediaQueryList)
}

initProductTabs()

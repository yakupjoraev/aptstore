function shopTerminal() {
	var actionPanel = document.querySelector('[data-shop-terminal-action-panel]')

	if (!actionPanel) {
		return null
	}

	var container = document.querySelector('[data-shop-terminal]')
	var containerClientRect
	var scrollTop
	var containerOffsetTop

	function resizeHandler() {
		containerClientRect = container.getBoundingClientRect()
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0
		containerOffsetTop = containerClientRect.top + scrollTop

		scrollHandler()
	}

	function scrollHandler() {
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0

		if (scrollTop + window.innerHeight > containerOffsetTop + container.offsetHeight + 100) {
			actionPanel.classList.add('hidden')
		} else {
			actionPanel.classList.remove('hidden')
		}
	}

	resizeHandler()

	window.addEventListener('scroll', scrollHandler)
	window.addEventListener('resize', resizeHandler)
}

shopTerminal()

// var toArray = require('../../libs/helpers').toArray
// var createElement = require('../../libs/helpers').createElement
// var BaseSlider = require('../base-slider/base-slider')

// function shopTerminalModalInit(selector) {
// 	var container = document.querySelector(selector)
// 	var content = container.querySelector('[data-shop-terminal-slider-content]')
// 	var slides = toArray(content.childNodes).filter(function (node) { return node.nodeType === 1 })
// 	var paginations = toArray(container.querySelectorAll('[data-shop-terminal-pagination]'))
// 	var previousButton = createElement({
// 		name: 'button',
// 		attrs: {
// 			type: 'button',
// 			class: 'shop-terminal-modal__button shop-terminal-modal__button--previous',
// 			'data-previous': ''
// 		},
// 		children: ['Предыдущий']
// 	})[0]
// 	var nextButton = createElement({
// 		name: 'button',
// 		attrs: {
// 			type: 'button',
// 			class: 'shop-terminal-modal__button shop-terminal-modal__button--next',
// 			'data-next': ''
// 		},
// 		children: ['Следующий']
// 	})[0]
// 	var pageContainer = createElement({
// 		name: 'div',
// 		attrs: {
// 			class: 'shop-terminal-modal__pages'
// 		}
// 	})[0]
// 	var pageButton = createElement({
// 		name: 'button',
// 		attrs: {
// 			type: 'button',
// 			class: 'shop-terminal-modal__page',
// 			'data-slide': ''
// 		}
// 	})[0]
// 	var activePage = createElement({
// 		name: 'span',
// 		attrs: {
// 			class: 'shop-terminal-modal__page-active'
// 		}
// 	})[0]
// 	var previousButtons = []
// 	var nextButtons = []
// 	var pageContainers = []

// 	paginations.forEach(function (pagination) {
// 		var previousClone = previousButton.cloneNode(true)
// 		var pageContainerClone = pageContainer.cloneNode(true)
// 		var nextClone = nextButton.cloneNode(true)

// 		previousButtons.push(previousClone)
// 		pageContainers.push(pageContainerClone)
// 		nextButtons.push(nextClone)

// 		pagination.appendChild(previousClone)
// 		pagination.appendChild(pageContainerClone)
// 		pagination.appendChild(nextClone)
// 	})

// 	var slider = new BaseSlider({
// 		container: container,
// 		content: content,
// 		matchMediaQueries: [
// 			'(max-width: 1023px)',
// 			'(min-width: 1024px) and (max-width: 1199px)',
// 			'(min-width: 1200px)'
// 		],
// 		onSlide: function (index, length) {
// 			updatePages(index, length)
// 			previousButtons.forEach(function (previousButton) {
// 				previousButton.disabled = !index
// 			})
// 			nextButtons.forEach(function (nextButton) {
// 				nextButton.disabled = index === length - 1
// 			})
// 		},
// 		calcLayout: function (matchedMediaQueryIndex, index) {
// 			var length = 0

// 			switch (matchedMediaQueryIndex) {
// 				case 0:
// 					length = Math.ceil(slides.length / 2)

// 					break
// 				case 1:
// 					length = Math.ceil(slides.length / 3)

// 					break
// 				case 2:
// 					length = Math.ceil(slides.length / 4)

// 					break
// 			}

// 			updatePages(index, length)

// 			return length
// 		}
// 	})

// 	function updatePages(index, length) {
// 		pageContainers.forEach(function (pageContainer) {
// 			var page
// 			var pageElement

// 			pageContainer.innerHTML = ''

// 			for (page = 0; page < length; page++) {
// 				if (page === index) {
// 					pageElement = activePage.cloneNode()
// 				} else {
// 					pageElement = pageButton.cloneNode()
// 					pageElement.setAttribute('data-slide', page)
// 				}

// 				pageElement.appendChild(document.createTextNode(page + 1))
// 				pageContainer.appendChild(pageElement)
// 			}
// 		})
// 	}

// 	container.addEventListener('click', function (event) {
// 		if (event.target.matches('[data-choose]') || event.target.closest('[data-choose]')) {
// 			closeModal()
// 		}
// 	})
// }

// // window.shopTerminalModalInit = shopTerminalModalInit;
// shopTerminalModalInit('.shop-terminal-modal');





var toArray = require('../../libs/helpers').toArray
var createElement = require('../../libs/helpers').createElement
var BaseSlider = require('../base-slider/base-slider')

function shopTerminalModalInit() {
	var shopTerminalSlider = document.querySelector('[data-shop-terminal-slider]')

	// if (!shopTerminalSlider) {
	// 	return null
	// }

	init(shopTerminalSlider)

	function init(container) {
		if (!container) {
			return null
		}

		var content = container.querySelector('[data-shop-terminal-slider-content]')

		if (!content) {
			return null
		}
		var slides = toArray(content.childNodes).filter(function (node) { return node.nodeType === 1 })
		var paginations = toArray(container.querySelectorAll('[data-shop-terminal-pagination]'))
		var previousButton = container.querySelector("button[data-previous]");

		if (!previousButton) {
			previousButton = createElement({
				name: 'button',
				attrs: {
					type: 'button',
					class: 'shop-terminal-modal__button shop-terminal-modal__button--previous',
					'data-previous': ''
				},
				children: ['Предыдущий']
			})[0];
			// container.appendChild(previousButton);
		}

		var nextButton = container.querySelector("button[data-next]");

		if (!nextButton) {
			nextButton = createElement({
				name: 'button',
				attrs: {
					type: 'button',
					class: 'shop-terminal-modal__button shop-terminal-modal__button--next',
					'data-next': ''
				},
				children: ['Следующий']
			})[0];
			// container.appendChild(nextButton);
		}

		var pageContainer = createElement({
			name: 'div',
			attrs: {
				class: 'shop-terminal-modal__pages'
			}
		})[0]


		var pageButton = createElement({
			name: 'button',
			attrs: {
				type: 'button',
				class: 'shop-terminal-modal__page',
				'data-slide': ''
			}
		})[0]


		var activePage = createElement({
			name: 'span',
			attrs: {
				class: 'shop-terminal-modal__page-active'
			}
		})[0]


		var previousButtons = []
		var nextButtons = []
		var pageContainers = []

		paginations.forEach(function (pagination) {
			var previousClone = previousButton.cloneNode(true)
			var pageContainerClone = pageContainer.cloneNode(true)
			var nextClone = nextButton.cloneNode(true)

			previousButtons.push(previousClone)
			pageContainers.push(pageContainerClone)
			nextButtons.push(nextClone)

			pagination.innerHTML = ''
			pagination.appendChild(previousClone)
			pagination.appendChild(pageContainerClone)
			pagination.appendChild(nextClone)
		})

		var slider = new BaseSlider({
			container: container,
			content: content,
			matchMediaQueries: [
				'(max-width: 1023px)',
				'(min-width: 1024px) and (max-width: 1199px)',
				'(min-width: 1200px)'
			],
			onSlide: function (index, length) {
				updatePages(index, length)
				previousButtons.forEach(function (previousButton) {
					previousButton.disabled = !index
				})
				nextButtons.forEach(function (nextButton) {
					nextButton.disabled = index === length - 1
				})
			},
			calcLayout: function (matchedMediaQueryIndex, index) {
				var length = 0

				switch (matchedMediaQueryIndex) {
					case 0:
						length = Math.ceil(slides.length / 2)

						break
					case 1:
						length = Math.ceil(slides.length / 3)

						break
					case 2:
						length = Math.ceil(slides.length / 4)

						break
				}

				updatePages(index, length)

				return length
			}


		})

		// не знаю \ может надо убрать rerurn
		// return slider;

		function updatePages(index, length) {
			pageContainers.forEach(function (pageContainer) {
				var page
				var pageElement

				pageContainer.innerHTML = ''

				for (page = 0; page < length; page++) {
					if (page === index) {
						pageElement = activePage.cloneNode()
					} else {
						pageElement = pageButton.cloneNode()
						pageElement.setAttribute('data-slide', page)
					}

					pageElement.appendChild(document.createTextNode(page + 1))
					pageContainer.appendChild(pageElement)
				}
			})
		}



		window.shopTerminalModalInit = function (container) {
			var slider = init(container)


			// Не знаю точно что он должен возврашать
			return slider
		}

	}

}
module.exports = shopTerminalModalInit

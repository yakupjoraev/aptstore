var toArray = require('../../libs/helpers').toArray
var touchable = require('../../libs/helpers').touchable

function initBannerSlider() {
	var containers = toArray(document.querySelectorAll('[data-banner-slider]'))

	containers.forEach(initSlider)

	function initSlider(container) {
		var content = container.querySelector('[data-content]')
		var slides = toArray(content.childNodes).filter(function (node) { return node.nodeType === 1 })
		var previousButton = document.createElement('button')
		var nextButton = document.createElement('button')
		var buttons = document.createElement('div')
		var current = 0
		var dots = []

		previousButton.className = 'banner-slider__button banner-slider__button--previous'
		nextButton.className = 'banner-slider__button banner-slider__button--next'
		buttons.className = 'banner-slider__buttons'

		previousButton.type = 'button'
		nextButton.type = 'button'
		previousButton.appendChild(document.createTextNode('Предыдущий'))
		nextButton.appendChild(document.createTextNode('Следующий'))
		container.appendChild(previousButton)
		container.appendChild(nextButton)
		container.appendChild(buttons)
		previousButton.disabled = true

		slides.forEach(function (slide, index) {
			var dot = document.createElement('button')

			dot.type = 'button'
			dot.className = 'banner-slider__dot' + (!index ? ' banner-slider__dot--active' : '')
			dot.setAttribute('data-index', index)
			dot.addEventListener('click', slideItem)
			buttons.appendChild(dot)
			dots.push(dot)
		})

		buttons.style.width = slides.length * 70 + 'px'

		function slideNext() {
			if (current < slides.length - 1) {
				slide(current + 1)
			}
		}

		function slidePrevious() {
			if (current > 0) {
				slide(current - 1)
			}
		}

		function slideItem(event) {
			var index = Number(event.target.dataset.index)

			slide(index)
		}

		function slide(next) {
			current = next

			previousButton.disabled = current === 0
			nextButton.disabled = current === slides.length - 1
			move(-current * 100 + '%')

			dots.forEach(function (dot, index) {
				dot.className = 'banner-slider__dot' + (index === next ? ' banner-slider__dot--active' : '')
			})
		}

		function move(value) {
			var matched = value.match(/^(?<value>\-?\d+)px$/)
			var translate = value

			if (matched) {
				var shift = Number(matched.groups.value)

				if (shift > 0) {
					translate = Math.sqrt(shift) + 'px'
				} else if (-shift > (slides.length - 1) * slides[0].offsetWidth) {
					var diff = Math.sqrt(-shift - (slides.length - 1) * slides[0].offsetWidth)

					translate = (slides.length - 1) * -slides[0].offsetWidth - diff + 'px'
				}
			}

			content.style.transform = 'translateX(' + translate + ')'
		}

		previousButton.addEventListener('click', slidePrevious)
		nextButton.addEventListener('click', slideNext)

		if (slides.length === 1) {
			previousButton.style.display = 'none'
			nextButton.style.display = 'none'
		}

		var unbind = touchable(container)

		container.addEventListener('pointer-move', function (event) {
			content.style.transition = 'transform 0s linear'
			move(-current * container.offsetWidth - event.delta + 'px')
		})
		container.addEventListener('pointer-slide-left', function () {
			content.style.transition = ''

			if (current > 0) {
				slide(current - 1)
			} else {
				slide(current)
			}
		})
		container.addEventListener('pointer-slide-right', function () {
			content.style.transition = ''

			if (current < slides.length - 1) {
				slide(current + 1)
			} else {
				slide(current)
			}
		})
		container.addEventListener('pointer-slide-current', function () {
			content.style.transition = ''
			slide(current)
		})
	}
}

module.exports = initBannerSlider

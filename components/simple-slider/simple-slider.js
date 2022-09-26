var toArray = require('../../libs/helpers').toArray
var getStyle = require('../../libs/helpers').getStyle
var createElement = require('../../libs/helpers').createElement
var BaseSlider = require('../base-slider/base-slider')

function initSimpleSlider() {
	var sliders = toArray(document.querySelectorAll('[data-simple-slider]'))

	sliders.forEach(init)

	function init(slider) {
		var content = slider.querySelector('[data-simple-slider-content]')
		var previousButton = createElement({
			name: 'button',
			attrs: {
				type: 'button',
				class: 'simple-slider__button simple-slider__button--previous',
				'data-previous': ''
			},
			children: ['Предыдущий']
		})[0]
		var nextButton = createElement({
			name: 'button',
			attrs: {
				type: 'button',
				class: 'simple-slider__button simple-slider__button--next',
				'data-next': ''
			},
			children: ['Следующий']
		})[0]
		var slides = toArray(content.childNodes).filter(function (node) { return node.nodeType === 1 })

		slider.classList.add('initiated')
		slider.appendChild(previousButton)
		slider.appendChild(nextButton)

		var slider = new BaseSlider({
			container: slider,
			content: content,
			matchMediaQueries: [
				'(max-width: 767px)',
				'(min-width: 768px) and (max-width: 1023px)',
				'(min-width: 1024px) and (max-width: 1199px)',
				'(min-width: 1200px)'
			],
			onSlide: function (index, length) {
				if (length === 1) {
					previousButton.style.display = 'none'
					nextButton.style.display = 'none'
				} else {
					previousButton.style.display = ''
					nextButton.style.display = ''
				}

				previousButton.disabled = !index
				nextButton.disabled = index === length - 1
			},
			calcLayout: function (matchedMediaQueryIndex) {
				var length = 0

				switch (matchedMediaQueryIndex) {
					case 0:
					case 2:
						length = Math.ceil(slides.length / 3)

						break
					case 1:
						length = Math.ceil(slides.length / 2)

						break
					case 3:
						length = Math.ceil(slides.length / 4)

						break
				}

				return length
			}
		})
	}
}

module.exports = initSimpleSlider

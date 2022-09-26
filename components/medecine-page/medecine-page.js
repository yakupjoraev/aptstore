var BaseSlider = require('../base-slider/base-slider')
var toArray = require('../../libs/helpers').toArray
var getStyle = require('../../libs/helpers').getStyle

function medecinePage() {
	var container = document.querySelector('[data-medecine-page-products]')

	if (!container) {
		return null
	}

	var content = container.querySelector('[data-medecine-page-products-content]')
	var buttons = container.querySelector('[data-medecine-page-products-buttons]')
	var slides = toArray(content.childNodes).filter(function (node) { return node.nodeType === 1 })
	var slideStyles = getStyle(slides[0])
	var slideHeight = (slides[0].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom)) * 2
	var isMobile = true
	var cardsOnSlide = 4
	var slider = new BaseSlider({
		container: container,
		content: content,
		length: 2,
		matchMediaQueries: [
			'(max-width: 479px)',
			'(min-width: 480px) and (max-width: 599px)',
			'(min-width: 600px) and (max-width: 767px)',
			'(min-width: 768px) and (max-width: 1023px)',
			'(min-width: 1024px) and (max-width: 1199px)',
			'(min-width: 1200px)'
		],
		transform: function (index) {
			content.style.maxHeight = calcHeight(index) + 'px'
			slides.forEach(function (slide, current) {
				slide.style.visibility = current < (index + 1) * cardsOnSlide ? 'visible' : 'hidden'
			})
		},
		onSlide: function (index, length) {
			if (index === length - 1) {
				buttons.style.display = 'none'
			}
		},
		calcLayout: function (matchedMediaQueryIndex, index) {
			var length = Math.ceil(slides.length / cardsOnSlide)

			cardsOnSlide = 4
			isMobile = false
			slideStyles = getStyle(slides[0])
			slideHeight = (slides[0].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom))

			switch (matchedMediaQueryIndex) {
				case 0:
				case 1:
					isMobile = true
					slideHeight = calcHeight(index)

					break
				case 2:
				case 3:
					cardsOnSlide = 3
					length = Math.ceil(slides.length / cardsOnSlide)

					break
				case 5:
					cardsOnSlide = 5
					length = Math.ceil(slides.length / cardsOnSlide)
			}

			return length
		}
	})


	function calcHeight(index) {
		var i = 0
		var height = 0
		var slideStyles
		var length = ((typeof index === 'undefined' ? (slider || {}).index : index) + 1) * cardsOnSlide

		for (; i < length; i++) {
			if (i % (isMobile ? cardsOnSlide / 2 : cardsOnSlide) === 0) {
				slideStyles = getStyle(slides[i])
				height += slides[i].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom)
			}
		}

		return height
	}

	window.addEventListener('resize', function () {
		content.style.maxHeight = calcHeight() + 'px'
	})
}

medecinePage()

var toArray = require('../../libs/helpers').toArray
var touchable = require('../../libs/helpers').touchable
var startAnimation = require('../../libs/helpers').startAnimation
var easeInOut = require('../../libs/helpers').easeInOut
var BaseSlider = require('../base-slider/base-slider')

function productPreview() {
	var container = document.querySelector('[data-product-preview]')

	if (!container) {
		return null
	}

	var thumbnailsContainer = container.querySelector('[data-product-preview-thumbnails-wrapper]')
	var thumbnailsContent = container.querySelector('[data-product-preview-thumbnails-content]')
	var thumbnailsButtonUp = container.querySelector('[data-product-preview-thumbnails-up]')
	var thumbnailsButtonDown = container.querySelector('[data-product-preview-thumbnails-down]')
	var indicators = toArray(container.querySelectorAll('[data-product-preview-indicator]'))
	var content = container.querySelector('[data-product-preview-content]')
	var slides = toArray(content.querySelectorAll('[data-product-preview-slide]'))
	var slider = new BaseSlider({
		container: container,
		content: content,
		length: slides.length,
		onSlide: function (index) {
			indicators.forEach(function (indicator, slide) {
				indicator.classList[slide === index ? 'add' : 'remove']('active')
			})
		}
	})
	var unbind = touchable(container)

	function move(shift) {
		var translate = shift

		if (shift > 0) {
			translate = Math.sqrt(shift)
		} else if (-shift > (slides.length - 1) * slides[0].offsetWidth) {
			var delta = Math.sqrt(-shift - (slides.length - 1) * slides[0].offsetWidth)

			translate = (slides.length - 1) * -slides[0].offsetWidth - delta
		}

		content.style.transform = 'translateX(' + translate + 'px)'
	}
	container.addEventListener('pointer-move', function (event) {
		content.style.transition = 'transform 0s linear'
		move(-slider.index * container.offsetWidth - event.delta)
	})
	container.addEventListener('pointer-slide-left', function () {
		content.style.transition = ''

		if (slider.index > 0) {
			slider.slidePrevious()
		} else {
			slider.slide(slider.index)
		}
	})
	container.addEventListener('pointer-slide-right', function () {
		content.style.transition = ''

		if (slider.index < slider.length - 1) {
			slider.slideNext()
		} else {
			slider.slide(slider.index)
		}
	})
	container.addEventListener('pointer-slide-current', function () {
		content.style.transition = ''
		slider.slide(slider.index)
	})

	function thumbnailsScrollHandler() {
		if (thumbnailsContainer.scrollTop > 0) {
			thumbnailsButtonUp.classList.remove('scrolled')
		} else {
			thumbnailsButtonUp.classList.add('scrolled')
		}

		if (Math.ceil(thumbnailsContainer.scrollTop + thumbnailsContainer.offsetHeight) >= thumbnailsContent.offsetHeight) {
			thumbnailsButtonDown.classList.add('scrolled')
		} else {
			thumbnailsButtonDown.classList.remove('scrolled')
		}
	}

	thumbnailsContainer.addEventListener('scroll', thumbnailsScrollHandler)
	thumbnailsScrollHandler()

	thumbnailsButtonUp.addEventListener('click', function () {
		var scrollTop = thumbnailsContainer.scrollTop

		startAnimation(150, function (progress) {
			thumbnailsContainer.scrollTop = scrollTop - easeInOut(progress) * 100
		})
	})

	thumbnailsButtonDown.addEventListener('click', function () {
		var scrollTop = thumbnailsContainer.scrollTop

		startAnimation(150, function (progress) {
			thumbnailsContainer.scrollTop = scrollTop + easeInOut(progress) * 100
		})
	})

}

productPreview()

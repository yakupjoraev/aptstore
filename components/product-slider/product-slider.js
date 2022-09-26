var toArray = require('../../libs/helpers').toArray
var getStyle = require('../../libs/helpers').getStyle
var createElement = require('../../libs/helpers').createElement
var BaseSlider = require('../base-slider/base-slider')

function initProductSlider() {
	var sliderNodes = toArray(document.querySelectorAll('[data-product-slider]'))
	var sliders = []
	var isMobile = false

	sliderNodes.forEach(init)

	function init(container) {
		var content = container.querySelector("[data-product-slider-content]");
		var previousButton = container.querySelector("button[data-previous]");
		if(!previousButton)
		{
				previousButton = createElement({
					name: "button",
					attrs: {
						type: "button",
						class: "product-slider__button product-slider__button--previous",
						"data-previous": ""
					},
					children: ["\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439"]
				})[0];
				container.appendChild(previousButton);
		}
		var nextButton = container.querySelector("button.product-slider__button--next");
		if(!nextButton)
		{
				nextButton = createElement({
					name: "button",
					attrs: {
						type: "button",
						class: "product-slider__button product-slider__button--next",
						"data-next": ""
					},
					children: ["\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439"]
				})[0];
				container.appendChild(nextButton);
		}
		var readmoreButton = container.querySelector("button.product-slider__readmore");
		if(!readmoreButton)
		{
				var readmoreButton = createElement({
					name: "button",
					attrs: {
						type: "button",
						class: "product-slider__readmore",
						"data-next": ""
					},
					children: ["\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451"]
				})[0];
				container.appendChild(readmoreButton);
		}
		var slides = toArray(content.childNodes).filter(function(node) {
			return node.nodeType === 1;
		});
		var contentStyles = getStyle(content);
		var paddings = parseInt(contentStyles.paddingTop) + parseInt(contentStyles.paddingBottom);
		container.classList.add("initiated");
		var slider = new BaseSlider({
			container: container,
			content: content,
			slides: slides,
			paddings: paddings,
			transform: function(index) {
				if (isMobile) {
					content.style.transform = "";
					content.style.maxHeight = paddings + calcMobileHeight(slides, index) + "px";
					slides.forEach(function(slide, current) {
						slide.style.visibility = current < (index + 1) * 4 ? "visible" : "hidden";
					});
				} else {
					content.style.maxHeight = "";
					content.style.transform = "translateX(" + index * -100 + "%)";
					slides.forEach(function(slide) {
						slide.style.visibility = "";
					});
				}
			},
			matchMediaQueries: [
				"(max-width: 479px)",
				"(min-width: 480px) and (max-width: 599px)",
				"(min-width: 600px) and (max-width: 767px)",
				"(min-width: 768px) and (max-width: 1199px)",
				"(min-width: 1200px)"
			],
			onSlide: function(index, length) {
				if (length === 1) {
					previousButton.style.display = "none";
					nextButton.style.display = "none";
				} else {
					previousButton.style.display = "";
					nextButton.style.display = "";
				}
				previousButton.disabled = !index;
				nextButton.disabled = index === length - 1;
				readmoreButton.style.display = index === length - 1 ? "none" : "";
			},
			calcLayout: function(matchedMediaQueryIndex, index) {
				var length = 0;
				mobileSlideHeight = calcMobileHeight(slides, index);
				isMobile = false;
				switch (matchedMediaQueryIndex) {
					case 0:
					case 1:
						isMobile = true;
					case 3:
						length = Math.ceil(slides.length / 4);
						break;
					case 2:
						length = Math.ceil(slides.length / 3);
						break;
					case 4:
						length = Math.ceil(slides.length / 5);
						break;
				}
				return length;
			}
		});
		sliders.push(slider);
		return slider;
	}

	window.addEventListener('resize', function () {
		if (isMobile) {
			sliders.forEach(function (slider) {
				slider.config.content.style.maxHeight = slider.config.paddings + calcMobileHeight(slider.config.slides, slider.index) + 'px'
			})
		}
	})

	window.initProductSlider = function (container) {
		var slider = init(container)

		return function () {
			sliders.splice(sliders.indexOf(slider), 1)
		}
	}

	function calcMobileHeight(slides, index) {
		var i = 0
		var height = 0
		var slideStyles
		var length = Math.min(slides.length, (index + 1) * 4)

		for (; i < length; i++) {
			if (i % 2 === 0) {
				slideStyles = getStyle(slides[i])
				height += slides[i].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom)
			}
		}

		return height
	}
}

module.exports = initProductSlider

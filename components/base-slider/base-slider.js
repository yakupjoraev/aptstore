function BaseSlider(config) {
	this.config = config
	this.transform = typeof config.transform === 'function'
		? config.transform.bind(this)
		: this.transform
	this.index = 0
	this.length = config.length
	this.matchMediaList = (this.config.matchMediaQueries || []).map(matchMedia)
	this.onCalcLayout = this.onCalcLayout.bind(this)
	this.onClickHandler = this.onClickHandler.bind(this)
	this.matchMediaList.forEach(function (matchMediaQuery) {
		matchMediaQuery.addEventListener('change', this.onCalcLayout)
	}.bind(this))
	this.onCalcLayout()
	this.config.container.addEventListener('click', this.onClickHandler)
}

BaseSlider.prototype.transform = function (index) {
	this.config.content.style.transform = 'translateX(' + (index * -100) + '%)'
}

BaseSlider.prototype.slidePrevious = function () {
	if (this.index > 0) {
		this.index--
		this.slide(this.index)
	}
}

BaseSlider.prototype.slideNext = function () {
	if (this.index < this.length - 1) {
		this.index++
		this.slide(this.index)
	}
}

BaseSlider.prototype.slide = function (index) {
	this.transform(index)
	this.index = index

	if (typeof this.config.onSlide === 'function') {
		this.config.onSlide.call(this, index, this.length)
	}
}

BaseSlider.prototype.onCalcLayout = function () {
	var matchedMedia = null

	this.matchMediaList.forEach(function (matchMediaQuery, index) {
		if (matchMediaQuery.matches && matchedMedia === null) {
			matchedMedia = index
		}
	})

	if (typeof this.config.calcLayout === 'function') {
		this.length = this.config.calcLayout.call(this, matchedMedia, this.index)
		this.slide(this.index > this.length - 1 ? this.length - 1 : this.index)
	} else if (typeof this.config.onSlide === 'function') {
		this.config.onSlide.call(this, this.index, this.length)
	}
}

BaseSlider.prototype.onClickHandler = function (event) {
	if (event.target.matches('[data-next]') || event.target.closest('[data-next]')) {
		this.slideNext()
	}

	if (event.target.matches('[data-previous]') || event.target.closest('[data-previous]')) {
		this.slidePrevious()
	}

	if (event.target.matches('[data-slide]') || event.target.closest('[data-slide]')) {
		var target = event.target.matches('[data-slide]') ? event.target : event.target.closest('[data-slide]')

		this.slide(Number(target.dataset.slide))

		if (!event.shiftKey && !event.metaKey && !event.ctrlKey) {
			event.preventDefault()
		}
	}
}

BaseSlider.prototype.destroy = function () {
	this.matchMediaList.forEach(function (matchMediaQuery) {
		matchMediaQuery.removeEventListener('change', this.onCalcLayout)
	}.bind(this))
	this.config.container.removeEventListener('click', this.onClickHandler)
}
module.exports = BaseSlider

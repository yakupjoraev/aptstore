function emitEvent(element, eventName, params) {
	var event = document.createEvent('HTMLEvents')
	var key

	params = params || {}

	event.initEvent(eventName, true, true)

	for (key in params) {
		event[key] = params[key]
	}

	element.dispatchEvent(event)
}

function getStyle(node) {
	return window.getComputedStyle ? getComputedStyle(node, '') : node.currentStyle
}

function freezeBody() {
	var scrollWidth = window.innerWidth - document.body.offsetWidth
	document.body.style.paddingRight = parseInt(getStyle(document.body).paddingRight) + scrollWidth + 'px'
	document.body.style.overflow = 'hidden'
}

function unfreezeBody() {
	document.body.style.overflow = ''
	document.body.style.paddingRight = ''
}

function toArray(iterable) {
	return Array.prototype.slice.call(iterable)
}

function show(element, duration, callback) {
	element.style.display = 'block'
	element.style.position = 'absolute'
	element.style.visibility = 'hidden'
	element.style.overflow = 'hidden'

	var height = element.offsetHeight

	element.style.position = 'relative'
	element.style.visibility = ''
	element.style.maxHeight = '0px'

	startAnimation(duration, function (progress) {
		element.style.maxHeight = easeInOut(progress) * height + 'px'
	}, function () {
		element.style.maxHeight = ''
		element.style.position = ''
		element.style.visibility = ''
		element.style.overflow = ''

		if (typeof callback === 'function') {
			callback()
		}
	})
}

function hide(element, duration) {
	var height = element.offsetHeight

	element.style.position = 'relative'
	element.style.maxHeight = height + 'px'
	element.style.overflow = 'hidden'

	startAnimation(duration, function (progress) {
		element.style.maxHeight = height - (easeInOut(progress) * height) + 'px'
	}, function () {
		element.style.maxHeight = ''
		element.style.position = ''
		element.style.overflow = ''
		element.style.display = 'none'
	})
}

function startAnimation(duration, callback, finish) {
	var startAnimation = null

	requestAnimationFrame(function measure(time) {
		if (!startAnimation) {
			startAnimation = time
		}

		var progress = (time - startAnimation) / duration

		callback(progress)

		if (progress < 1) {
			requestAnimationFrame(measure)
		} else if (typeof finish === 'function') {
			finish()
		}
	})
}

var avatarDiv = document.createElement('div')

function createElement(schema) {
	if (typeof schema === 'string') {
		avatarDiv.innerHTML = schema

		return Array.prototype.slice.call(avatarDiv.childNodes)
	}

	var element = document.createElement(schema.name)
	var attrName

	for (attrName in schema.attrs) {
		element.setAttribute(attrName, schema.attrs[attrName])
	}

	(schema.children || []).forEach(function (child) {
		createElement(child).forEach(function (elem) {
			element.appendChild(elem)
		})
	})

	return [element]
}

function debounce(handler, timeout) {
	var timer
	var runLeading = false
	var runs = 0

	return function (params) {
		if (!runLeading) {
			handler.apply(this, params)
			runLeading = true
		}

		runs++

		clearTimeout(timer)
		timer = setTimeout(function () {
			if (runs > 1) {
				handler.apply(this, params)
			}

			runLeading = false
			runs = 0
		}, timeout)
	}
}

function touchable(container) {
	var originMove = 0
	var isMoving = false
	var delta = 0

	function pointerStart(event) {
		if (event.pointerType !== 'mouse') {
			originMove = event.clientX
			container.setPointerCapture(event.pointerId)
		}
	}

	function pointerMove(event) {
		if (originMove && event.pointerType !== 'mouse') {
			delta = originMove - event.clientX

			if (Math.abs(delta) > 5) {
				container.style.touchAction = 'none'
				isMoving = true
				event.preventDefault()
			}

			if (isMoving) {
				emitEvent(container, 'pointer-move', {
					delta: delta
				})
			}
		}
	}

	function pointerEnd(event) {
		originMove = 0

		if (isMoving) {
			isMoving = false
			container.style.touchAction = 'auto'

			if (delta > 50) {
				emitEvent(container, 'pointer-slide-right')
			} else if (delta < -50) {
				emitEvent(container, 'pointer-slide-left')
			} else {
				emitEvent(container, 'pointer-slide-current')
			}
		}
	}

	container.addEventListener('pointerdown', pointerStart)
	container.addEventListener('pointermove', pointerMove)
	container.addEventListener('pointerup', pointerEnd)
	container.addEventListener('lostpointercapture', pointerEnd)

	return function () {
		container.removeEventListener('pointerdown', pointerStart)
		container.removeEventListener('pointermove', pointerMove)
		container.removeEventListener('pointerup', pointerEnd)
		container.removeEventListener('lostpointercapture', pointerEnd)
	}
}

function easeInOut(time) {
	return 0.5 * (1 - Math.cos(Math.PI * time))
}

module.exports = {
	emitEvent: emitEvent,
	freezeBody: freezeBody,
	unfreezeBody: unfreezeBody,
	toArray: toArray,
	getStyle: getStyle,
	show: show,
	hide: hide,
	debounce: debounce,
	createElement: createElement,
	touchable: touchable,
	startAnimation: startAnimation,
	easeInOut: easeInOut
}

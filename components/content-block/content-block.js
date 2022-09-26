var createElement = require('../../libs/helpers').createElement
var toArray = require('../../libs/helpers').toArray
var startAnimation = require('../../libs/helpers').startAnimation
var easeInOut = require('../../libs/helpers').easeInOut

function contentBlock() {
	var anchors = toArray(document.querySelectorAll('[data-content-cut]'))
	var containers = []

	anchors.forEach(init)

	function init(anchor) {
		var container = anchor.closest('.content-block')
		var expand = createElement({
			name: 'button',
			attrs: {
				class: 'content-block__expand',
				type: 'button',
				'data-content-expand': ''
			},
			children: ['Читать далее']
		})[0]

		container.appendChild(expand)
		window.addEventListener('resize', resize)
		expand.addEventListener('click', function () {
			container.style.maxHeight = ''

			var startHeight = anchor.offsetTop
			var finishHeight = container.offsetHeight - startHeight

			container.style.maxHeight = startHeight + 'px'

			startAnimation(500, function (progress) {
				container.style.maxHeight = startHeight + easeInOut(progress) * finishHeight + 'px'
			}, function () {
				container.style.maxHeight = ''
				window.removeEventListener('resize', resize)
				expand.style.display = 'none'
			})
		})

		function resize() {
			container.style.maxHeight = anchor.offsetTop + 'px'
		}

		resize()
		setTimeout(resize, 500)
	}
}

contentBlock()

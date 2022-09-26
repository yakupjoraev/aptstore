var emitEvent = require('../../libs/helpers').emitEvent
var freezeBody = require('../../libs/helpers').freezeBody
var unfreezeBody = require('../../libs/helpers').unfreezeBody
var current
var origin
var toArray = Function.prototype.call.bind(Array.prototype.slice)

function initWindowModals() {
	var originModals = toArray(document.querySelectorAll('[data-modal-window]'))
	var modals = {}

	originModals.forEach(function (modal, index) {
		var modalContent = modal.querySelector('[data-modal]')

		modals[modalContent.dataset.modal] = modalContent

		if (index) {
			originModals[0].appendChild(modalContent)
			modal.parentNode.removeChild(modal)
		}
	})

	if (originModals.length) {
		origin = originModals[0]
	} else {
		origin = document.createElement('div')
		origin.className = 'modal-window'
		origin.setAttribute('data-modal-window', '')
	}

	document.body.appendChild(origin)
	origin.addEventListener('animationend', animationEndHandler)
	origin.addEventListener('click', modalClickHandler)
	window.addEventListener('keydown', modalKeyDownHandler)

	window.addEventListener('click', function (event) {
		if (event.target.matches('[data-open-modal]') || event.target.closest('[data-open-modal]')) {
			var target = event.target.matches('[data-open-modal]') ? event.target : event.target.closest('[data-open-modal]')

			openModal(modals[target.dataset.openModal])
		}

		if (event.target.matches('[data-modal]')) {
			closeModal()
		}
	})
	window.addEventListener('open-modal', function (event) {
		openModal(modals[event.name], event.params)
	})
	window.addEventListener('close-modal', closeModal)
	window.openModal = function (modal, params) {
		if (typeof modal === 'string') {
			openModal(modals[modal], params)
		} else {
			var frame = document.createElement('div')
			var content = document.createElement('div')
			var close = document.createElement('button')

			frame.className = 'modal-window__frame'
			frame.setAttribute('data-modal', '')
			content.className = 'modal-window__content'
			close.className = 'modal-window__close'
			close.type = 'button'
			close.setAttribute('data-close', '')
			close.appendChild(document.createTextNode('Закрыть'))

			content.appendChild(close)
			content.appendChild(modal)
			frame.appendChild(content)
			origin.appendChild(frame)
			openModal(frame)
		}
	}
	window.closeModal = closeModal
}

function modalClickHandler(event) {
	if (event.target.matches('[data-close]') || event.target.closest('[data-close]')) {
		closeModal()
	}
}

function modalKeyDownHandler(event) {
	if (current && event.keyCode === 27) {
		closeModal()
	}
}

function closeModal() {
	if (current) {
		origin.classList.add('hide')
		current.classList.add('disappears-bottom')
		current = null
	}
}

function animationEndHandler(event) {
	if (event.animationName.indexOf('disappears') === 0) {
		contentRemoveClasses(event.target)

		if (!event.target.dataset.modal.length) {
			event.target.parentNode.removeChild(event.target)
		}
	}

	if (event.animationName === 'modal-window-disappears') {
		origin.classList.remove('show')
		origin.classList.remove('hide')
		unfreezeBody()
	}
}

function contentRemoveClasses(content) {
	content.classList.remove('appears-top')
	content.classList.remove('appears-left')
	content.classList.remove('disappears-left')
	content.classList.remove('disappears-bottom')
}

function openModal(modal, params) {
	var firstInput

	if (!current) {
		freezeBody()
		origin.classList.add('show')
		modal.classList.add('appears-top')
	} else {
		current.classList.add('disappears-left')
		modal.classList.add('appears-left')
	}

	current = modal
	emitEvent(modal, 'init-modal', { params: params })

	if (firstInput = current.querySelector('input[type="text"],input[type="tel"],input[type="email"]')) {
		firstInput.focus()
	}
}

module.exports = initWindowModals

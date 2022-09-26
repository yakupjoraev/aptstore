var createElement = require('../../libs/helpers').createElement

function initNotifyProductModal() {
	var notifyProductModal = document.querySelector('[data-modal="notify-product"]')

	if (notifyProductModal) {
		var form = notifyProductModal.querySelector('[data-notify-modal-form]')

		notifyProductModal.addEventListener('init-modal', function (event) {
			notifyProductModal.querySelector('[data-title]').innerHTML = event.params.title
			notifyProductModal.querySelector('[data-preview]').src = event.params.preview
			notifyProductModal.querySelector('[data-pack]').innerHTML =
				event.params.pack ? event.params.pack + ' шт. в уп.' : ''
		})

		form.addEventListener('submit', function (event) {
			event.preventDefault()

			var result = createElement({
				name: 'div',
				attrs: {
					class: 'notify-product-modal__result'
				},
				children: [{
					name: 'h3',
					attrs: {
						class: 'notify-product-modal__header'
					},
					children: ['Сообщить о&nbsp;получении']
				}, {
					name: 'p',
					attrs: {
						class: 'notify-product-modal__thanks'
					},
					children: ['Спасибо за обращение!<br />Мы оповестим вас сразу как товар поступит на склад.']
				}, {
					name: 'div',
					attrs: {
						class: 'notify-product-modal__close-control'
					},
					children: [{
						name: 'button',
						attrs: {
							type: 'button',
							class: 'notify-product-modal__button',
							'data-close': true
						},
						children: ['Спасибо, понятно!']
					}]
				}]
			})

			openModal(result[0])
		})
	}
}

initNotifyProductModal()

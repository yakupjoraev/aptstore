module.exports = function () {
	var messageModal = document.querySelector('[data-modal="message"]')
	var title = messageModal.querySelector('[data-title]')
	var description = messageModal.querySelector('[data-description]')
	var actionHolder = messageModal.querySelector('[data-action-holder]')
	var banner = messageModal.querySelector('[data-banner]')

	messageModal.addEventListener('init-modal', function (event) {
		var params = event.params

		banner.className = 'message-modal__banner message-modal__banner--' + params.type
		title.innerHTML = ''
		description.innerHTML = ''
		actionHolder.innerHTML = ''

		if (params.title) {
			title.innerHTML = params.title
		}

		if (params.description) {
			description.innerHTML = params.description
		}

		if (params.action) {
			var button = document.createElement('button')

			button.className = 'message-modal__action'
			button.innerHTML = params.label
			button.addEventListener('click', function () {
				closeModal()
				params.action()
			})
			actionHolder.appendChild(button)
		} else if (params.href) {
			var link = document.createElement('a')

			link.href = params.href
			link.className = 'message-modal__action'
			link.innerHTML = params.label

			actionHolder.appendChild(link)
		} else if (params.label) {
			var button = document.createElement('button')

			button.className = 'message-modal__action'
			button.innerHTML = params.label
			button.setAttribute('data-close', '')
			actionHolder.appendChild(button)
		}
	})
}

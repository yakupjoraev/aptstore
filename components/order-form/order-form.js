function orderForm() {
	var container = document.querySelector('.order-form')

	if (!container) {
		return null
	}

	var switcher = container.querySelector('[data-send-receipt]')
	var phoneInput = container.querySelector('#order-form__email')

	switcher.addEventListener('click', function () {
		phoneInput.disabled = !phoneInput.disabled

		if (!phoneInput.disabled) {
			phoneInput.focus()
		}
	})
}

orderForm()

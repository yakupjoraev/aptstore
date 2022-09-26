var toArray = require('../../libs/helpers').toArray

var productCardSelector = '[data-product-card]'

function initProductCard() {
	var productCards = toArray(document.querySelectorAll(productCardSelector))

	productCards.forEach(function (productCard) {
		var buyButton = productCard.querySelector('[data-buy]')
		var notifyButton = productCard.querySelector('[data-notify]')

		if (buyButton) {
			buyButton.addEventListener('click', buyButtonClickHandler)
		}

		if (notifyButton) {
			notifyButton.addEventListener('click', notifyButtonClickHandler)
		}
	})

	function buyButtonClickHandler(event) {
		var productCard = event.target.closest(productCardSelector)
		var buyControls = productCard.querySelector('[data-buy-controls]')
		var amounControls = productCard.querySelector('[data-amount-controls]')

		buyControls.style.display = 'none'
		amounControls.style.display = ''
	}

	function notifyButtonClickHandler(event) {
		var productCard = event.target.closest(productCardSelector)
		var title = productCard.querySelector('[data-title]').getAttribute('data-title')
		var preview = productCard.querySelector('[data-preview]').src
		var pack = productCard.querySelector('[data-pack]')

		openModal('notify-product', {
			preview: preview,
			title: title,
			pack: pack ? pack.getAttribute('data-pack') : ''
		})
	}
}

module.exports = initProductCard

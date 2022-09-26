function orderDetailsOther() {
	var containerMobile = document.querySelector('.order-details__other-mobile');
	var viewBtnMobile = document.querySelector('.order-details__option-other');
	var othersList = document.querySelector('.order-details__other-list')

	if (!containerMobile) {
		return null
	}

	viewBtnMobile.addEventListener('click', function () {
		containerMobile.classList.toggle('active')
	})

	var containerDesktop = document.querySelector('.order-details__other');
	var viewBtnDesktop = document.querySelector('.order-details__btn-other');

	if (!containerDesktop) {
		return null
	}

	viewBtnDesktop.addEventListener('click', function (event) {
		containerDesktop.classList.toggle('active')

		window.addEventListener('click', function (event) {
			var target = event.target

				if (!containerDesktop.contains(event.target) || containerDesktop === target) {
					containerDesktop.classList.remove('active')
				}
		})
	})


}

orderDetailsOther();

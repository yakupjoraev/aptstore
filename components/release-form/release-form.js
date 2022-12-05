function releaseForm() {
	var container = document.querySelector('.release-form');
	var btn = document.querySelector('.release-form__btn');
	var products = document.querySelector('.release-form__products')

	if (!container) {
		return null
	}

	btn.addEventListener('click', function () {
		btn.classList.toggle('active');
		products.classList.toggle('active');
	});

}
releaseForm();

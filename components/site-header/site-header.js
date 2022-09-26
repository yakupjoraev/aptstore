function siteHeaderMobile() {
	var container = document.querySelector('[data-site-header-mobile-wrapper]')

	if (!container) {
		return null
	}

	var siteHeaderInner = document.querySelector('[data-site-header-mobile-inner]')
	var siteHeaderClose = document.querySelector('[data-site-header-mobile-close]')

	container.addEventListener('click', function (event) {
		if (event.target === container) {
			container.classList.add('active')
		}

		else if (event.target === siteHeaderInner) {
			container.classList.remove('active')
		}
	})


	siteHeaderClose.addEventListener('click', function () {
		container.classList.remove('active')
	})

}

siteHeaderMobile();

function headerFixed() {
	if ((window.matchMedia("(min-width: 767px)").matches)) {
			var fixCatalog = document.querySelector('.catalog-list')
			var fixSearchLocation = document.querySelector('.search-location')
			var header = document.querySelector('.site-header')
			var fixedHeader = document.querySelector('.site-header__wrapper');
			var breakpoint = header.offsetHeight + header.offsetHeight;
			if (window.scrollY >= breakpoint) {
				fixedHeader.classList.add('fixed')
				fixCatalog.classList.add('fixed')
				fixSearchLocation.classList.add('fixed')
			} else {
				fixedHeader.classList.remove('fixed')
				fixCatalog.classList.remove('fixed')
				fixSearchLocation.classList.remove('fixed')
			}
	}

}
window.addEventListener('scroll', headerFixed)

headerFixed();

function tooltipBanner() {
	var tooltipContainer = document.querySelector('[data-tooltip]')
	if (!tooltipContainer) {
		return null
	}

	var tooltipElem;

	document.onmouseover = function (event) {
		var target = event.target;

		// если у нас есть подсказка...
		var tooltipHtml = target.dataset.tooltip;
		if (!tooltipHtml) return;

		// ...создадим элемент для подсказки

		tooltipElem = document.createElement('div');
		tooltipElem.className = 'tooltip';
		tooltipElem.innerHTML = tooltipHtml;
		document.body.append(tooltipElem);

		// спозиционируем его сверху от аннотируемого элемента (top-center)
		var coords = target.getBoundingClientRect();

		var left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
		if (left < 0) left = 0; // не заезжать за левый край окна

		var top = coords.top - tooltipElem.offsetHeight - 5;
		if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
			top = coords.top + target.offsetHeight + 5;
		}

		tooltipElem.style.left = left + 'px';
		tooltipElem.style.top = top + 'px';
	};

	document.onmouseout = function (e) {

		if (tooltipElem) {
			tooltipElem.remove();
			tooltipElem = null;
		}


	};

	window.addEventListener('scroll', function () {
		if (tooltipElem) {
			tooltipElem.remove();
			tooltipElem = null;
		}

	});

}

tooltipBanner();

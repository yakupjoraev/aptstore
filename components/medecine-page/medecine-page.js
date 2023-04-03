var BaseSlider = require('../base-slider/base-slider')
var toArray = require('../../libs/helpers').toArray
var getStyle = require('../../libs/helpers').getStyle

function medecinePage() {
  var container = document.querySelector('[data-medecine-page-products]')

  if (!container) {
    return null
  }

  var content = container.querySelector('[data-medecine-page-products-content]')
  var buttons = container.querySelector('[data-medecine-page-products-buttons]')
  var slides = toArray(content.childNodes).filter(function (node) {
    return node.nodeType === 1
  })
  var slideStyles = getStyle(slides[0])
  var slideHeight = (slides[0].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom)) * 2
  var isMobile = true
  var cardsOnSlide = 4
  var slider = new BaseSlider({
    container: container,
    content: content,
    length: 2,
    matchMediaQueries: [
      '(max-width: 479px)',
      '(min-width: 480px) and (max-width: 599px)',
      '(min-width: 600px) and (max-width: 767px)',
      '(min-width: 768px) and (max-width: 1023px)',
      '(min-width: 1024px) and (max-width: 1199px)',
      '(min-width: 1200px)'
    ],
    transform: function (index) {
      content.style.maxHeight = calcHeight(index) + 'px'
      slides.forEach(function (slide, current) {
        slide.style.visibility = current < (index + 1) * cardsOnSlide ? 'visible' : 'hidden'
      })
    },
    onSlide: function (index, length) {
      if (index === length - 1) {
        buttons.style.display = 'none'
      }
    },
    calcLayout: function (matchedMediaQueryIndex, index) {
      var length = Math.ceil(slides.length / cardsOnSlide)

      cardsOnSlide = 4
      isMobile = false
      slideStyles = getStyle(slides[0])
      slideHeight = (slides[0].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom))

      switch (matchedMediaQueryIndex) {
        case 0:
        case 1:
          isMobile = true
          slideHeight = calcHeight(index)

          break
        case 2:
        case 3:
          cardsOnSlide = 3
          length = Math.ceil(slides.length / cardsOnSlide)

          break
        case 5:
          cardsOnSlide = 5
          length = Math.ceil(slides.length / cardsOnSlide)
      }

      return length
    }
  })


  function calcHeight(index) {
    var i = 0
    var height = 0
    var slideStyles
    var length = ((typeof index === 'undefined' ? (slider || {}).index : index) + 1) * cardsOnSlide

    for (; i < length; i++) {
      if (i % (isMobile ? cardsOnSlide / 2 : cardsOnSlide) === 0) {
        slideStyles = getStyle(slides[i])
        height += slides[i].offsetHeight + parseInt(slideStyles.marginTop) + parseInt(slideStyles.marginBottom)
      }
    }

    return height
  }

  window.addEventListener('resize', function () {
    content.style.maxHeight = calcHeight() + 'px'
  })
}

medecinePage();


// Аккордеон
function accordion() {

  var faqAccardion = document.querySelector('.faq-accordion')

  if (!faqAccardion) {
    return null
  }
  var items = document.querySelectorAll('.faq-accordion__item-trigger')
  items.forEach(item => {
    item.addEventListener('click', () => {
      var parent = item.parentNode
      if (parent.classList.contains('faq-accordion__item-active')) {
        parent.classList.remove('faq-accordion__item-active')
      } else {
        document
          .querySelectorAll('.faq-accordion__item')
          .forEach(child => child.classList.remove('faq-accordion__item-active'))
        parent.classList.add('faq-accordion__item-active')
      }
    })
  })
}
accordion();

function medecineAnchors() {
  var medecinePageScroll = document.querySelector('.medecine-page__anchors-container')

  if (!medecinePageScroll) {
    return null
  }

  var header = document.querySelector('.site-header')
  var medecinePageHeader = document.querySelector('.medecine-page__header')
  var breakpoint = header.offsetHeight + medecinePageHeader.offsetHeight;

  if (window.scrollY >= breakpoint) {
    medecinePageScroll.classList.add('fixed')
  } else {
    medecinePageScroll.classList.remove('fixed')
  }

}
window.addEventListener('scroll', medecineAnchors)

medecineAnchors();


function activeLink() {

  var medecinePageContainer = document.querySelector('.medecine-page')

  if (!medecinePageContainer) {
    return null
  }

  // active class of menu items onscroll
  window.addEventListener('scroll', () => {
    var scrollDistance = window.scrollY;

    document.querySelectorAll('.medecine-page__section').forEach((el, i) => {
      if (el.offsetTop - 400 <= scrollDistance) {
        document.querySelectorAll('.medecine-page__anchors-link').forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          }
        });

        document.querySelectorAll('.medecine-page__anchors-link')[i].classList.add('active');
      }
    });
  });

  if (window.matchMedia("(max-width: 1200px)").matches) {

    // active class of menu items onscroll on max-width: 1200px

    window.addEventListener('scroll', () => {
      var scrollDistance = window.scrollY;

      document.querySelectorAll('.medecine-page__section').forEach((el, i) => {
        if (el.offsetTop - 550 <= scrollDistance) {
          document.querySelectorAll('.medecine-page__anchors-link').forEach((el) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active');
            }
          });

          document.querySelectorAll('.medecine-page__anchors-link')[i].classList.add('active');
        }
      });
    });
  }


  //smooth scroll to link

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it =
      (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  var anchors = document.querySelectorAll('.medecine-page__anchors-link[href*="#"]');
  var _loop = function _loop() {
    var anchor = _step.value;
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var blockID = anchor.getAttribute("href").substr(1);
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  };
  for (
    var _iterator = _createForOfIteratorHelperLoose(anchors), _step;
    !(_step = _iterator()).done;

  ) {
    _loop();
  }

}

activeLink();


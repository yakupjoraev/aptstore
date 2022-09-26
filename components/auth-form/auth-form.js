var emitEvent = require('../../libs/helpers').emitEvent

function initAuthForm() {
	var signInForm = document.querySelector('form[name="signin-form"]')
	var signInTelField = signInForm.querySelector('[data-tel-field]')
	var signInTelInput = signInForm.querySelector('input[name="tel"]')
	var signInCodeInput = signInForm.querySelector('input[name="code"]')
	var signInCodeField = signInForm.querySelector('[data-code-field]')
	var singInSubmitButton = signInForm.querySelector('[data-submit]')
	var signInFormCountdown = signInForm.querySelector('[data-countdown]')
	var signInResendCodeButton = signInForm.querySelector('[data-resend-code]')
	var signInLegal = signInForm.querySelector('[data-legal]')
	var signInGoBack = signInForm.querySelector('[data-go-back]')
	var signInGoBackButton = signInForm.querySelector('[data-go-back-button]')

	var signUpForm = document.querySelector('form[name="signup-form"]')
	var signUpPhonePlaceholder = signUpForm.querySelector('[data-phone-placeholder]')
	var signUpFormCountdown = signUpForm.querySelector('[data-countdown]')
	var signUpCodeField = signUpForm.querySelector('[data-code-field]')
	var signUpResendCodeButton = signUpForm.querySelector('[data-resend-code]')
	var singUpSubmitButton = signUpForm.querySelector('[data-submit]')
	var signUpNameInput = signUpForm.querySelector('input[name="name"]')
	var signUpCodeInput = signUpForm.querySelector('input[name="code"]')
	var period = 10
	var timer

	signInForm.addEventListener('submit', function (event) {
		if (Math.random() > 0.5) {
			emitEvent(window, 'open-modal', { name: 'signup' })
			removeCodeError(signUpCodeField, signUpResendCodeButton)
			clearInterval(timer)
			signUpPhonePlaceholder.innerHTML = prettifyNumber(signInTelInput.value)
			startCodeCounter(signUpCodeField, signUpFormCountdown, signUpResendCodeButton, period)
		} else {
			signInTelField.style.display = 'none'
			signInCodeField.style.display = ''
			signInLegal.style.display = 'none'
			signInGoBack.style.display = ''
			signInCodeInput.focus()
			startCodeCounter(signInCodeField, signInFormCountdown, signInResendCodeButton, period)
			singInSubmitButton.style.display = 'none'
		}

		event.preventDefault()

		return false
	})

	signUpForm.addEventListener('submit', function (event) {
		event.preventDefault()

		emitEvent(window, 'close-modal')

		return false
	})

	signInTelInput.addEventListener('input', signInTelInputValidate)
	signInTelInput.addEventListener('focus', signInTelInputValidate)
	signUpNameInput.addEventListener('input', signUpFormValidate)
	signUpNameInput.addEventListener('focus', signUpFormValidate)
	signUpCodeInput.addEventListener('input', signUpFormValidate)
	signUpCodeInput.addEventListener('focus', signUpFormValidate)

	function signInTelInputValidate() {
		singInSubmitButton.disabled = signInTelInput.value.replace(/^(\+7|7|8)/, '').replace(/[^0-9]/g, '').length < 10
	}

	function signUpFormValidate() {
		singUpSubmitButton.disabled = signUpNameInput.value.length < 2 || signUpCodeInput.value.length !== 4
	}

	function startCodeCounter(codeField, countdown, resendButton, period) {
		timer = setInterval(tick, 1000)
		tick()

		function tick() {
			var minutes = Math.floor(period / 60)
			var seconds = period % 60

			countdown.innerHTML = minutes + ':' + (seconds < 10 ? '0' + seconds : seconds)

			if (!period--) {
				clearInterval(timer)
				setCodeError(codeField)
				countdown.innerHTML = ''
				resendButton.style.display = ''
			}
		}
	}

	signUpResendCodeButton.addEventListener('click', function () {
		removeCodeError(signUpCodeField, signUpResendCodeButton)
		clearInterval(timer)
		startCodeCounter(signUpCodeField, signUpFormCountdown, signUpResendCodeButton, period)
	})

	signInResendCodeButton.addEventListener('click', function () {
		removeCodeError(signInCodeField, signInResendCodeButton)
		clearInterval(timer)
		startCodeCounter(signInCodeField, signInFormCountdown, signInResendCodeButton, period)
	})

	signInCodeInput.addEventListener('input', signInCodeInputHandler)
	signInCodeInput.addEventListener('focus', signInCodeInputHandler)

	function signInCodeInputHandler() {
		if (signInCodeInput.value.length === 4) {
			emitEvent(window, 'close-modal')
		}
	}

	function setCodeError(codeField) {
		codeField.classList.add('error')
	}

	function removeCodeError(codeField, resendButton) {
		codeField.classList.remove('error')
		resendButton.style.display = 'none'
	}

	signInGoBackButton.addEventListener('click', function () {
		signInLegal.style.display = ''
		signInGoBack.style.display = 'none'
		signInTelField.style.display = ''
		signInCodeField.style.display = 'none'
		singInSubmitButton.style.display = ''
		signInTelInput.focus()
		removeCodeError(signInCodeField, signInResendCodeButton)
		clearInterval(timer)
	})
}

function prettifyNumber(input) {
	var matches = input.match(/^\+(?:7|8)(\d{3})(\d{3})(\d{2})(\d{2})$/)

	return '+7&nbsp;(' + matches[1] + ')&nbsp;' +matches[2] + '-' +matches[3] + '-' +matches[4]
}

module.exports = initAuthForm

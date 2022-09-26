var toArray = require('../../libs/helpers').toArray
var createElement = require('../../libs/helpers').createElement

var uploadDropSelector = '[data-add-comment-upload]'
var uploadFileInputSelector = '[data-add-comment-input-file]'

function initAddComment() {
	var root = document.querySelector('.root')
	var uploadDrops = toArray(document.querySelectorAll(uploadDropSelector))
	var uplaodFileInputs = toArray(document.querySelectorAll(uploadFileInputSelector))
	var leavetimer

	if (root) {
		document.addEventListener('dragover', function (event) {
			root.classList.add('dragover')
			clearTimeout(leavetimer)
			uploadDrops.forEach(function (uploadDrop) {
				uploadDrop.classList.add('dragover')
			})
			event.preventDefault()
		})

		document.addEventListener('dragleave', function (event) {
			leavetimer = setTimeout(function () {
				root.classList.remove('dragover')
				uploadDrops.forEach(function (uploadDrop) {
					uploadDrop.classList.remove('dragover')
				})
			}, 50)
		})

		document.addEventListener('drop', function (event) {
			root.classList.remove('dragover')
			uploadDrops.forEach(function (uploadDrop) {
				uploadDrop.classList.remove('dragover')
			})
		})

		uploadDrops.forEach(function (uploadDrop) {
			uploadDrop.addEventListener('drop', onDrop)
		})
	}

	uplaodFileInputs.forEach(function (uploadFileInput) {
		uploadFileInput.addEventListener('change', onFileChange)
	})
}

function onDrop(event) {
	var container =
		event.target.matches(uploadDropSelector) ? event.target : event.target.closest(uploadDropSelector)
	var files = toArray(event.dataTransfer.files)

	if (files.length) {
		if (container.getAttribute('data-type') === 'photo') {
			handlePhotos(files, container)
		} else {
			handleVideo(files, container)
		}
	}

	event.preventDefault()
}

function onFileChange() {
	var container =
		event.target.matches(uploadDropSelector) ? event.target : event.target.closest(uploadDropSelector)
	var files = toArray(event.target.files)

	if (files.length) {
		if (container.getAttribute('data-type') === 'photo') {
			handlePhotos(files, container)
			event.target.value = ''
		} else {
			handleVideo(files, container)
		}
	}
}

function handlePhotos(files, container) {
	var uploads = document.querySelector('[data-add-comment-uploads]')

	files.forEach(function (file) {
		var isBroken = Math.random() > 0.5
		var preview = createElement({
			name: 'div',
			attrs: {
				class: 'add-comment__upload-preview' + (isBroken ? ' add-comment__upload-preview--error' : '')
			},
			children: [{
				name: 'img',
				attrs: {
					src: ''
				},
				children: []
			}, {
				name: 'button',
				attrs: {
					class: isBroken ? 'add-comment__upload-cancel' : 'add-comment__upload-delete',
					type: 'button'
				},
				children: ['Удалить']
			}]
		})
		var uploadLabel = uploads.querySelector('[data-upload-label]')
		var reader = new FileReader()

		if (uploadLabel) {
			uploads.insertBefore(preview[0], uploadLabel)
		} else {
			uploads.appendChild(preview[0])
		}

		container.classList.add('notempty')
		reader.onload = function (event) {
			preview[0].querySelector('img').src = event.target.result
		}
		reader.readAsDataURL(file)
	})
}

function handleVideo(files, container) {
	var filename = container.querySelector('[data-add-comment-video-name]')

	container.classList.add('notempty')
	filename.innerHTML = files[0].name
}

initAddComment()

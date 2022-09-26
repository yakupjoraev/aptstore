# Разработка

Установить зависимости

```
npm install
```

Начать разрабатывать

```
npm start
```

Должен запуститься веб-сервер, который по-умолчанию открывается на 3000 порту. http://localhost:3000/

Собрать стили и скрипты для продакшена в папку dist

```
npm run build
```

Собрать архив

```
npm run pack
```

После выгрузки коммита с тегом в мастер-ветке гитхаб сам соберёт проект, упакует в архив и прикрепит в [созданный релиз](https://github.com/alekseychikin/aptstore.ru/releases)

# Шаблонизатор

Я использую свой шаблонизатор. Документацию можно прочитать здесь [Gutt templater](https://gutt.alekseychikin.ru). Особо полезен будет раздел синтаксиса, и функции для строк, чисел и словарей.

# Модалки

Модальное окно можно разметить в разметке, а затем его вызвать. Например как в компоненте [signin-modal](https://github.com/alekseychikin/aptstore.ru/blob/master/components/auth-modal/signin-modal.gutt)

Вызвать модальное окно, которое уже есть в разметке можно кликом на любой элемент с `data-open-modal="name"`. Лушче чтобы это был `<button type="button" />` из-за семантики

Модалку можно вызвать функцией `openModal`, которая доступна в глобальной области видимости. Вот разные примеры того, как это можно сделать

```
<div>
	<button
		type="button"
		onclick="openModal('message', { type: 'basket', title: 'Ошибка', description: 'Ваша корзина пуста', href: 'inex.html', label: 'Перейти в каталог' })"
	>
		Системное сообщение Ошибка
	</button>
	<button
		type="button"
		onclick="openModal('message', { type: 'coins', title: 'Внимание!', description: 'Минимальная сумма заказа 200 руб.', label: 'Продолжить покупки' })"
	>
		Системное сообщение Внимание
	</button>
	<button
		type="button"
		onclick="openModal('message', { type: 'gift', title: 'Вам подарок!', description: 'К вашему заказу доступен подарок', action: function() { alert('do something'); }, label: 'Выбрать подарок' })"
	>
		Системное сообщение Вам подарок
	</button>
	<button
		type="button"
		onclick="openModal('message', { type: 'message', title: 'Спасибо за заказ!', description: 'Данные по заказу отправленны в СМС на номер +7 (963) 19****1', label: 'Продолжить покупки' })"
	>
		Системное сообщение Спасибо за заказ
	</button>
	<button
		type="button"
		onclick="var customModal = document.createElement('div'); customModal.appendChild(document.createTextNode('Total custom modal')); openModal(customModal)"
	>
		Открыть кастомное окно
	</button>
</div>
```

Закрыть модалку кликнув на элемент с `data-close` внутри модалки, или вызовом функции `closeModal()`, которая тоже доступна в глобальной области видимости

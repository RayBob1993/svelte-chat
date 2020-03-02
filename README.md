# Чат бот

## Подключение
```html
<link rel="stylesheet" href="Ссылка на стили для чата">
<script src="Ссылка на билд с чатом"></script>
<script>
  new ChatBotWidget({
    // ...options
  })
</script>
```

### Опции
```js
{
  /**
    @name target
    @description Вставить чат в указанный селектор
    @type {HTMLElement}
    @default document.body
  */
  target: document.getElementById('myId'),
  /**
    @name layout
    @description Тип отображения (фиксированный, поверх сайта или встроенный на страницу)
    @type {string} - 'fixed', 'static'
    @default 'fixed'
  */
  layout: 'fixed',
  /**
    @name position
    @description Задать позицию чата.
    @type {string} - 'right-bottom', 'left-bottom'
    @default 'right-bottom'
  */
  position: 'right-bottom',
  /**
    @name locale
    @description Локализация для чата
    @type {string} - 'ru-RU'
    @default 'ru-RU'
  */
  locale: 'ru-RU',
  /**
    @name devMode
    @description Режим разработки для вывода в консоль данных на всех этапах
    @type {boolean}
    @default false
  */
  devMode: false,
  /**
    @name visible
    @description Открыть чат при инициализации
    @type {boolean} 
    @default false
  */
  visible: false,
  /**
    @name outsideClose
    @description Закрытие чата при клике вне области
    @type {boolean}
    @default true
  */
  outsideClose: true,
  /**
    @name transportType
    @description Тип передачи данных
    @type {string} 'wss', 'http'
    @default 'wss'
  */
  transportType: 'wss',
  /**
    @name assetsUrl
    @description Путь для подключения ассетов
    @type {string}
    @default '/'
  */
  assetsUrl: '/',
  /**
    @name entryPoint
    @description Точки входа в api чата.
    @type {object}
  */
  entryPoint: {
    /**
      @name token
      @description Точка входа для получения токена
      @type {string}
    */ 
    token: '',
    /**
      @name baseUrl
      @description Точка входа для передачи и получения данных
      @type {string}
    */ 
    baseUrl: '',
  },
  /**
    @name plugins
    @description Подключение к чату дополнительных плагинов
    @type {array}
  */
  plugins: [],
  /**
    @name theme
    @description Стилизация.
    @type {object}
  */
  theme: {},
  /**
    @name data
    @description Данные для вывода, заголовки, логотипы и т.п
    @type {object}
  */
  data: {
    /**
      @name title
      @description Заголовок чата.
      @type {string}
    */ 
    title: 'C-bot',
    /**
      @name logoUrl
      @description url адрес для вставки логотипа
      @type {{string|null}}
      @default null
    */ 
    logoUrl: null,
  },
}
```

### Методы
| Название   	| Описание      	            | 
|---------------|-------------------------------|
| `show` 	    | Показать чат 	                |
| `hide` 	    | Скрыть чат   	                |
| `on` 	        | Навесить прослушку события    |

Примеры:
```js
const chatbot = new ChatBotWidget({
  entryPoint: {
    token: '',
    baseUrl: '',
  },
})

chatbot.show()
chatbot.hide()
chatbot.on('...имя события', event => { //... })
```

### События
| Название   	            | Описание      	                                |
|---------------------------|---------------------------------------------------|
| `chatbot.init` 	        | Вызывается после инициализации чата	            |
| `chatbot.message.send` 	| Вызывается после отправки сообщения   	        |
| `chatbot.message.reply` 	| Вызывается после получения ответа от сервера      |
| `chatbot.hide` 	        | Вызывается после скрытия чата                     |
| `chatbot.show` 	        | Вызывается после открытия чата                    |

Примеры:
```js
const chatbot = new ChatBotWidget({
  entryPoint: {
    token: '',
    baseUrl: '',
  },
})

chatbot
  .on('chatbot.init', () => {
    console.log('Чат инициализировался')
  })
  .on('chatbot.message.send', event => {
    console.log('Отправлен ответ на сервер')
    // Свойство message хранит отправленное сообщение
    console.log(event.message)
  })
  .on('chatbot.message.reply', event => {
    console.log('Пришёл ответ от сервера')
    // Свойство message хранит полученное сообщение
    console.log(event.message)
  })
  .on('chatbot.hide', () => {
    console.log('Чат скрылся')
  })
  .on('chatbot.show', () => {
    console.log('Чат показался')
  })
```

## Разработка
* Чат бот разработан на [svelte 3](https://svelte.dev)
* [API](https://svelte.dev/docs)
* [Примеры](https://svelte.dev/examples)
* [Песочница](https://svelte.dev/repl/hello-world?version=3.15.0)

### Запуск
* Клонировать репозиторий
* Установить зависимости
```bash
yarn
```

* Создать файл окружения `env.js` в корне проекта и указать содержимое
##### Для выкатки на сервер
```js
export default {
  APP_ORIGIN: '' // Путь относительно которого будут вставляться ассеты
}
```

##### Для локальной разработки и билда
```js
export default {
  APP_ORIGIN: ''
}
```
Примечание:
> `APP_ORIGIN` - если заполнен, добавляет своё значение в опцию **`assetsUrl`**

* Запустить локальный dev сервер
```bash
yarn serve
```

Или всё вместе
```bash
yarn && yarn serve
```

После запуска в терминале появится ссылка для открытия в браузере
или ручками открыть браузер и ввести адрес
```
http://localhost:5000
```

### Сборка билда
```bash
yarn build
```

### Структура проекта
```bash
├── public
│   ├── index.html
│   └── global.css
└── src
    ├── components
    │   ├── Chat.svelte
    │   ├── ChatActionButtons.svelte
    │   ├── ChatBody.svelte
    │   ├── ChatFooter.svelte
    │   ├── ChatHeader.svelte
    │   ├── ChatImage.svelte
    │   ├── ChatLoader.svelte
    │   ├── ChatMessage.svelte
    │   └── ChatToggle.svelte
    ├── plugins
    │   └── ChatWss.js
    ├── utils
    │   └── index.js
    ├── store
    │   ├── chat.js
    │   └── index.js
    ├── App.svelte
    ├── constants.js
    └── main.js
```

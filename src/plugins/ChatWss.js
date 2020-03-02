import Chat from './Chat'
import io from 'socket.io-client'
import { chatLoading } from '../store'
import { isMessagesLoading } from '../store/chat'

/**
 * Класс для работы с web socket сервером
 * @class
 * @name ChatWss
 * @requires socket.io-client
 */
class ChatWss extends Chat {
  constructor () {
    super ()

    this.socket = null

    this.init()
  }

  init () {
    this.socket = io(this.baseUrl, {
      socket: {
        transports: ['websocket', 'polling'],
        secure: true,
        reconnect: true,
        rejectUnauthorized: false,
      }
    })

    this.bindEvents()
  }

  signIn () {
    this.socket.emit('user.auth', this.token)
  }

  /**
   * @function
   * @name reconnect
   * @description выполнить
   */
  reconnect () {
    this.socket.emit('user.authReconnect', this.token)
  }

  /**
   * @function
   * @name send
   * @param {string} text - текстовое сообщение, которое отобразится в чате
   * @param {{string|number|undefined}} value - значение, которое передаётся на сервер, в противном случае передаётся поле text
   * @param {boolean} isEmpty - флаг для указания того, нужно ли отображать отправленное сообщение в чате
   */
  send ({ text, value, isEmpty }) {
    const currentValue = value || text

    isMessagesLoading.set(true)

    const data = {
      message: currentValue,
      token: this.token,
      locale: this.locale,
    }

    if (!isEmpty) {
      this.setMessages({
        text,
      })
    }

    this.socket.emit('messages.send', data)

    this.messageSendEvent.dispatchEvent(data)

    if (this.isDev) {
      console.group()
      console.log('Сообщение отправлено')
      console.log(data)
      console.groupEnd()
    }
  }

  bindEvents () {
    this.socket.on('connect', () => {
      this.signIn()

      if (this.isDev) {
        console.group()
        console.log('Соединение с веб сокетом установлено')
        console.log(`Адрес: ${this.baseUrl}`)
        console.groupEnd()
      }
    })

    this.socket.on('reconnect', () => {
      this.reconnect()

      if (this.isDev) {
        console.group()
        console.log('Соединение с веб сокетом восстановлено')
        console.log(`Адрес: ${this.baseUrl}`)
        console.groupEnd()
      }
    })

    this.socket.on('disconnect', () => {
      if (this.isDev) {
        console.log('Соединение с веб сокетом отключено')
      }
    })

    this.socket.on('messages.reply', responseString => {
      const { messages } = JSON.parse(responseString)

      this.setMessages(messages)

      isMessagesLoading.set(false)

      if (this.isDev) {
        console.group()
        console.log('Сообщение получено:')
        console.log(messages)
        console.groupEnd()
      }
    })

    this.socket.on('user.authOK', boolean => {
      if (this.isDev) {
        if (boolean) {
          console.log('Авторизация с веб сокетом прошла успешно')
        } else {
          console.log('Авторизация с веб сокетом не прошла')
        }
      }

      if (boolean) {
        this.send({
          text: '/welcome',
          isEmpty: true,
        })

        chatLoading.show()
      }
    })

    this.socket.on('user.authReconnectOK', responseString => {
      const response = JSON.parse(responseString)

      if (this.isDev) {
        console.group()
        console.log('Авторизация восстановлена')
        console.log(response)
        console.groupEnd()
      }
    })
  }
}

export default ChatWss

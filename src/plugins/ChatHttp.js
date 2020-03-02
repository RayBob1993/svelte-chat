import Chat from './Chat'
import axios from 'axios'
import { chatLoading } from '../store'
import { isMessagesLoading } from '../store/chat'

/**
 * Класс для работы с http сервером
 * @class
 * @name ChatHttp
 * @requires axios
 */
class ChatHttp extends Chat {
  constructor () {
    super()

    this.init()
  }

  async init () {
    await this.signIn()
  }

  /**
   * @function
   * @name send
   * @param {string} text - текстовое сообщение, которое отобразится в чате
   * @param {{string|number|undefined}} value - значение, которое передаётся на сервер, в противном случае передаётся поле text
   * @param {boolean} isEmpty - флаг для указания того, нужно ли отображать отправленное сообщение в чате
   */
  async send ({ text, value, isEmpty }) {
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

    if (this.isDev) {
      console.group()
      console.log('Сообщение отправлено')
      console.log(data)
      console.groupEnd()
    }

    try {
      this.messageSendEvent.dispatchEvent(data)

      const { data: { messages } } = await axios.post(this.baseUrl, data)

      this.setMessages(messages)

      if (this.isDev) {
        console.group()
        console.log('Сообщение получено:')
        console.log(messages)
        console.groupEnd()
      }
    } catch (error) {
      console.log(error)
    } finally {
      isMessagesLoading.set(false)
    }
  }

  async signIn () {
    await this.send({
      text: '/welcome',
      isEmpty: true,
    })

    chatLoading.show()
  }
}

export default ChatHttp

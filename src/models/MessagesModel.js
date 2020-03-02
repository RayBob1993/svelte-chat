import Autolinker from 'autolinker'
import { getTime } from '../utils'

/**
 * Класс для сериализации приходящих сообщений от сервера
 * @class
 * @name MessagesModel
 * @requires autolinker
 */
class MessagesModel {
  constructor (messages) {
    this.autolinker = new Autolinker({
      truncate: {
        length: 34,
        location: 'smart'
      }
    })

    this.messages = messages
  }

  /**
   * @function
   * @name textFormat
   * @param {string} text - Строка с сообщением
   * @description - Форматирование строки с автоматическим созданием парсинга ссылок и переносом слов
   * @requires autolinker
   * @return {string}
   */
  _textFormat (text) {
    if (!text) {
      return
    }

    const regexp = /\r\n/g
    const format = text.replace(regexp, '</br>')

    return this.autolinker.link(format)
  }

  getMessages () {
    let messages = null

    if (Array.isArray(this.messages)) {
      messages = this.messages.map(item => {
        return {
          time: getTime(),
          direction: 'left',
          ...item,
          text: this._textFormat(item.text)
        }
      })
    } else if (typeof this.messages === 'object') {
      messages = {
        time: getTime(),
        direction: 'right',
        type: 'text',
        text: this._textFormat(this.messages.text)
      }
    }

    return messages
  }
}

export default MessagesModel

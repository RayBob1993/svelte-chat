import MessagesModel from '../models/MessagesModel'
import { EVENTS } from '../constants'
import { CustomEvent } from '../utils'
import { get } from 'svelte/store'
import {
  isDev,
  chatBaseUrl,
  chatToken,
  chatLocale,
} from '../store'
import { chatMessages } from '../store/chat'

class Chat {
  constructor () {
    this.isDev = get(isDev)
    this.token = get(chatToken)
    this.baseUrl = get(chatBaseUrl)
    this.locale = get(chatLocale)

    this.messageSendEvent = new CustomEvent(EVENTS.MESSAGE_SEND_NAME)
  }

  /**
   * @function
   * @name setMessages
   * @description добавляет сообщение или сообщения в store
   * @param {object|array} data - одно или несколько сообщений
   */
  setMessages (data) {
    const messages = new MessagesModel(data)

    chatMessages.add(messages.getMessages())
  }
}

export default Chat

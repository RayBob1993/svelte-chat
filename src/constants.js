const DEFAULT_LOCALE = 'ru-RU'
const DEFAULT_POSITION = 'right-bottom'
const DEFAULT_TITLE = 'C-bot'
const TRANSITION_DURATION = 200
const TOKEN_NAME = 'chatToken'
const TRANSPORT_TYPE = 'wss'
const LAYOUT_TYPE = 'fixed'
const DEFAULT_TARGET = document.body
const DEFAULT_ASSETS_URL = '/'

const EVENTS = {
  INIT_NAME: 'chatbot.init',
  MESSAGE_SEND_NAME: 'chatbot.message.send',
  MESSAGE_REPLY_NAME: 'chatbot.message.reply',
  HIDE_NAME: 'chatbot.hide',
  SHOW_NAME: 'chatbot.show',
}

export {
  DEFAULT_LOCALE,
  DEFAULT_POSITION,
  DEFAULT_TITLE,
  TRANSITION_DURATION,
  TOKEN_NAME,
  TRANSPORT_TYPE,
  LAYOUT_TYPE,
  DEFAULT_TARGET,
  DEFAULT_ASSETS_URL,
  EVENTS,
}

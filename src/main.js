import config from '../env'
import { defaultsDeep } from './utils'
import '@babel/polyfill'
import axios from 'axios'
import App from './App.svelte'
import {
  DEFAULT_LOCALE,
  DEFAULT_TITLE,
  LAYOUT_TYPE,
  DEFAULT_POSITION,
  TOKEN_NAME,
  TRANSPORT_TYPE,
  DEFAULT_TARGET,
  DEFAULT_ASSETS_URL,
} from './constants'
import {
  isDev,
  chatPosition,
  chatVisible,
  chatBaseUrl,
  chatToken,
  chatLocale,
  chatLayout,
  chatData,
  chatTheme,
  chatTransportType,
  chatPlugins,
  chatOutsideClose,
  chatAssetsUrl,
} from './store'

class ChatBotWidget {
  constructor (options = {}) {
    this.app = null

    this.defaultOptions = {
      target: DEFAULT_TARGET,
      layout: LAYOUT_TYPE,
      position: DEFAULT_POSITION,
      locale: DEFAULT_LOCALE,
      devMode: false,
      visible: false,
      outsideClose: true,
      transportType: TRANSPORT_TYPE,
      assetsUrl: config.APP_ORIGIN || DEFAULT_ASSETS_URL,
      entryPoint: {
        token: null,
        baseUrl: null,
      },
      plugins: [],
      theme: {
        header: {},
        body: {},
        message: {},
        footer: {},
      },
      data: {
        title: DEFAULT_TITLE,
        logoUrl: null,
      },
    }
    this.options = defaultsDeep(options, this.defaultOptions)

    this._init()
  }

  async _init () {
    if (this.options.devMode) {
      console.group()
      console.log(`Тип транспорта: ${this.options.transportType}`)
      console.groupEnd()
    }

    this._setSettings()

    await this._getToken()

    this.app = new App({
      target: this.options.target,
    })
  }

  async _getToken () {
    const localToken = sessionStorage.getItem(TOKEN_NAME)

    if (!!localToken) {
      chatToken.set(localToken)

      if (this.options.devMode) {
        console.group()
        console.log('Токен получен из сессии:')
        console.log(localToken)
        console.groupEnd()
      }

      return
    }

    try {
      if (this.options.devMode) {
        console.group()
        console.log('Получение токена от сервера')
        console.log(`Адрес: ${this.options.entryPoint.token}`)
        console.groupEnd()
      }

      const { data: { token } } = await axios.get(this.options.entryPoint.token)

      chatToken.set(token)
      sessionStorage.setItem(TOKEN_NAME, token)

      if (this.options.devMode) {
        console.group()
        console.log('Токен от сервера получен:')
        console.log(token)
        console.groupEnd()
      }
    } catch (error) {
      console.log(error)
    }
  }

  _setSettings () {
    const {
      position,
      entryPoint: {
        baseUrl,
      },
      locale,
      devMode,
      transportType,
      layout,
      data,
      theme,
      visible,
      plugins,
      outsideClose,
      assetsUrl,
    } = this.options

    chatPosition.set(position)
    chatLocale.set(locale)
    chatTransportType.set(transportType)
    isDev.set(devMode)
    chatVisible.set(visible)
    chatOutsideClose.set(outsideClose)
    chatBaseUrl.set(baseUrl)
    chatLayout.set(layout)
    chatData.set(data)
    chatTheme.set(theme)
    chatPlugins.set(plugins)
    chatAssetsUrl.set(assetsUrl)
  }

  show () {
    if (this.options.layout === 'fixed') {
      chatVisible.show()
    }
  }

  hide () {
    if (this.options.layout === 'fixed') {
      chatVisible.hide()
    }
  }

  on (eventName, callback) {
    document.addEventListener(eventName, callback)

    return this
  }
}

window.ChatBotWidget = ChatBotWidget

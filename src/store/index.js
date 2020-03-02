import { writable } from 'svelte/store'
import { EVENTS } from '../constants'
import { CustomEvent } from '../utils'

function createChatVisible() {
  const { subscribe, set, update } = writable(true);

  const chatHideEvent = new CustomEvent(EVENTS.HIDE_NAME)
  const chatShowEvent = new CustomEvent(EVENTS.SHOW_NAME)

  return {
    subscribe,
    set,
    toggle: () => update(value => {
      value
        ? chatHideEvent.dispatchEvent()
        : chatShowEvent.dispatchEvent()

      return !value
    }),
    show: () => {
      chatShowEvent.dispatchEvent()
      return set(true)
    },
    hide: () => {
      chatHideEvent.dispatchEvent()
      return set(false)
    }
  }
}

function createChatLoading () {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    set,
    toggle: () => update(value => !value),
    show: () => set(true),
    hide: () => set(false)
  }
}

export const chatVisible = createChatVisible()
export const chatLoading = createChatLoading()
export const isDev = writable()
export const chatLayout = writable()
export const chatPosition = writable()
export const chatToken = writable()
export const chatBaseUrl = writable()
export const chatLocale = writable()
export const chatData = writable()
export const chatTransportType = writable()
export const chatPlugins = writable()
export const chatTheme = writable()
export const chatOutsideClose = writable()
export const chatAssetsUrl = writable()

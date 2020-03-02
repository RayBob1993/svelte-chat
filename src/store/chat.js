import { CustomEvent } from '../utils'
import { EVENTS } from '../constants'
import { writable } from 'svelte/store'

function createChatMessages () {
  const { subscribe, update } = writable([]);
  const messageReplyEvent = new CustomEvent(EVENTS.MESSAGE_REPLY_NAME)

  return {
    subscribe,
    add: newValue => update(value => {
      messageReplyEvent.dispatchEvent(newValue)

      value.find(item => {
        const isActionsType = item.type === 'actions'

        // Блокировать кнопки в истории
        if (isActionsType) {
          item.actions.forEach(action => {
            action.disabled = true
          })
        }
      })

      return value.concat(newValue)
    })
  }
}

export const chatMessages = createChatMessages()
export const isMessagesLoading = writable(false)

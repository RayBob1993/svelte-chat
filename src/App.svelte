<script>
  import {
    chatLoading,
    chatPosition,
    chatLayout,
    chatVisible,
    chatTransportType,
    chatOutsideClose,
  } from './store'
  import { EVENTS } from './constants'

  import ChatWss from './plugins/ChatWss'
  import ChatHttp from './plugins/ChatHttp'

  import { setContext, onMount } from 'svelte'
  import { CustomEvent } from './utils'
  import { get } from 'svelte/store'
  import { fade } from 'svelte/transition'
  import { TRANSITION_DURATION } from './constants'

  import Chat from './components/Chat.svelte'
  import ChatToggle from './components/ChatToggle.svelte'

  switch ($chatTransportType) {
    case 'wss':
      setContext('chat', new ChatWss())
      break

    case 'http':
      setContext('chat', new ChatHttp())
      break

    default:
      setContext('chat', new ChatWss())
  }

  const initEvent = new CustomEvent(EVENTS.INIT_NAME)
  let chatBot

  function clickOutside ({ target }) {
    const isClickInside = chatBot.contains(target)

    if (!isClickInside) {
      chatVisible.hide()
    }
  }

  onMount(() => {
    initEvent.dispatchEvent()

    if (
      get(chatOutsideClose) &&
      get(chatLayout) === 'fixed'
    ) {
      document.addEventListener('click', clickOutside)
    }
  })
</script>

<div
  class="chatBotContainer"
  class:layout-fixed={$chatLayout === 'fixed'}
  class:layout-static={$chatLayout === 'static'}
>
  {#if $chatLoading}
  <div
    class="chatBot"
    bind:this={chatBot}
    transition:fade={{
      duration: TRANSITION_DURATION,
    }}
    class:right-bottom={$chatPosition === 'right-bottom'}
    class:left-bottom={$chatPosition === 'left-bottom'}
  >
    <Chat/>

    {#if $chatLayout === 'fixed'}
      <ChatToggle/>
    {/if}
  </div>
  {/if}
</div>

<style lang="scss">
  .chatBotContainer {

  }

  .layout-fixed {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999999;

    .chatBot {
      position: absolute;
      width: 370px;

      @media (max-width: 767px) {
        width: 100%;
      }

      &.right-bottom {
        right: 20px;
        bottom: 20px;

        @media (max-width: 767px) {
          right: 50%;
          bottom: 0;
          transform: translateX(50%);
        }
      }

      &.left-bottom {
        left: 20px;
        bottom: 20px;
      }
    }
  }

  .layout-static {
    height: 100%;

    .chatBot {
      height: 100%;
    }
  }
</style>

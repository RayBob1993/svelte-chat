<script>
  import { chatLayout } from '../store'

	import {
		chatMessages,
		isMessagesLoading,
	} from '../store/chat'

  import ChatMessage from './ChatMessage.svelte'
  import ChatLoader from './ChatLoader.svelte'

	let chatBotBodyScroll;
</script>

<div
  class="chatBotBody"
  class:layout-fixed={$chatLayout === 'fixed'}
  class:layout-static={$chatLayout === 'static'}
  class:isLoading={$isMessagesLoading}
>
  <div
    class="chatBotBodyScroll"
    bind:this={chatBotBodyScroll}
  >
    <div class="chatBotMessages">
      {#each $chatMessages as { text, type, direction, time, attachment, actions }}
      <ChatMessage
        text={text}
        type={type}
        direction={direction}
        time={time}
        attachment={attachment}
        actions={actions}
      />
      {/each}
    </div>
  </div>

  {#if $isMessagesLoading}
  <ChatLoader/>
  {/if}
</div>

<style lang="scss">
  .chatBotBody {
	  position: relative;
	  overflow: hidden;
    flex: 1;

    background-image: linear-gradient(180deg,#fffdfb,#f8f7f7);

    &.layout-fixed {

    }

    &.layout-static {

    }
  }

  .chatBotBodyScroll {
	  height: 100%;
	  padding: 25px;
	  overflow-y: auto;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: #c26ad3 transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar:hover {
      cursor: pointer;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      background: rgb(194, 106, 211);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #666;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-corner {
      background: #999;
    }

    &::-webkit-resizer {
      background: #111;
    }
  }

  .chatBotMessages {
    display: flex;
    flex-direction: column;
  }
</style>

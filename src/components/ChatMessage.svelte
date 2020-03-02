<script>
  export let text = null
  export let type = 'text'
  export let direction = 'left'
  export let time = null
  export let attachment = null
  export let actions = null

  import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
  import { TRANSITION_DURATION } from '../constants'
  import { scrollTo } from '../utils'

  import ChatImage from '../components/ChatImage.svelte'
  import ChatActionButtons from '../components/ChatActionButtons.svelte'

  let chatBotMessage

  onMount(() => {
	  scrollTo('.chatBotBodyScroll', chatBotMessage)
  })
</script>

<div
  class="chatBotMessage"
  bind:this={chatBotMessage}
  transition:fly="{{
    y: 10,
    duration: TRANSITION_DURATION,
  }}"
  class:isLeft={direction === 'left'}
  class:isRight={direction === 'right'}
  class:isTypeText={type === 'text'}
  class:isTypeActions={type === 'actions'}
>
  {#if type === 'text'}
    {#if text}
    <div class="chatBotMessageText">
      {@html text}
    </div>
    {/if}

    {#if attachment}
    <div class="chatBotMessageAttachment">
      {#if attachment.type === 'image'}
      <ChatImage
        src="{attachment.url}"
      />
      {/if}
    </div>
    {/if}

    <time class="chatBotMessageTime">
      {time}
    </time>
  {/if}

  {#if type === 'actions'}
	  <ChatActionButtons
      actions={actions}
    />
  {/if}
</div>

<style lang="scss">
  .chatBotMessage {
    padding: 8px 8px 3px;
    margin-bottom: 15px;
    max-width: 90%;
    box-sizing: border-box;
    background-color: #f4f4f4;
    border-radius: 4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    line-height: 20px;
    color: #505963;
    height: 100%;

    &.isLeft {
      align-self: flex-start;
      background-color: #f6f6f7;
    }

    &.isRight {
      align-self: flex-end;
      background-color: #e2eef6;
    }

    &.isTypeActions {
      padding: 0;
      background: transparent;
      width: 100%;
    }
  }

  .chatBotMessageText {
    word-break: break-word;
  }

  .chatBotMessageTime {
    display: block;

    font-size: 10px;
    color: #575757;
    text-align: right;
  }
</style>

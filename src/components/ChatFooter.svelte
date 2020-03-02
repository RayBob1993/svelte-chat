<script>
  import { chatLayout } from '../store'
  import { isMessagesLoading } from '../store/chat'
  import { getContext } from 'svelte'

	const chat = getContext('chat')

	let text = ''

	$: hasText = !!text.trim()

  function onSend () {
		if (!hasText) {
			return
    }

		chat.send({
			text,
    })

    onClear()
  }

	function onClear () {
		text = ''
  }
</script>

<footer
  class="chatBotFooter"
  class:layout-fixed={$chatLayout === 'fixed'}
  class:layout-static={$chatLayout === 'static'}
>
  <form class="chatBotForm">
    <input
      class="chatBotField"
      placeholder="Введите сообщение"
      bind:value={text}
      disabled={$isMessagesLoading}
    />

    <button
      type="submit"
      on:click|preventDefault={onSend}
      disabled={$isMessagesLoading}
      class="chatBotFormButton"
    >
      →
    </button>
  </form>
</footer>

<style lang="scss">
  .chatBotFooter {
    border-top: 1px solid #ccc;

    &.layout-fixed {
      border-radius: 0 0 8px 8px;

      .chatBotField {
        border-radius: 0 0 8px 8px;
      }
    }

    &.layout-static {

    }
  }

  .chatBotForm {
    position: relative;
  }

  .chatBotField {
    display: block;
    width: 100%;
    padding: 18px 65px 18px 26px;
    border: 0;
    box-sizing: border-box;
    height: 55px;

    outline: none;
    background-color: #fff;

    resize: none;

    color: #424d5a;
    font-family: Montserrat,Noto Color Emoji,HelveticaNeue,sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    -webkit-appearance: none;
    opacity: 1 !important;
    background: #fff !important;

  }

  .chatBotFormButton {
    position: absolute;
    top: 50%;
    right: 12px;

    width: 38px;
    height: 32px;
    padding: 0;
    border: 0;
    margin-top: -2px;

    cursor: pointer;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    color: #c6cfd6;

    background: transparent;
    outline: 0;

    transform: translateY(-50%);
  }
</style>

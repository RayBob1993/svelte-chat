<script>
  export let actions

  import { getContext } from 'svelte'

  const chat = getContext('chat')
</script>

{#each actions as { text, value, disabled }}
	<button
    class="chatActionButton"
    class:disabled={disabled}
    disabled={disabled}
		on:click="{() => chat.send({
		  text,
		  value,
	  })}"
	>
    {text}
	</button>
{/each}

<style lang="scss">
  .chatActionButton {
	  display: block;
	  width: 100%;
	  padding: 10px 10px 10px 15px;
    box-sizing: border-box;
	  overflow: hidden;
	  border: 1px solid #781fa1;

	  border-radius: 5px;
    background-color: #fff;
    outline: none;

	  font-family: 'Montserrat', sans-serif;
	  font-size: 14px;
	  font-weight: 400;
	  line-height: 16px;
	  color: #781FA1;

	  cursor: pointer;

    transition: .2s ease-in-out;

    &:not([disabled]):hover {
      background: linear-gradient(249deg,#6d1a94,#932bc2);

      color: #fff;
    }

    &[disabled] {
      opacity: .5;

      cursor: not-allowed;
    }

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
</style>

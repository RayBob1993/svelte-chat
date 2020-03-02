<script>
	import {
		chatVisible,
		chatPosition,
    chatAssetsUrl,
	} from '../store'
</script>

<button
  class="chatBotToggle"
  on:click="{chatVisible.toggle}"
  class:active="{$chatVisible}"
  class:right-bottom="{$chatPosition === 'right-bottom'}"
  class:left-bottom="{$chatPosition === 'left-bottom'}"
>
  {#if $chatVisible}
    <img
      src="{$chatAssetsUrl}assets/img/icon-close.svg"
      width="14"
      height="14"
      alt="Скрыть чат"
    />
  {:else}
    <img
      src="{$chatAssetsUrl}assets/img/bot-icon.png"
      width="40"
      height="39"
      alt="Показать чат"
    />
  {/if}
</button>

<style lang="scss">
  .chatBotToggle {
    position: absolute;
    bottom: 0;
    width: 70px;
    height: 70px;
    padding: 0;
    border: 0;
    transition: width .2s, height .2s ease-in-out;
    outline: none;
    background-image: linear-gradient(138deg,#ff9bfd,#fa3efb);
    border-radius: 100%;
    box-shadow: 0 2px 32px rgba(0,0,0,.15), 0 1px 6px rgba(0,0,0,.09);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      pointer-events: none;
    }

    &:hover {
      background: #d030d0;
      cursor: pointer;
    }

    &.right-bottom {
      right: 0;

      @media (max-width: 767px) {
        &:not(.active) {
          right: 10px;
          bottom: 10px;
        }
      }
    }

    &.left-bottom {
      left: 0;
    }

    &.active {
      width: 50px;
      height: 50px;

      @media (max-width: 767px){
        z-index: 5;
        bottom: 405px;
        background: none;
        box-shadow: none;
        width: 30px;
        height: 30px;
        right: 20px;
      }

      @media (min-width: 568px) and (max-width: 736px) {
        bottom: 270px;
      }
    }
  }
</style>

<script>
  import { get } from 'svelte/store'
  import {
    chatData,
    chatLayout,
    chatAssetsUrl
  } from '../store'

  const logoUrl = get(chatData).logoUrl || `${get(chatAssetsUrl)}assets/img/logo_c-bot.png`

</script>

<header
  class="chatBotHeader"
  class:layout-fixed={$chatLayout === 'fixed'}
  class:layout-static={$chatLayout === 'static'}
>
  {#if logoUrl}
	<img
    class="chatBotHeaderLogo"
		src={logoUrl}
		alt={$chatData.title}
	>
  {/if}
  <h3 class="chatBotTitle">
    {$chatData.title}
  </h3>
</header>

<style lang="scss">
  .chatBotHeader {
    position: relative;
    z-index: 2;

    padding: 10px 25px;
    min-height: 60px;
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,.2);

    &.layout-fixed {
      border-radius: 8px 8px 0 0;
    }

    &.layout-static {

    }
  }

  .chatBotHeaderLogo {
    max-width: 40px;
    margin-right: 10px;
  }

  .chatBotTitle {
	  overflow: hidden;
    flex: 1;
    margin: 0;
    max-height: 34px;
	  display: -webkit-box;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;

    color: #262c45;
    font-family: Montserrat,Arial,sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 17px;
	  text-overflow: ellipsis;
  }
</style>

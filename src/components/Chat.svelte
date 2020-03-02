<script>
	import {
		chatVisible,
		chatPosition,
    chatLayout,
	} from '../store'

	import { fly } from 'svelte/transition'
	import { TRANSITION_DURATION } from '../constants'

  import ChatHeader from './ChatHeader.svelte'
  import ChatBody from './ChatBody.svelte'
  import ChatFooter from './ChatFooter.svelte'
</script>

{#if $chatVisible}
<section
  class="chatWindow"
  transition:fly={{
  	y: 50,
  	duration: TRANSITION_DURATION,
  }}
  class:layout-fixed={$chatLayout === 'fixed'}
  class:layout-static={$chatLayout === 'static'}
  class:right-bottom={$chatLayout === 'fixed' && $chatPosition === 'right-bottom'}
  class:left-bottom={$chatLayout === 'fixed' && $chatPosition === 'left-bottom'}
>
  <ChatHeader/>
  <ChatBody/>
  <ChatFooter/>
</section>
{/if}

<style lang="scss">
  .chatWindow {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    &.layout-fixed {
      position: absolute;
      bottom: 70px;

      height: 500px;

      border-radius: 0 0 8px 8px;
      box-shadow: 0 5px 40px rgba(0,0,0,.15);

      @media (max-width: 767px){
        bottom: 0;

        height: 450px;
      }

      @media (min-width: 568px) and (max-width: 736px){
        height: 315px;
      }

      &.right-bottom {
        right: 0;
      }

      &.left-bottom {
        left: 0;
      }
    }

    &.layout-static {
      height: 100%;
    }
  }
</style>

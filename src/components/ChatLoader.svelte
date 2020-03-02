<script>
	import { scale } from 'svelte/transition'

	import { TRANSITION_DURATION } from '../constants'
</script>

<div
  class="chatLoader"
  transition:scale="{{
    duration: TRANSITION_DURATION,
    opacity: 0,
    start: 0.8,
  }}"
/>

<style lang="scss">
  .chatLoader {
	  position: absolute;
	  top: 0;
	  left: 0;
	  right: 0;
	  bottom: 0;

	  background: rgba(255,255,255,.8);

    &:before {
      position: absolute;
      top: calc(50% - 15px);
      left: calc(50% - 15px);

      width: 30px;
      height: 30px;
      border: 2px solid transparent;
      border-left-color: #222;

      animation: .5s placeholder linear infinite;

      border-radius: 100%;

      content: '';
    }
  }

  @keyframes placeholder {
	  to {
		  transform: rotate(360deg);
	  }
  }
</style>

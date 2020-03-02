<script>
  export let src = ''
  export let alt = ''

  import { onMount } from 'svelte'

  let imageEl
  let error = false
  let imageWidth = 0
  let imageHeight = 0
  let isLoading = false

  function onLoadImage (src) {
	  const img = new Image();
	  img.src = src

    img.onload = event => handleLoad(event, img)
    img.onerror = event => handleError(event)
  }

  function handleLoad (event, img) {
	  imageWidth = img.width
	  imageHeight = img.height
	  isLoading = true
  }

  function handleError (event) {
	  isLoading = false
	  error = true
  }

  onMount(() => {
	  onLoadImage(src)
  })
</script>

{#if isLoading}
  <img
    class="image"
    bing:this="{imageEl}"
    src={src}
    alt={alt}
  >
{:else}
	<div class="imagePlaceholder"/>
{/if}

<style lang="scss">
  .image {
    display: block;
    max-width: 100%;
  }

  .imagePlaceholder {
	  position: relative;

    min-width: 200px;
    height: 142px;

    background-color: #ddd;
    border-radius: 5px;

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

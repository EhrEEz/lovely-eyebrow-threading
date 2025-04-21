<script lang="ts">
  type Preview = {
    thumbnail: string;
    image: string;
    alt: string;
  };

  const { thumbnail, image, alt } = $props();
</script>

<div class="preview__thumbnail">
  <img src={thumbnail} {alt} />
</div>

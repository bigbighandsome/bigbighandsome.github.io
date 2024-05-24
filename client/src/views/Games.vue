<template>
      <div>
            <h2>嵌入网址示例</h2>
            <div class="embedded-site">
                  <iframe
                        :src="embeddedUrl"
                        frameborder="0"
                        width="100%"
                        height="500px"
                  ></iframe>
            </div>
      </div>
</template>

<script setup>
import { ref } from "vue";
const embeddedUrl = ref("http://localhost:8080/api"); // 替换为您要嵌入的网址
</script>

<style>
.embedded-site {
      width: 100%;
      height: 500px;
      border: 1px solid #ccc;
}
</style>

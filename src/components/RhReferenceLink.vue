<template>
  <div>
    <p class="font-bold">参考链接：</p>
    <ul>
      <li v-for="item in links" :key="item.link" class="mt-3 text-cs list-disc ml-4">
        {{ item.label }}
        <a class="underline text-blue-600" target="__blank" :href="item.link" v-if="item.link">{{ item.link }}</a>
        <span class="underline font-semibold" v-else-if="item.answer">{{ item.answer }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    defult: [],
  },
});
</script>

<style></style>

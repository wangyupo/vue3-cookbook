<template>
  <el-input type="textarea" v-model="html"></el-input>
  <el-button type="primary" @click="handleConvert">转换</el-button>

  <div v-highlight>
    <pre>
        <code class="html">
{{ htmlRes }}
        </code>
    </pre>
  </div>
</template>

<script setup>
import { ref } from "vue";
const html = ref("");
const htmlRes = ref("");
const handleConvert = () => {
  htmlRes.value = html.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};
</script>

<style></style>

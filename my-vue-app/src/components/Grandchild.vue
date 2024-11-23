<template>
  <div>
    <p>Child count: {{ onCount }}</p>
    <button @click="$emit('reset')">Reset Count</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GrandchildComponent",
  props: ["onCount"],
  emits: ["reset"],
});
</script>

<template>
  <div>
    <p>Childvärde:: {{ message }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChildComponent",
  props: ["message"],
});
</script>

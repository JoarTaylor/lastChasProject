<template>
  <section>
    <div v-for="(form, index) in forms" :key="form.name">
      <p>{{ form.email }}</p>
      <p>{{ form.message }}</p>
      <p>{{ form.name }}</p>
      <button @click="handleDelete(index)">Delete</button>
    </div>
  </section>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useFormDataStore } from "../../src/store";

export default defineComponent({
  setup() {
    const formDataStore = useFormDataStore();
    const { formDataList } = storeToRefs(formDataStore);

    const handleDelete = (index: number) => {
      formDataStore.deleteIndex(index);
    };

    return { forms: formDataList, handleDelete };
  },
});
</script>

<style scoped>
section {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>

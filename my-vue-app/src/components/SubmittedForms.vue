<template>
  <div>
    <div
      style="border: 1ch solid red"
      v-for="(form, index) in forms"
      :key="form.name"
    >
      <p>{{ form.email }}</p>
      <p>{{ form.message }}</p>
      <p>{{ form.name }}</p>
      <button @click="handleDelete(index)">Delete</button>
    </div>
  </div>
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

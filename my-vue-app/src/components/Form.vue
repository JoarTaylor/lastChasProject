<template>
  <div class="vue-advanced-examples">
    <form @submit.prevent="handleSubmit">
      <h1>Global state example</h1>

      <div
        style="display: flex; align-items: start; flex-direction: column"
        fle
      >
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" />
      </div>

      <div style="display: flex; align-items: start; flex-direction: column">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" />
      </div>

      <div style="display: flex; align-items: start; flex-direction: column">
        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.message"></textarea>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { MyFormData } from "../../src/types";
import { useFormDataStore } from "../store";

export default defineComponent({
  name: "MyForm",
  setup() {
    const formData = ref<MyFormData>({
      name: "",
      email: "",
      message: "",
    });
    const formDataStore = useFormDataStore();

    const response = ref<string>();

    const handleSubmit = () => {
      formDataStore.addFormDataInstance(formData.value);
      resetForm();
    };

    const resetForm = () => {
      formData.value = {
        name: "",
        email: "",
        message: "",
      };
    };

    return {
      formData,
      handleSubmit,
      response,
    };
  },
});
</script>

<style scoped>
.vue-advanced-examples {
  font-family: Arial, sans-serif;
  padding: 20px;
}

section {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  width: 400px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2a9a6f;
}
</style>

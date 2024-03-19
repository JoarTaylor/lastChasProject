<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="formData.name" />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="formData.email" />
    </div>
    <div>
      <label for="message">Message:</label>
      <textarea id="message" v-model="formData.message"></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
  <h1>{{ response }}</h1>
</template>

<script lang="ts">
import axios from "axios";
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
      console.log("Form submitted with data:", formData.value);
      axios
        .post<string>("http://localhost:3000", formData.value)
        .then(({ data }) => {
          response.value = `Thanks ${data}`;
          formDataStore.setHasMutated();
        })
        .catch((e) => console.log("error: ", e.message));
      resetForm();
    };

    const resetForm = () => {
      // Reset form data
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

<style scoped></style>

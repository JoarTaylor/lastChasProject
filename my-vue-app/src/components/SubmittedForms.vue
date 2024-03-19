<template>
  <button @click="refetchThis">Refetch</button>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="form in forms" :key="form.id">
        <p>{{ form.email }}</p>
        <p>{{ form.message }}</p>
        <p>{{ form.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, watch } from "vue";
import { useFormDataStore } from "../../src/store";
import { MyFormData } from "../../src/types";

export default defineComponent({
  setup() {
    const formDataStore = useFormDataStore();

    const { formDataList, hasMutated } = storeToRefs(formDataStore);

    const { result, loading, refetch } = useQuery<{
      formData: MyFormData[];
    }>(gql`
      {
        formData {
          name
          message
          id
          email
        }
      }
    `);

    onMounted(() => {
      if (result.value?.formData) {
        formDataStore.addFormData(result.value?.formData);
      } else {
        refetch()?.then(({ data }) => {
          console.log(data);
          formDataStore.addFormData(data.formData);
        });
      }
    });

    watch(hasMutated, async (newValue) => {
      if (newValue) {
        console.log("watched");
        loading.value = true;
        await refetchThis();
        loading.value = false;
        formDataStore.resetHasMutated();
      }
    });

    const refetchThis = async () => {
      const data = await refetch();
      if (!data) return;
      formDataStore.addFormData(data.data.formData);
    };

    return { forms: formDataList, loading, refetchThis };
  },
});
</script>

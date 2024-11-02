// src/store/index.ts

import { defineStore } from "pinia";
import { MyFormData } from "./types";

export const useFormDataStore = defineStore({
  id: "formData",
  state: () => ({
    formDataList: [] as MyFormData[],
    hasMutated: false,
  }),
  getters: {
    getFormDataList(): MyFormData[] {
      return this.formDataList;
    },
    getHasMutated(): boolean {
      return this.hasMutated;
    },
  },
  actions: {
    addFormData(formData: MyFormData[]) {
      this.formDataList = formData;
    },
    addFormDataInstance(formData: MyFormData) {
      console.log(formData);
      this.formDataList = [...this.formDataList, formData];
    },
    clearFormData() {
      this.formDataList = [];
    },
    deleteIndex(index: number) {
      this.formDataList = [...this.formDataList.filter((_, i) => i !== index)];
    },
    setHasMutated() {
      this.hasMutated = true;
    },
    resetHasMutated() {
      this.hasMutated = false;
    },
  },
});

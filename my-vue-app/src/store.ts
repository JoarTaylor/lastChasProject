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
    clearFormData() {
      this.formDataList = [];
    },
    setHasMutated() {
      this.hasMutated = true;
    },
    resetHasMutated() {
      this.hasMutated = false;
    },
  },
});

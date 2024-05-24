import { defineStore } from "pinia";

export const CourseStore = defineStore("course", {
      state: () => {
            return {
                  usertoken: "",
                  x_id_token: "",
                  token: "",
                  kbjcmsid: "",
            };
      },
      actions: {},
      getters: {},
});

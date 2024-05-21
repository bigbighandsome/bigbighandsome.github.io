import { createApp, provide } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import naive from "naive-ui";
import { createDiscreteApi } from "naive-ui";
import { AdminStore } from "./stores/AdminStore";
import { UserStore } from "./stores/UserStore";
import VueLazyload from "vue-lazyload";

const { message, notification, dialog, loadingBar } = createDiscreteApi([
      "message",
      "dialog",
      "notification",
      "loadingBar",
]);

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

import { router } from "./common/router";
import axios from "axios";

//category/list
// axios.defaults.baseURL = "http://47.96.155.30"; //生产url
// axios.defaults.baseURL = "https://xygodcyx.github.io" //GitHub专属url
axios.defaults.baseURL = "http://localhost:8080"; //开发url
// axios.defaults.baseURL = "http://218.65.5.217"

const app = createApp(App);
//取消警告
app.config.warnHandler = () => null;

//provide
app.provide("axios", axios);
app.provide("message", message);
app.provide("notification", notification);
app.provide("dialog", dialog);
app.provide("loadingBar", loadingBar);
app.provide("server_url", axios.defaults.baseURL);

app.use(createPinia());
app.use(router);
app.use(VueLazyload, {
      preLoad: 1,
      error: "error.png",
      loading: "loading.gif",
      attempt: 1,
      listenEvents: ["touchmove", "mousewheel"],
});
app.mount("#app");

const adminStore = AdminStore();
const userStore = UserStore();
axios.interceptors.request.use((config) => {
      config.headers.token = localStorage.getItem("admin_token");
      config.headers.usertoken = localStorage.getItem("usertoken");
      return config;
});

app.use(naive);

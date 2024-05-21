<template>
      <div class="wrap">
            <div class="wrap-item left">
                  <div class="config_group">
                        <!-- <input id
          ="htmlCheck" type="checkbox" checked @change="checkConfig">html</input>
          <input id
          ="cssCheck" type="checkbox" checked @change="checkConfig">css</input>
          <input id
          ="jsCheck" type="checkbox" checked @change="checkConfig">js</input> -->
                  </div>
                  <div id="startArea" v-show="!liveLoop.start">
                        <textarea
                              name=""
                              cols="30"
                              rows="10"
                              class="html textArea"
                              id="html"
                              v-model="inputValue.html"
                              placeholder="填写你的html结构"
                        ></textarea>
                        <textarea
                              name="htmltype"
                              cols="30"
                              rows="10"
                              class="css textArea"
                              id="css"
                              v-model="inputValue.css"
                              placeholder="填写你的css样式"
                        ></textarea>
                        <textarea
                              name="htmltype"
                              cols="30"
                              rows="10"
                              class="css textArea"
                              id="js"
                              v-model="inputValue.js"
                              placeholder="填写你的js代码"
                        ></textarea>
                        <button id="start" @click="startType">开始！</button>
                  </div>
                  <div class="left-item wrap-item-item" ref="left_item"></div>
            </div>
            <div class="wrap-item right" ref="rightHtmlElement">
                  <div class="right-item wrap-item-item"></div>
            </div>
      </div>
</template>

<script setup lang="ts">
import {
      ref,
      reactive,
      inject,
      watchEffect,
      onMounted,
      shallowRef,
      computed,
      onBeforeUnmount,
      watch,
      h,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {} from "@vicons/ionicons5";

import { UserStore } from "../stores/UserStore";
import Comment from "../components/Comment.vue";
const userStore = UserStore();
const route = useRoute();
const router = useRouter();
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const server_url = inject("server_url");
const loadingBar = inject("loadingBar");

const rightHtmlElement = ref(null);
const left_item = ref(null);

const liveLoop = reactive({
      start: false,
      emd: false,
});

const inputValue = reactive({
      html: "",
      css: "",
      js: "",
});

const showPageValue = reactive({
      htmlValue: "",
});

const config = reactive({
      hasJs: true,
      hasCss: true,
      hasHtml: true,
});

let evalCssCode = ref("");
let evalHtmlCode = ref("");
let evalJsCode = ref("");

let count = ref(0);
const styleElement = document.createElement("style");

const createHtmlByHtmlStr = () => {
      let wrap = document.createElement("div");
      wrap.innerHTML = evalHtmlCode.value;
      rightHtmlElement.value.appendChild(wrap);
};

const startType = () => {
      // liveLoop.start = true;
      evalHtmlCode.value = inputValue.html.trim();
      evalCssCode.value = inputValue.css.trim();
      evalJsCode.value = inputValue.js.trim();
      typeStr();
};

const typeStr = () => {
      liveLoop.start = true;
      console.log(inputValue.css);

      createHtmlByHtmlStr();
      let top = 0;
      const typeInterval = setInterval(() => {
            if (count.value == evalCssCode.value.length) {
                  console.log(config);

                  if (config.hasJs && inputValue.js !== "") {
                        evalJsCode.value = inputValue.js.trim();
                        console.log(`jsCode:${evalJsCode.value}`);
                        try {
                              eval(evalJsCode.value);
                        } catch (e) {
                              console.error(e);
                        }
                  }
                  clearInterval(typeInterval);
                  left_item.value.innerHTML += "<h1>写完啦！！！</h1>";
                  return;
            }

            left_item.value.innerHTML += evalCssCode.value[count.value];
            if (
                  evalCssCode.value[count.value] == ";" ||
                  evalCssCode.value[count.value] == "}"
            ) {
                  left_item.value.innerHTML += "<br>";
                  if (left_item.value.clientHeight > window.innerHeight / 1.6) {
                        top =
                              left_item.value.clientHeight -
                              window.innerHeight / 1.6;
                        left_item.value.style.marginTop = `${-top.toString()}px`;
                  }
            }

            styleElement.textContent += evalCssCode.value[count.value];
            document.head.appendChild(styleElement);
            count.value++;
      }, 1);
};
</script>

<style lang="scss" scoped>
.wrap {
      width: 100%;
      display: flex;
      padding: 5px;
      .wrap-item {
            width: 50%;
            height: 100vh;
            padding: 5px;
            .wrap-item-item {
                  margin: 100px 40px;
                  border: none;
            }
      }
      .left {
            .config_group {
                  .config_group {
                        z-index: 9999;
                  }
                  .textArea {
                        width: 43%;
                        height: 70vh;
                        border: none;
                        outline: none;
                        background-color: rgb(140, 179, 210);
                        transition: none;
                        z-index: -999;
                        &::placeholder {
                              width: 200px;
                              height: 20px;

                              color: rgb(0, 0, 0);
                        }
                  }
                  .html {
                        z-index: -999;
                  }
                  .css {
                        margin-left: 12%;
                  }
                  #start {
                        background-color: rgb(122, 180, 227);
                        width: 100%;
                        height: 60px;
                        border: none;
                        outline: none;
                  }
                  padding: 5px;
                  .left-item {
                        margin: 0;
                        overflow-y: hidden;
                        font-size: 1.09em;
                        overflow: visible;
                  }
            }
            .right {
                  .right-item {
                  }
            }
      }
}
</style>

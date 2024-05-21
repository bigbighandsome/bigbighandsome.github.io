<!--
 * @Author: xygodcyx 1323943635@qq.com
 * @Date: 2023-08-29 18:29:25
 * @LastEditors: xygodcyx 1323943635@qq.com
 * @LastEditTime: 2023-09-04 08:17:41
 * @FilePath: \blog\client\src\views\Login.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
      <div
            class="w-2/5 h-1/2 mx-auto max-sm:w-full max-sm:h-screen max-sm:flex max-sm:items-center"
      >
            <n-card title="管理后台登录" class="">
                  <n-form :rules="rules" :model="admin">
                        <n-form-item path="account" label="账号">
                              <n-input
                                    round
                                    show-count
                                    autofocus
                                    v-model:value="admin.account"
                                    placeholder="请输入账号"
                              ></n-input>
                        </n-form-item>
                        <n-form-item path="password" label="密码">
                              <n-input
                                    round
                                    type="password"
                                    show-password-on="click"
                                    v-model:value="admin.password"
                                    placeholder="请输入密码"
                              ></n-input>
                        </n-form-item>
                  </n-form>
                  <template #footer>
                        <div class="flex items-center">
                              <!-- <n-checkbox
                      v-model:checked="admin.rememberMe"
                      label="记住我"></n-checkbox> -->
                              <n-switch
                                    :rail-style="railStyle"
                                    v-model:value="admin.rememberMe"
                              >
                                    <template #checked>记住密码</template>
                                    <template #unchecked>不记住</template>
                              </n-switch>
                              <n-space>
                                    <n-button
                                          type="success"
                                          class="ml-12"
                                          @click="login"
                                          >登录</n-button
                                    >
                                    <n-button
                                          type="warning"
                                          dashed
                                          @click="toHomePage"
                                    >
                                          返回
                                    </n-button>
                              </n-space>
                        </div>
                  </template>
            </n-card>
      </div>
</template>

<script setup>
import { ref, reactive, inject } from "vue";
import { AdminStore } from "../stores/AdminStore";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const adminStore = AdminStore();
//注入
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");

let rules = {
      account: [
            { required: true, message: "请输入账号", trigger: "blur" },
            {
                  min: 3,
                  max: 12,
                  message: "账号长度在 3 到 12 个字符之间",
                  trigger: "blur",
            },
      ],
      password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
                  min: 4,
                  max: 18,
                  message: "密码长度在 4 到 18 个字符之间",
                  trigger: "blur",
            },
      ],
};
/**
 * @description:
 * @return {*}
 */
const admin = reactive({
      account: localStorage.getItem("account") || "",
      password: localStorage.getItem("password") || "",
      rememberMe: localStorage.getItem("rememberMe") == 1,
});

const login = async () => {
      let result = await axios.post("/admin/login", {
            account: admin.account,
            password: admin.password,
      });

      if (result.data.code == 200) {
            adminStore.id = result.data.data.id;
            adminStore.account = result.data.data.account;
            adminStore.token = result.data.data.token;
            localStorage.setItem("admin_token", adminStore.token);
            if (admin.rememberMe) {
                  localStorage.setItem("account", admin.account);
                  localStorage.setItem("password", admin.password);
                  localStorage.setItem(
                        "rememberMe",
                        admin.rememberMe == true ? 1 : 0
                  );
            } else {
                  localStorage.setItem("account", "");
                  localStorage.setItem("password", "");
                  localStorage.setItem("rememberMe", 0);
            }
            message.success("登录成功", {
                  duration: 600,
                  placement: "bottom-right",
                  showIcon: true,
                  onAfterLeave: () => {
                        loadingBar.start();
                        router.push("/dashboard/article");
                        loadingBar.finish();
                  },
            });
      } else {
            loadingBar.start();
            message.error("登录失败", { duration: 600 });
            loadingBar.error();
      }
};

const toHomePage = () => {
      dialog.create({
            type: "warning",
            title: "返回?",
            negativeText: "取消",
            positiveText: "确认",
            onNegativeClick: () => {},
            onPositiveClick: () => {
                  router.push("/");
            },
      });
};
</script>

<style lang="scss" scoped></style>

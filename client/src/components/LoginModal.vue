<template>
      <n-modal v-model:show="showLoginModal">
            <n-card
                  title="管理后台登录"
                  style="width: 400px"
                  transform-origin="mouse"
            >
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
                        <n-space justify="space-between">
                              <n-button
                                    type="success"
                                    @click="onLoginNegativeClick"
                                    >取消</n-button
                              >
                              <n-button
                                    type="success"
                                    @click="onLoginPositiveClick"
                                    >登录</n-button
                              >
                        </n-space>
                  </template>
            </n-card>
      </n-modal>
</template>

<script setup>
import { ref, reactive, inject, watchEffect } from "vue";
import { AdminStore } from "../stores/AdminStore";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const adminStore = AdminStore();

//注入
const axios = inject("axios");
const message = inject("message");

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

const admin = reactive({
      account: localStorage.getItem("account") || "",
      password: localStorage.getItem("password") || "",
});
const showLoginModal = ref(false);

watchEffect(() => {});

const onLoginNegativeClick = () => {
      showLoginModal.value = false;
};
const onLoginPositiveClick = async () => {
      let result = await axios.post("/admin/login", {
            account: admin.account,
            password: admin.password,
      });
      if (result.data.code == 200) {
            adminStore.id = result.data.data.id;
            adminStore.account = result.data.data.account;
            adminStore.token = result.data.data.token;
            localStorage.setItem("admin_token", adminStore.token);
            localStorage.setItem("account", admin.account);
            localStorage.setItem("password", admin.password);
            message.success("登录成功", {
                  duration: 600,
            });
      } else {
            message.error(result.data.msg, { duration: 600 });
      }
      showLoginModal.value = false;
};

defineExpose({
      showLoginModal,
});
</script>

<style lang="scss" scoped></style>
./stores/AdminStore

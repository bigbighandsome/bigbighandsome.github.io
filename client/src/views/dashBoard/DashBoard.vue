<!--
 * @Author: xygodcyx 1323943635@qq.com
 * @Date: 2023-08-29 21:54:04
 * @LastEditors: xygodcyx 1323943635@qq.com
 * @LastEditTime: 2023-09-05 07:53:31
 * @FilePath: \blog\client\src\views\dashBoard\DashBoard.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
      <div>
            <n-space vertical>
                  <!-- <n-switch v-model:value="collapsed" /> -->
                  <n-layout has-sider>
                        <n-layout-sider
                              bordered
                              collapse-mode="width"
                              :collapsed-width="64"
                              :width="240"
                              :collapsed="collapsed"
                              show-trigger
                              @collapse="collapsed = true"
                              @expand="collapsed = false"
                        >
                              <n-menu
                                    class="h-screen"
                                    accordion
                                    :options="menuOptions"
                                    :render-label="renderMenuLabel"
                                    :render-icon="renderMenuIcon"
                                    :collapsed="collapsed"
                                    :collapsed-width="64"
                                    :on-update:value="onUpdate"
                                    :collapsed-icon-size="22"
                              />
                        </n-layout-sider>
                        <n-layout class="ml-2">
                              <router-view></router-view>
                        </n-layout>
                  </n-layout>
            </n-space>
      </div>

      <n-modal v-model:show="showAffirm">
            <n-card
                  style="width: 400px"
                  title="退出"
                  :bordered="false"
                  size="huge"
                  preset="card"
                  aria-modal="true"
            >
                  <template #header-extra :color="red">退出了？</template>
                  真的退出？
                  <template #footer>
                        <n-space justify="space-between">
                              <n-button type="info" @click="onNegativeClick"
                                    >假的</n-button
                              >
                              <n-button type="warning" @click="onPositiveClick"
                                    >真的</n-button
                              >
                        </n-space>
                  </template>
            </n-card>
      </n-modal>
</template>

<script setup>
import { ref, reactive, inject, h, onMounted } from "vue";
import { AdminStore } from "../../stores/AdminStore";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { NIcon, NEllipsis, NTooltip } from "naive-ui";
import {
      DuplicateOutline as CategoryIcon,
      GitCommit as CommitIcon,
      BookOutline as BookIcon,
      LogOutOutline as LogOutIcon,
      HomeOutline as HomeOutIcon,
} from "@vicons/ionicons5";

const router = useRouter();
const route = useRoute();

const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");
const admin = AdminStore();
onMounted(() => {
      // router.push("/dashboard/article")
});
const collapsed = ref(true);
const showAffirm = ref(false);
const onPositiveClick = () => {
      router.push({
            name: "adminLogin",
      });
      localStorage.setItem("admin_token", "");
      localStorage.setItem("account", "");
      localStorage.setItem("password", "");
      admin.account = "";
      admin.password = "";
      message.success("退出成功");
};
const onNegativeClick = () => {
      showAffirm.value = false;
      message.info("取消");
};
// function renderIcon(icon) {
//   return () => h(NIcon, null, { default: () => h(icon) });
// }
const menuOptions = [
      {
            label: "文章管理",
            href: "articleAdmin",
            key: "hear-the-wind-sing",
            icon: BookIcon,
      },
      {
            label: "分类管理",
            href: "categoryAdmin",
            key: "category",
            icon: CategoryIcon,
            // children: [
            //   {
            //     label: "书是人类进步的阶梯",
            //     ellipsis: "100px",
            //     icon: CategoryIcon,
            //   },
            // ],
      },
      {
            label: "评论",
            href: "commentAdmin",
            key: "comment",
            icon: CommitIcon,
      },
      {
            label: "退出",
            key: "logout",
            icon: LogOutIcon,
      },
      {
            label: "返回博客",
            key: "backBlog",
            icon: HomeOutIcon,
      },
];

const onUpdate = (key, item) => {
      switch (key) {
            case "logout":
                  showAffirm.value = true;
                  break;
            case "backBlog":
                  dialog.create({
                        type: "warning",
                        title: "返回",
                        content: "确定返回博客首页? 所有未提交的属性将会丢失",
                        negativeText: "取消",
                        positiveText: "确认",
                        onNegativeClick: () => {},
                        onPositiveClick: () => {
                              router.push("/");
                        },
                  });
                  break;
            default:
                  break;
      }
};

const renderMenuLabel = (option) => {
      if ("href" in option) {
            return h(
                  RouterLink,
                  {
                        to: {
                              name: option.href,
                        },
                  },
                  {
                        default: () => option.label,
                  }
            );
      }
      if ("ellipsis" in option) {
            return h(
                  NEllipsis,
                  {
                        style: `max-width:${option.ellipsis}`,
                  },
                  {
                        default: () => option.label,
                  }
            );
      }
      return option.label;
};

const renderMenuIcon = (option) => {
      return h(NIcon, null, {
            default: () => h(option.icon),
      });
};
</script>

<style lang="scss" scoped></style>

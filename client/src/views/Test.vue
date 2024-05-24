<template>
      <div>Test12121</div>
      <Switch />
</template>

<script setup>
import Switch from "../components/Switch.vue";
import {
      ref,
      reactive,
      inject,
      watchEffect,
      onMounted,
      shallowRef,
      computed,
      onBeforeUnmount,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
      ArrowUpCircleOutline as ArrowUpCircleIcon,
      HeartOutline as HeartIcon,
      HeartSharp as HeartSharpIcon,
} from "@vicons/ionicons5";

const route = useRoute();
const router = useRouter();
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");
const week = ref(3);
const courses = ref([]);
onMounted(() => {
      getToken();
});

//get_token
const getToken = async () => {
      let usertoken =
            "eyJhbGciOiJSUzUxMiJ9.eyJBVFRSX3VzZXJObyI6IjM2MDQyNTIwMDMwODIxNDAzOCIsInN1YiI6IjIyMzA1MDY1OSIsImlzcyI6InNzby5qdnRjLmp4LmNuIiwiZGV2aWNlSWQiOiJZTkxOOHV3c2RHSURBS3dLWkJ4VUtEeXQiLCJBVFRSX2lkZW50aXR5VHlwZUlkIjoiYjI1YjkwNzA4MTY0MTFlYjVmNzc1NTI4OWZjYzcxNzIiLCJBVFRSX2FjY291bnRJZCI6ImIwYzM3ZGEwMWZhNTExZWQxMDU2ZDk0MmIwZDZhMjM4IiwiQVRUUl91c2VySWQiOiJiMGFjYzE1MDFmYTUxMWVkMTA1NmQ5NDJiMGQ2YTIzOCIsIkFUVFJfaWRlbnRpdHlUeXBlQ29kZSI6IlMwMiIsIkFUVFJfaWRlbnRpdHlUeXBlTmFtZSI6IuWtpueUnyIsIkFUVFJfb3JnYW5pemF0aW9uTmFtZSI6IuWJjeerrzIyMDIiLCJBVFRSX3VzZXJOYW1lIjoi5pu56Iux57-UIiwiZXhwIjoxNjk2OTk1MjI4LCJBVFRSX29yZ2FuaXphdGlvbklkIjoiTjUxMDIwMzAyMjIwMiIsImlhdCI6MTY5NDQwMzIyOCwianRpIjoiSWQtVG9rZW4tS3ZZbUhsQ1pYZ2JpOVV6ViIsInJlcSI6ImNvbS5zdXB3aXNkb20uanZ0YyIsIkFUVFJfb3JnYW5pemF0aW9uQ29kZSI6Ik41MTAyMDMwMjIyMDIifQ.OVOkARquFeKYfUKxmzsZT0Vn1GSMg1evUrHLDJC06llmUPyJNQwUAR_bGhyPoJhyANfWFshvIxcD2f_KGXbU0gjhg382_bYdFw-naicPZsh7xbVaO3GdORGZ4-39LYpblbsUqNzrhOCiAnROu9LefCjsnyx8DRgO-xCKfl1tgj4aO7IzlidtDmFT5M9AGF-B1_2FZ0x4TUrCYWj7Woa_uFt7qiXk4ykJONqZmMulaQMJ1HxS6zzk2muNGhuipVvQyeJc7S5GSggvprZu9AYzzw8kiqnozlTHaZr88RGZ2gKn8xiez3SqgadkM9SyPMLL7SBTtHKSdF5ofPH_ci4zlg";

      let x_id_token =
            "eyJhbGciOiJSUzUxMiJ9.eyJBVFRSX3VzZXJObyI6IjM2MDQyNTIwMDMwODIxNDAzOCIsInN1YiI6IjIyMzA1MDY1OSIsImlzcyI6InNzby5qdnRjLmp4LmNuIiwiZGV2aWNlSWQiOiJZTkxOOHV3c2RHSURBS3dLWkJ4VUtEeXQiLCJBVFRSX2lkZW50aXR5VHlwZUlkIjoiYjI1YjkwNzA4MTY0MTFlYjVmNzc1NTI4OWZjYzcxNzIiLCJBVFRSX2FjY291bnRJZCI6ImIwYzM3ZGEwMWZhNTExZWQxMDU2ZDk0MmIwZDZhMjM4IiwiQVRUUl91c2VySWQiOiJiMGFjYzE1MDFmYTUxMWVkMTA1NmQ5NDJiMGQ2YTIzOCIsIkFUVFJfaWRlbnRpdHlUeXBlQ29kZSI6IlMwMiIsIkFUVFJfaWRlbnRpdHlUeXBlTmFtZSI6IuWtpueUnyIsIkFUVFJfb3JnYW5pemF0aW9uTmFtZSI6IuWJjeerrzIyMDIiLCJBVFRSX3VzZXJOYW1lIjoi5pu56Iux57-UIiwiZXhwIjoxNjk2OTk1MjI4LCJBVFRSX29yZ2FuaXphdGlvbklkIjoiTjUxMDIwMzAyMjIwMiIsImlhdCI6MTY5NDQwMzIyOCwianRpIjoiSWQtVG9rZW4tS3ZZbUhsQ1pYZ2JpOVV6ViIsInJlcSI6ImNvbS5zdXB3aXNkb20uanZ0YyIsIkFUVFJfb3JnYW5pemF0aW9uQ29kZSI6Ik41MTAyMDMwMjIyMDIifQ.OVOkARquFeKYfUKxmzsZT0Vn1GSMg1evUrHLDJC06llmUPyJNQwUAR_bGhyPoJhyANfWFshvIxcD2f_KGXbU0gjhg382_bYdFw-naicPZsh7xbVaO3GdORGZ4-39LYpblbsUqNzrhOCiAnROu9LefCjsnyx8DRgO-xCKfl1tgj4aO7IzlidtDmFT5M9AGF-B1_2FZ0x4TUrCYWj7Woa_uFt7qiXk4ykJONqZmMulaQMJ1HxS6zzk2muNGhuipVvQyeJc7S5GSggvprZu9AYzzw8kiqnozlTHaZr88RGZ2gKn8xiez3SqgadkM9SyPMLL7SBTtHKSdF5ofPH_ci4zlg";
      loadingBar.start();
      await axios({
            url: "/test/get_token",
            method: "get",
            params: {
                  url: "http://m-jiaowu.jvtc.jx.cn/njwhd/loginSso?toMenu=xs_kcb",
            },
            headers: {
                  usertoken: usertoken,
                  x_id_token: x_id_token,
            },
      }).then((response) => {
            const data = response.data;
            const regex = /token=([^&]+)/; // 使用正则表达式匹配 "token=" 后面的非 & 字符
            const match = data.match(regex);
            let token = match[1];
            // console.log(token);
            getSjikbms(token);
      });
};

//Get_sjkbms
const getSjikbms = async (token) => {
      let result = await axios({
            url: "/test/get_sjkbms",
            method: "post",
            params: {
                  url: "http://mm-jiaowu.jvtc.jx.cn/njwhd/Get_sjkbms",
                  token: token,
            },
      });
      let kbjcmsid = result.data.data[0].kbjcmsid;
      getKCB(kbjcmsid, token);
};

//获取课程表！！！
const getKCB = async (kbjcmsid, token) => {
      let result = await axios({
            url: "/test/get_kcb",
            method: "post",
            params: {
                  url: `http://mm-jiaowu.jvtc.jx.cn/njwhd/student/curriculum?week=${week.value}&kbjcmsid=${kbjcmsid}`,
                  token: token,
            },
      });
      if (result.data.code == 1) {
            courses.value = result.data.data[0].courses;
            console.log(result);
            loadingBar.finish();
            message.success(`加载课程表成功！${result.data.Msg}`, {
                  duration: 500,
            });
      } else {
            message.error(`加载课程表时出现错误！${result.data.Msg}`);
            console.log(result.data.msg);
      }
};
</script>

<style lang="scss" scoped></style>

<template>
      <n-button @click="toHomePage">返回首页</n-button>
      <n-card title="个人中心" v-if="!hasLogin">
            <n-tabs
                  default-value="signin"
                  size="large"
                  justify-content="space-evenly"
            >
                  <n-tab-pane name="signin" tab="登录">
                        <n-form>
                              <n-form-item-row label="用户名" request>
                                    <n-input
                                          v-model:value="loginInfo.account"
                                          placeholder="请输入账号"
                                    />
                              </n-form-item-row>
                              <n-form-item-row label="密码">
                                    <n-input
                                          v-model:value="loginInfo.password"
                                          placeholder="请输入密码"
                                          type="password"
                                    />
                              </n-form-item-row>
                              <n-form-item-row>
                                    <n-space>
                                          <span>记住密码</span>
                                          <n-switch
                                                :round="false"
                                                v-model:value="
                                                      loginInfo.rememberPassword
                                                "
                                          />
                                    </n-space>
                              </n-form-item-row>
                        </n-form>
                        <n-button
                              type="primary"
                              block
                              secondary
                              strong
                              @click="userLogin"
                        >
                              登录
                        </n-button>
                  </n-tab-pane>
                  <n-tab-pane name="signup" tab="注册">
                        <n-form>
                              <n-form-item-row label="用户名">
                                    <n-input
                                          v-model:value="registerInfo.account"
                                          placeholder="请输入账号"
                                    />
                              </n-form-item-row>
                              <n-form-item-row label="密码">
                                    <n-input
                                          v-model:value="registerInfo.password"
                                          placeholder="请输入密码"
                                          type="password"
                                    />
                              </n-form-item-row>
                              <n-form-item-row label="重复密码">
                                    <n-input
                                          v-model:value="
                                                registerInfo.confirmPassword
                                          "
                                          placeholder="请输入密码"
                                          type="password"
                                    />
                              </n-form-item-row>
                              <n-form-item-row label="起个昵称吧~">
                                    <n-input
                                          v-model:value="registerInfo.username"
                                          placeholder="昵称"
                                          type="text"
                                    />
                              </n-form-item-row>
                              <n-form-item-row label="上传个头像吧~">
                                    <n-upload
                                          :action="uploadUrl"
                                          @finish="handleFinish"
                                    >
                                          <n-button>上传头像</n-button>
                                    </n-upload>
                              </n-form-item-row>
                        </n-form>
                        <n-button
                              type="primary"
                              block
                              secondary
                              strong
                              @click="userRegister"
                        >
                              注册
                        </n-button>
                  </n-tab-pane>
            </n-tabs>
      </n-card>
      <div class="user_info_panel" v-if="hasLogin">
            <div class="top_panel">
                  <div class="left">
                        <div class="face_img">
                              <div
                                    :style="{
                                          'background-image': `url(${userInfo.face_img_url})`,
                                    }"
                                    class="background_container"
                              ></div>
                        </div>

                        <div class="user_name">
                              {{ userInfo.username }}
                        </div>
                  </div>
                  <div class="right">
                        <div class="moreBtn">
                              <button @click="showMore">更多</button>
                        </div>
                  </div>
            </div>
            <div :class="morePanel" class="more_panel">
                  <div class="more_panel_item">
                        <n-upload
                              ref="changeUpLoad"
                              :action="uploadUrl"
                              @finish="handleFinishChange"
                              @error="handleErrorChange"
                              :default-file-list="defaultFileList"
                              class="change_faceimg_upload"
                        >
                              <n-button class="change_faceimg"
                                    >修改头像</n-button
                              >
                        </n-upload>
                  </div>
                  <div class="more_panel_item">
                        <n-input
                              v-model:value="changeInfo.password"
                              type="password"
                              placeholder="修改密码"
                        ></n-input>
                  </div>
                  <div class="more_panel_item">
                        <n-input
                              v-model:value="changeInfo.confirmPassword"
                              type="password"
                              placeholder="确认密码"
                        ></n-input>
                  </div>

                  <div class="more_panel_item">
                        <n-input
                              v-model:value="changeInfo.username"
                              placeholder="修改昵称"
                        ></n-input>
                  </div>
                  <div class="more_panel_item confirmChange">
                        <n-button v-if="hasChange" @click="changeUserInfo()"
                              >确定修改</n-button
                        >
                  </div>
                  <div class="more_panel_item quit_login">
                        <n-button @click="quitLogin">退出登录</n-button>
                  </div>
                  <div class="more_panel_item back_mycenter">
                        <n-button @click="backMyCenter">返回个人中心</n-button>
                  </div>
            </div>
            <div class="comment_panel">
                  显示评论
                  <Comment
                        :comment_user_id="userInfo.user_id"
                        :comment_article_id="0"
                        :user="true"
                        :can-comment="false"
                  ></Comment>
            </div>
      </div>
</template>

<script setup>
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
import {
      ArrowUpCircleOutline as ArrowUpCircleIcon,
      HeartOutline as HeartIcon,
      HeartSharp as HeartSharpIcon,
} from "@vicons/ionicons5";

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

const loginInfo = reactive({
      account:
            localStorage.getItem("useraccount") == ""
                  ? ""
                  : localStorage.getItem("useraccount"),
      password:
            localStorage.getItem("userpassword") == ""
                  ? ""
                  : localStorage.getItem("userpassword"),
      rememberPassword: localStorage.getItem("userrememberMe") == 1,
});
const registerInfo = reactive({
      account: "",
      password: "",
      confirmPassword: "",
      username: "",
      face_img_url: "",
});
const changeInfo = reactive({
      password: "",
      confirmPassword: "",
      username: "",
      face_img_url: null,
});
const myComment = ref(null);
const hasChange = ref(false);

//更多面板的样式类名
const morePanel = ref("");

//上传地址
const uploadUrl = ref(`${server_url}/upload/user_imgface_upload`);

//changeUpLoad的ref方便用提供的方法
const changeUpLoad = ref(null);

const userInfo = reactive({
      user_id: "",
      username: "",
      face_img_url: "",
});

watch(
      () => changeInfo,
      (newValue, oldValue) => {
            if (
                  newValue.username == "" &&
                  newValue.password == "" &&
                  newValue.confirmPassword == "" &&
                  newValue.face_img_url == ""
            ) {
                  hasChange.value = false;
            } else {
                  hasChange.value = true;
            }
      },
      { deep: true }
);

const toHomePage = () => {
      router.push("/");
};
onMounted(() => {
      judgmentHasLogin();
});

//显示更多

const showMore = () => {
      morePanel.value = "more_panel_active";
};
const backMyCenter = () => {
      morePanel.value = "more_panel_disactive";
};

//头像上传成功的回调
const handleFinish = ({ file, event }) => {
      console.log((event?.target).response);
      const result = JSON.parse(event?.target.response);
      console.log(result);
      registerInfo.face_img_url = result.data.url[0];
};

//头像修改上传成功的回调
const handleFinishChange = ({ file, event }) => {
      console.log((event?.target).response);
      const result = JSON.parse(event?.target.response);
      changeInfo.face_img_url = result.data.url[0];
};
//头像修改上传失败的回调
const handleErrorChange = ({ file, event }) => {
      console.log((event?.target).response);
      const result = JSON.parse(event?.target.response);
      console.log(result);
      hasChange.value = false;
};

const hasLogin = ref(false);

//判断是否已经登录过
const judgmentHasLogin = async () => {
      let result = await axios.get("/user/_user_token/current_user");
      try {
            if (result.data.code == 200) {
                  hasLogin.value = true;
                  message.success("获取个人信息成功");
                  userInfo.user_id = result.data.data[0].id;
                  userInfo.username = result.data.data[0].user_name;
                  userInfo.face_img_url =
                        server_url + result.data.data[0].face_img_url;
            } else {
                  hasLogin.value = false;
                  message.error(`获取个人信息失败，请重新登录`);
            }
      } catch (err) {
            message.error(`错误:${err}`);
            hasLogin.value = false;
      }
};

//登录
const userLogin = async () => {
      if (loginInfo.account.trim() == "") {
            message.warning("就不能输个账号？", {
                  duration: 1000,
            });
            return;
      } else if (loginInfo.password.trim() == "") {
            message.warning("就不能输个密码？", {
                  duration: 1000,
            });
            return;
      }
      loadingBar.start();
      const result = await axios.post("/user/login", {
            account: loginInfo.account,
            password: loginInfo.password,
      });
      if (loginInfo.rememberPassword) {
            localStorage.setItem("useraccount", loginInfo.account);
            localStorage.setItem("userpassword", loginInfo.password);
            localStorage.setItem(
                  "userrememberMe",
                  loginInfo.rememberPassword == true ? 1 : 0
            );
      } else {
            localStorage.setItem("useraccount", "");
            localStorage.setItem("userpassword", "");
            localStorage.setItem("userrememberMe", 0);
      }
      console.log(result);
      if (result.data.code == 200) {
            message.success("登录成功", {
                  duration: 1000,
            });
            userStore.id = result.data.data.id;
            userStore.token = result.data.data.token;
            localStorage.setItem("usertoken", result.data.data.token);
            localStorage.setItem("userid", result.data.data.id);
            userStore.username = result.data.data.user_name;
            router.push("/");
            loadingBar.finish();
      } else {
            message.error("账号或者密码错误，或者没有账号，请前往注册");
            loadingBar.error();
      }

      // userStore.id =result.data.data
      // userStore.password;
};

//注册
const userRegister = async () => {
      if (registerInfo.account.trim() == "") {
            message.warning("就不能输个账号？", {
                  duration: 1000,
            });
            return;
      } else if (registerInfo.password.trim() == "") {
            message.warning("就不能输个密码？", {
                  duration: 1000,
            });
            return;
      } else if (registerInfo.confirmPassword.trim() == "") {
            message.warning("不确定了？输错了怎么办？", {
                  duration: 1000,
            });
            return;
      }
      if (
            registerInfo.password.trim() !== registerInfo.confirmPassword.trim()
      ) {
            message.warning("两次输的密码不一样！！还好我给你检查了~", {
                  duration: 1000,
            });
            return;
      }
      loadingBar.start();
      const result = await axios.post("/user/register", {
            account: registerInfo.account,
            password: registerInfo.password,
            user_name: registerInfo.username,
            face_img_url: registerInfo.face_img_url,
      });
      console.log(result);
      if (result.data.code == 200) {
            message.success("注册成功");
            loadingBar.finish();
      } else {
            message.error(`注册失败：${result.data.msg}`);
            loadingBar.error();
      }
      registerInfo.account = "";
      registerInfo.password = "";
      registerInfo.confirmPassword = "";
      registerInfo.username = "";
      // userStore.id =result.data.data
      // userStore.password;
};

//更改个人信息
const changeUserInfo = async () => {
      if (changeInfo.password.trim() !== changeInfo.confirmPassword.trim()) {
            message.warning("两次输的密码不一样！！还好我给你检查了~", {
                  duration: 1000,
            });
            return;
      }
      loadingBar.start();
      console.log(changeInfo);
      const result = await axios.post("/user/_user_token/change", {
            password: changeInfo.password,
            user_name: changeInfo.username,
            face_img_url: changeInfo.face_img_url,
      });
      console.log(result);
      if (result.data.code == 200) {
            message.success(`${result.data.msg}`);
            loadingBar.finish();
            judgmentHasLogin();
            changeUpLoad.value.clear();
      } else {
            message.error(`${result.data.msg}`);
            loadingBar.error();
      }
      changeInfo.password = "";
      changeInfo.confirmPassword = "";
      changeInfo.username = "";
      // userStore.id =result.data.data
      // userStore.password;
};

//退出
const quitLogin = () => {
      dialog.create({
            type: "warning",
            title: "退出登录?",
            negativeText: "点错了",
            positiveText: "退出",
            onNegativeClick: () => {},
            onPositiveClick: () => {
                  localStorage.setItem("usertoken", "");
                  message.info("退出成功");
                  hasLogin.value = false;
            },
      });
};
</script>

<style lang="scss" scoped>
.user_info_panel {
      padding: 5px;
      position: relative;
      .top_panel {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            .left {
                  width: 100px;
                  .face_img {
                        margin-right: 200px;
                        .background_container {
                              width: 60px; /* 父元素的宽度 */
                              height: 60px; /* 父元素的高度 */
                              border-radius: 50%;
                              background-size: cover; /* 让图片充满父元素并保持纵横比 */
                              background-position: center; /* 让图片在父元素中居中显示 */
                              background-repeat: no-repeat; /* 防止重复显示图片 */
                        }
                  }
                  .user_name {
                        color: #000000;
                        margin-left: 20px;
                  }
            }
            .right {
                  width: 400px;
                  margin-right: 10px;
                  margin-top: 30px;
                  .moreBtn {
                        display: block;
                        height: 30px;
                        background-color: bisque;
                        button {
                              width: 100%;
                              height: 100%;
                              outline: none;
                              border: none;
                              background-color: #ffffff;
                              color: pink;
                              border: 1px solid pink;
                              cursor: pointer;
                              z-index: 99999;
                        }
                  }
            }
      }

      .more_panel {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #e6d2d5;
            position: fixed;
            right: -100vw;
            top: 0;
            transition: 0.6s all;
            .more_panel_item {
                  width: 90%;
                  padding: 10px;
                  margin-bottom: 10px;
                  transition: 1s all;
                  .change_faceimg_upload {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        .change_faceimg {
                              width: 200px;
                              background-color: #bf3553;
                              button {
                                    width: 100%;
                              }
                        }
                  }
            }
            .confirmChange {
                  button {
                        width: 100%;
                        background-color: #bf3553;
                  }
            }
            .quit_login {
                  button {
                        width: 100%;
                        background-color: #bf3553;
                  }
            }
            .back_mycenter {
                  button {
                        width: 100%;
                        background-color: #bf3553;
                  }
            }
      }
      .more_panel_active {
            width: 100vw;
            right: 0;
            z-index: 999;
      }
      .more_panel_disactive {
            width: 100vw;
            right: -100vw;
            z-index: -1;
      }

      .comment_panel {
            padding: 10px;
            margin-top: 20px;
      }
}
</style>

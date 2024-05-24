<template>
      <div class="wrap">
            <div class="bcc">
                  <div class="PC">
                        <div class="topBar">
                              <div class="topBar-item" @click="toHomePage">
                                    首页
                              </div>
                              <div class="topBar-item">
                                    <n-popselect
                                          v-model:value="selectCategoryId"
                                          :options="options"
                                          trigger="hover"
                                          @update:value="categoryUpdate"
                                    >
                                          分类
                                    </n-popselect>
                                    <span class="category">{{
                                          selectCategory
                                    }}</span>
                              </div>
                              <div class="topBar-item" @click="toDashBoard">
                                    后台
                              </div>
                              <div class="topBar-item" @click="toMyCenter">
                                    <div class="myIcon">
                                          <n-icon>
                                                <PersonIcon
                                                      class="PersonIcon"
                                                ></PersonIcon>
                                          </n-icon>
                                          我的
                                    </div>
                              </div>
                              <div class="topBar-item" @click="toMyCourse">
                                    <div class="myIcon">
                                          <n-icon>
                                                <PersonIcon
                                                      class="PersonIcon"
                                                ></PersonIcon>
                                          </n-icon>
                                          我的课表
                                    </div>
                              </div>
                              <div class="topBar-item" @click="toSomeFun">
                                    <div class="myIcon">
                                          <n-icon>
                                                <PersonIcon
                                                      class="PersonIcon"
                                                ></PersonIcon>
                                          </n-icon>
                                          一些好玩的东西
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div class="phoneTopbar">
                        <div :class="showMoreBtn" class="more_btn">
                              <div class="icon" @click="showMore">
                                    <n-icon v-if="!showForWard">
                                          <ArrowBackCircleIcon
                                                class="ChevronDownIcon"
                                          ></ArrowBackCircleIcon>
                                    </n-icon>
                                    <n-icon v-if="showForWard">
                                          <ArrowForwardCircleIcon
                                                class="ChevronDownIcon"
                                          ></ArrowForwardCircleIcon>
                                    </n-icon>
                              </div>
                        </div>
                        <div :class="showMon" class="box-mon">
                              <div class="box-mon-items">
                                    <div
                                          class="boxMon-item nohas-icon"
                                          @click="toHomePage"
                                    >
                                          首页
                                    </div>
                                    <div class="boxMon-item nohas-icon">
                                          <n-popselect
                                                v-model:value="selectCategoryId"
                                                :options="options"
                                                trigger="hover"
                                                @update:value="categoryUpdate"
                                          >
                                                分类
                                          </n-popselect>
                                          <span class="category">{{
                                                selectCategory
                                          }}</span>
                                    </div>
                                    <div
                                          class="boxMon-item"
                                          @click="toDashBoard"
                                    >
                                          后台
                                    </div>
                                    <div
                                          class="boxMon-item has-icon"
                                          @click="toMyCenter"
                                    >
                                          <div class="myIcon">
                                                <n-icon>
                                                      <PersonIcon
                                                            class="PersonIcon Xicon"
                                                      ></PersonIcon>
                                                </n-icon>
                                          </div>
                                          <p>我的</p>
                                    </div>
                                    <div
                                          class="boxMon-item has-icon"
                                          @click="toMyCourse"
                                    >
                                          <div class="myIcon">
                                                <n-icon>
                                                      <SchoolIcon
                                                            class="SchoolIcon Xicon"
                                                      ></SchoolIcon>
                                                </n-icon>
                                          </div>
                                          <p>我的课表</p>
                                    </div>
                                    <div
                                          class="boxMon-item has-icon"
                                          @click="toSomeFun"
                                    >
                                          <div class="myIcon">
                                                <n-icon>
                                                      <GamesIcon
                                                            class="GamesIcon Xicon"
                                                      ></GamesIcon>
                                                </n-icon>
                                          </div>
                                          <p>一些好玩的东西</p>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div class="current_login_user" @click="toMyCenter">
                        <div class="img_face" :style="imgFaceBackgroundImg">
                              <!-- <img src="../../public/error.png" alt="" /> -->
                        </div>
                        <div class="user_name">
                              <p>
                                    {{ currentUserInfo.username }}
                              </p>
                        </div>
                  </div>
                  <div class="search">
                        <input
                              v-model="keyword"
                              type="text"
                              placeholder="搜索博客"
                              @change="searchArticle"
                              @keydown.enter="searchArticle"
                        />
                        <div class="search_btn" @click="searchArticle">
                              <n-icon size="40">
                                    <SearchIcon class="SearchIcon"></SearchIcon>
                              </n-icon>
                        </div>
                  </div>
                  <div class="like_sum">
                        <span class="developer_talk">一共收获点赞：</span>
                        <i class="like_sum_icon">
                              <n-icon>
                                    <HeartCircle></HeartCircle>
                              </n-icon>
                        </i>
                        <span class="like_sum_item">
                              {{ homePageInfo.like_sum }}</span
                        >
                        <span class="like_sum_tip">个</span>
                        <span class="thanks">谢谢大家！</span>
                  </div>
                  <div class="content">
                        <div
                              class="article"
                              v-for="(article, index) in articles"
                        >
                              <div
                                    class="click_area"
                                    @click="openDetail(article.id)"
                              ></div>
                              <h2 class="title">{{ article.title }}</h2>
                              <span class="like_num">
                                    <n-icon>
                                          <HeartCircle></HeartCircle>
                                    </n-icon>
                                    {{ article.like_num }}</span
                              >
                              <span class="description">
                                    {{ article.description }}</span
                              >
                              <span class="create_time">
                                    写作于:{{ article.create_time }}</span
                              >
                              <div class="update_time">
                                    <!-- <span>最近一次更新:</span> -->
                                    <n-time
                                          :time="article.timestamp"
                                          type="relative"
                                    >
                                    </n-time>
                              </div>
                        </div>
                  </div>

                  <!-- 分页 -->
                  <n-space justify="center">
                        <n-pagination
                              v-model:page="pageinfo.page"
                              :page-count="pageinfo.pageCount"
                              @update:page="changePage"
                              :page-slot="5"
                        >
                              <template #prev> 上一页 </template>
                              <template #next> 下一页 </template>
                        </n-pagination>
                  </n-space>
                  <Comment
                        :comment_article_id="0"
                        :comment_user_id="0"
                  ></Comment>
            </div>
            <div class="mask" v-if="showForWard" @click="showMore"></div>
      </div>
</template>

<script setup>
//导入一些模块
import {
      ref,
      reactive,
      inject,
      watchEffect,
      onMounted,
      shallowRef,
      computed,
      watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
      SearchCircleOutline as SearchIcon,
      HeartCircle,
      CaretDownCircleOutline as ChevronDownIcon,
      MenuOutline as MenuIcon,
      ArrowBackCircleOutline as ArrowBackCircleIcon,
      ArrowForwardCircleOutline as ArrowForwardCircleIcon,
      SchoolOutline as SchoolIcon,
} from "@vicons/ionicons5";

import {
      Games20Regular as GamesIcon,
      ChartPerson20Regular as PersonIcon,
} from "@vicons/fluent";

//引入评论组件
import Comment from "../components/Comment.vue";

//引入用户Store组件

import { UserStore } from "../stores/UserStore";
import { CourseStore } from "../stores/CourseStore";

const userStore = UserStore();
const courseStore = CourseStore();

const admin = reactive({
      account: localStorage.getItem("account") || "",
      password: localStorage.getItem("password") || "",
});

const route = useRoute();
const router = useRouter();

//从main.js注入进来
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");
const server_url = inject("server_url");

//一些响应式变量的定义
const options = ref([]);
const categorys = ref([]);
const selectCategoryId = ref(0);
const keyword = ref("");
const articles = ref([]);
const showMon = ref("box-mon_disactive");
const showMoreBtn = ref("more_btn_disactive");
const homePageInfo = reactive({
      like_sum: 0,
});
const showForWard = ref(false);
//分页的信息
const pageinfo = reactive({
      page: 1,
      pageSize: 4,
      pageCount: 0,
      count: 0,
});

//当前用户的信息TODO头像和个性签名（在个人中心里编辑）get
const currentUserInfo = reactive({
      username: "",
      imgFaceUrl: "",
});

//公告内容
const announcement = reactive({
      title: "",
      content: "",
});

//渲染用户头像
const imgFaceBackgroundImg = ref("");

//初始化
onMounted(() => {
      courseStore.usertoken = localStorage.getItem("school_course_user_token");
      courseStore.x_id_token = localStorage.getItem("school_course_user_token");
      courseStore.token = localStorage.getItem("school_user_token");
      courseStore.kbjcmsid = localStorage.getItem("kbjcmsid");
      //加载分类
      loadCategory();
      //加载文章预览
      loadArticle();
      //计算总的文章点赞数
      computedLikeSum();
      //加载当前登录的用户信息
      loadCurrentUserInfo();
});

//加载当前登录的用户信息，如果没有登录，则直接显示未登录
const loadCurrentUserInfo = async () => {
      let result = await axios.get("/user/_user_token/current_user");
      if (result.data.code == 200) {
            currentUserInfo.username = result.data.data[0].user_name;
            currentUserInfo.imgFaceUrl =
                  server_url + result.data.data[0].face_img_url;
            imgFaceBackgroundImg.value = `background-image: url("${
                  currentUserInfo.imgFaceUrl == ""
                        ? "../../public/error.png"
                        : currentUserInfo.imgFaceUrl
            }"`;
            // message.success("加载登陆信息成功", {
            //       duration: 1000,
            //       placement: "bottom-right",
            // });
      } else {
            currentUserInfo.username = "未登录";
            message.error(
                  "加载登录信息失败，未登录或者在别处登录，如不是本人操作请修改密码",
                  {
                        duration: 2000,
                  }
            );
      }
      console.log(currentUserInfo);
};

//计算当前选择的分类名字
const selectCategory = computed({
      get() {
            let category = options.value.find((item) => {
                  return item.value == selectCategoryId.value;
            });
            return category ? category.label : "nono";
      },
});

//获取当前搜索、分类的文章数
const currentArticleSum = async () => {
      let result = await axios.get(
            `/blog/list?categoryid=${selectCategoryId.value}&keyword=${keyword.value}`
      );
      if (result.data.code === 200) {
            return result.data.rows.length;
      }
      return 0;
};

//搜索
const searchArticle = async () => {
      pageinfo.page =
            (await currentArticleSum()) >
            (pageinfo.page - 1) * pageinfo.pageSize
                  ? pageinfo.page
                  : 1;
      loadArticle();
};

//计算总的点赞数
const computedLikeSum = async () => {
      let result = await axios.get("/blog/list");
      if (result.data.code == 200) {
      }
      let articles = result.data.rows;
      let like_sum = 0;
      for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            like_sum += article.like_num;
      }
      for (let i = 0; i <= like_sum; i++) {
            homePageInfo.like_sum = i;
      }
};

//加载文章
const loadArticle = async () => {
      loadingBar.start();
      let like_sum = 0;

      let result = await axios.get(
            `/blog/list?page=${pageinfo.page}&pagesize=${pageinfo.pageSize}&categoryid=${selectCategoryId.value}&keyword=${keyword.value}`
      );
      pageinfo.count = result.data.count;
      pageinfo.pageCount = Math.ceil(pageinfo.count / pageinfo.pageSize);
      if (result.data.code === 200) {
            articles.value = result.data.rows.map((item) => {
                  let tmp_create_time = item.create_time;
                  tmp_create_time = new Date(tmp_create_time);
                  tmp_create_time = `${tmp_create_time.getFullYear()}-${
                        tmp_create_time.getMonth() + 1
                  }-${tmp_create_time.getDate()} ${tmp_create_time.getHours()}:${tmp_create_time.getMinutes()}:${tmp_create_time.getSeconds()}`;
                  return {
                        id: item.id,
                        title: item.title,
                        category_id: item.category_id,
                        content: item.content,
                        description: item.description,
                        create_time: tmp_create_time,
                        timestamp: item.create_time,
                        like_num: item.like_num,
                  };
            });
            loadingBar.finish();
            // message.success("加载文章成功", { duration: 1000 });
      } else {
            loadingBar.error();
            message.error("加载文章失败请检查网络连接", { duration: 5000 });
      }
      keyword.value = "";
};

//打开文章详细页
const openDetail = async (id) => {
      router.push({ path: "/detail", query: { id } });
};
// 选择分类
const categoryUpdate = async (category_id) => {
      selectCategoryId.value = category_id;
      //防止选择的分类文章数量不足导致的显示bug，每次选择时跳转到第一页即可解决，更精细的可以判断文章数量是否可以满足当前选择的页码所需的文章数

      pageinfo.page =
            (await currentArticleSum()) >
            (pageinfo.page - 1) * pageinfo.pageSize
                  ? pageinfo.page
                  : 1;
      loadArticle();
};
//改变页数
const changePage = (currentPage) => {
      pageinfo.page = currentPage;
      loadArticle();
};

//加载分类
const loadCategory = async () => {
      let result = await axios.get("/category/list");
      if (result.data.code == 200) {
            categorys.value = result.data.data;
            options.value = categorys.value.map((item) => {
                  return {
                        label: item.name,
                        value: item.id,
                  };
            });
            options.value.unshift({
                  label: "全部",
                  value: 0,
                  style: "color:red",
            });
      }
};

//前往后台
const toDashBoard = async () => {
      loadingBar.start();
      console.log("1231" + admin.account);
      let result = await axios.post("/admin/_token/check");
      if (result.data.code == 200) {
            await router.push("/dashBoard/article");
            // message.success(`欢迎${admin.account}的到来`);
      } else {
            router.push("/login");
            message.warning("从未登录或者密码已更改，请重新登录");
      }
      loadingBar.finish();
};

//前往个人中心
const toMyCenter = async () => {
      loadingBar.start();
      await router.push("/mycenter");
      loadingBar.finish();
};

//前往课表
const toMyCourse = async () => {
      loadingBar.start();
      await router.push("/course");
      loadingBar.finish();
};
//去首页
const toHomePage = () => {
      router.push("/");
      showMore();
      pageinfo.page = 1;
      loadArticle();
};
//去一些好玩的地方
const toSomeFun = async () => {
      // router.push("/somefun");
      // router.push("/games");
      window.location.href =
            "http://localhost:8080/shuangrenyouxi/shuangrenyouxi.html";

      // loadingBar.start();
      // let result = await axios.get(
      //       "http://localhost:8080/shuangrenyouxi/shuangrenyouxi.html"
      // );
      // console.log(result);
      // if (result.data.code == 200) {
      //       console.log(result.data);
      //       // message.success(`欢迎${admin.account}的到来`);
      // } else {
      //       message.warning("错误");
      // }
      loadingBar.finish();
};

//显示更多按钮
const showMore = () => {
      showMoreBtn.value =
            showMoreBtn.value == "more_btn_active"
                  ? "more_btn_disactive"
                  : "more_btn_active";
      showMon.value =
            showMon.value == "box-mon_active"
                  ? "box-mon_disactive"
                  : "box-mon_active";
      showForWard.value = !showForWard.value;
};
</script>

<style lang="scss" scoped>
.wrap {
      width: 100%;
      height: 100vh;
      background-color: #ec2c64;
      position: relative;

      .bcc {
            width: 100%;
            height: 100%;
            background-color: #fff;
            overflow-x: hidden;
            position: relative;
            .phoneTopbar {
                  width: 40%;
                  height: 200px;
                  position: absolute;
                  margin: 10px;
                  right: -0%;
                  top: -1%;
                  transition: 1s all;
                  border-radius: 5px;
                  .more_btn {
                        color: #585656;
                        font-size: 36px;
                        transition: 0.8s all;
                        position: fixed;
                        top: 50%;
                        z-index: 9999999;
                        .icon {
                        }
                  }
                  .more_btn_active {
                        color: #d04d4d;
                        right: 200px;
                  }
                  .more_btn_disactive {
                        transform: rotate(0deg);
                        color: #a74a9a;
                        transition: 1.1s all;
                        right: 0;
                  }

                  .box-mon {
                        width: 200px;
                        height: 100vh;
                        transition: 0.6s all;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        top: 0px;
                        right: -200px;
                        position: fixed;
                        background-color: #a6e3e9;
                        z-index: 999;
                        transition: 1s all;

                        .box-mon-items {
                              height: 400px;
                              display: flex;
                              flex-direction: column;
                              justify-content: space-around;
                              .has-icon {
                                    display: flex;
                                    align-items: center;
                                    justify-content: start;
                                    text-align: center;

                                    .Xicon {
                                          font-size: 32px;
                                          margin-top: 10px;
                                    }
                                    p {
                                          margin-left: 60px;
                                    }
                              }
                              .boxMon-item {
                                    width: 90%;
                                    height: 30px;
                                    margin: 0 auto;
                                    line-height: 30px;
                                    margin-bottom: 10px;
                                    background-color: #8785a2;
                                    cursor: pointer;
                                    text-align: center;
                                    z-index: 99999;
                                    .myIcon {
                                          justify-content: center;
                                          align-items: center;
                                    }
                                    .hasIcon {
                                          display: flex;
                                    }
                                    &:hover {
                                          color: #585656;
                                    }
                                    &:nth-last-of-type(1) {
                                          margin-bottom: 0px;
                                    }
                              }
                        }
                  }

                  .box-mon_active {
                        right: 0px;
                        opacity: 1;
                  }

                  .box-mon_disactive {
                        right: -200px;
                        opacity: 0;
                  }
            }

            .topBar {
                  width: 90vw;
                  margin: 0 auto;
                  margin-top: 10px;
                  background-color: #ff7f50;
                  border-radius: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: space-evenly;
                  text-align: center;

                  .topBar-item {
                        min-width: 60px;
                        height: 46px;
                        line-height: 46px;
                        font-size: 22px;
                        text-align: center;
                        color: #000000;
                        transition: 0.3s all;
                        margin-left: 20px;
                        margin-right: 20px;

                        .category {
                              font-size: 12px;
                              color: #2c2c2c;
                              transition: 0.6s all;
                              // &:hover {
                              //       color: #ede4d3;
                              //       cursor: pointer;
                              // }
                        }
                        .my-center {
                              min-width: 80px;
                              // top: 0%;
                              // right: 0;
                              // height: 60px;
                              // background-color: red;
                              // position: absolute;
                        }

                        &:hover {
                              color: #c4bcab;
                              cursor: pointer;
                        }
                  }
            }
            .current_login_user {
                  width: 100%;
                  overflow: hidden;
                  .img_face {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        box-shadow: 0 0 20px #a8456b;
                        margin-top: 14px;
                        margin-left: 16px;
                        border-radius: 50%;
                        float: left;
                        // background-image: url("../../public/error.png");
                        background-size: cover; /* 让图片充满父元素并保持纵横比 */
                        background-position: center; /* 让图片在父元素中居中显示 */
                        background-repeat: no-repeat; /* 防止重复显示图片 */
                        overflow: hidden; /* 隐藏超出父元素范围的部分 */
                        img {
                              width: 100%; /* 图片宽度充满父元素 */
                              height: auto; /* 保持图片的纵横比 */
                              display: block; /* 让图片以块级元素的形式显示 */
                        }
                  }
                  .user_name {
                        width: 60%;
                        height: 30px;
                        line-height: 30px;
                        margin-left: 20%;
                        margin-top: 20px;
                        text-align: center;
                        box-shadow: 0 0 10px #382840;
                        border-radius: 0.3125rem;
                        p {
                              font-size: 22px;
                              color: #22202e;
                              filter: drop-shadow(0 0 10px #3b3658);
                        }
                  }
            }
            .search {
                  width: 80%;
                  height: 60px;
                  margin: 20px auto;
                  display: flex;
                  align-items: center;
                  float: none;

                  input {
                        width: 100%;
                        height: 50%;
                        border: 4px solid #ff7f50;
                        box-shadow: 0px 0px 10px #ff7f50;
                        border-radius: 10px;
                        transition: 0.6s all;
                        outline: none;
                        text-align: center;

                        &:focus {
                              box-shadow: 0px 0px 20px #ff7f50;
                        }
                        &::placeholder {
                              width: 100%;
                              color: #dd6236;
                              text-align: center;
                        }
                  }
                  .search_btn {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                        margin-left: 20px;
                        text-align: center;
                        line-height: 40px;
                        font-size: 12px;
                        background-color: #dd6236;
                        box-shadow: 0px 0px 10px #dd6236;
                        transition: 0.6s all;
                        cursor: pointer;
                        .SearchIcon {
                              transition: 0.6s all;
                        }
                        &:hover {
                              box-shadow: 0px 0px 20px #e4511c;
                              transform: scale(1.1);
                              .SearchIcon {
                                    transform: scale(1.11);
                              }
                        }
                  }
            }
            .like_sum {
                  width: 260px;
                  height: 30px;
                  line-height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 20px auto;
                  text-align: center;
                  .like_sum_icon {
                        color: #d72868;
                        filter: drop-shadow(0px 0px 10px);
                  }
                  .like_sum_item {
                        color: #e31762;
                  }
                  .developer_talk {
                        color: #cb4141;
                        font-size: 0.75rem;
                  }
                  .like_sum_tip {
                        color: rgb(164, 131, 218);

                        font-size: 12px;
                  }
                  .thanks {
                        color: #ae2323;
                        font-size: 0.75rem;
                        margin-left: 10px;
                  }
            }
            .content {
                  max-width: 1000px;
                  display: flex;
                  flex-wrap: wrap;
                  margin: 0 auto;
                  column-gap: 30px;
                  transition: 1s all;
                  margin-top: 10px;
                  position: relative;
                  .like_num {
                        position: absolute;
                        top: 2%;
                        right: 2%;
                        color: #ffffff;
                  }

                  .article {
                        width: 200px;
                        max-width: 220px;
                        margin: 0 auto;
                        height: 260px;
                        margin-bottom: 20px;
                        border-radius: 10px;
                        box-shadow: 10px 10px 10px #d8e3e7;
                        background-color: #c3d7df;
                        font-size: 14px;
                        position: relative;
                        top: 0px;
                        left: 0px;
                        transition: 0.4s all;
                        z-index: 9;
                        &:hover {
                              background-color: #b8d5e0;
                              box-shadow: 1px 1px 100px #c4dce4;
                              top: 10px;
                              left: 10px;
                              cursor: pointer;
                        }

                        h2 {
                              text-align: center;
                        }
                        .title {
                              font-weight: 400;
                              font-size: 16px;
                        }
                        .description {
                              padding: 5px;
                              font-size: 12px;
                              color: #ffffff9a;
                        }
                        .create_time {
                              font-size: 12px;
                              position: absolute;
                              bottom: 20px;
                              right: 0;
                              color: #000000;
                        }
                        .update_time {
                              font-size: 12px;
                              color: #585656;
                              position: absolute;
                              bottom: 0;
                              right: 0;
                        }
                  }
            }
      }
      .mask {
            width: 50vw;
            height: 100vh;
            position: absolute;
            top: 0;
            bottom: 0;
      }
}

::-webkit-scrollbar {
      width: 10px;
}
::-webkit-scrollbar-track {
      background: #fffefb;
      border-radius: 5px;
}
::-webkit-scrollbar-thumb {
      background-color: #b598a1;
      opacity: 0.3;
      border-radius: 5px;
}
@media screen and (max-width: 720px) {
      ::-webkit-scrollbar {
            width: 2px;
      }
      .content {
            display: flex;
            .article {
                  width: 100%;
                  .click_area {
                        width: 80%;
                        height: 80%;
                        position: absolute;
                        top: 10%;
                        left: 10%;
                        // background-color: red;
                        z-index: 999;
                  }
            }
      }
      .PC {
            display: none;
      }
      .phoneTopbar {
            display: block;
      }
}
@media screen and (min-width: 720px) and (max-width: 900px) {
      ::-webkit-scrollbar {
            width: 6px;
      }
      .content {
            display: flex;
            .article {
                  width: 100%;
            }
      }
}
@media screen and (min-width: 720px) {
      .phoneTopbar {
            display: none;
      }
      .click_area {
            width: 95%;
            height: 95%;
            text-align: center;
            position: absolute;
            top: 5%;
            left: 5%;
            // background-color: red;
            z-index: 999;
      }
}
</style>

<template>
      <!--评论 -->
      <div class="comment">
            <div class="comment_bcc">
                  <h6 class="comment_title">留言板</h6>
                  <div class="write_comment" v-if="canComment">
                        <textarea class="comment_area" name="comment_area" v-model="comment_area" cols="30" rows="10"
                                  maxlength="600" placeholder="写点什么吧~"></textarea>
                        <button class="comment_btn" @click="sendComment">
                              留言
                        </button>
                  </div>

                  <div ref="elementToObserve">
                        <p v-for="(comment, index) in comments" class="comment_item hidden-element" :style="{
                              'background-color':
                                    comment.comment_background_color,
                        }" @click="jumpToDetailFun(comment.comment_article_id)">
                        <div class="face_img" :style="faceImg(
                              comment.comment_user_face_img,
                              comment.comment_background_color
                        )
                              " @error="handleImageError">
                              <!-- <img :src="comment.comment_user_face_img" alt=""> -->
                        </div>
                        <span class="comment_user_name">
                              {{ comment.comment_user_name }}
                        </span>


                        <span class="colon">:</span>
                        <span class="comment_user_content">
                              <n-ellipsis expand-trigger="click" line-clamp="1">
                                    {{ comment.comment_content }}
                                    <template #tooltip>
                                          <div>
                                                写这么多不要命啦！！!（一共写了{{
                                                      comment.comment_content
                                                            .length
                                                }}个字？！）
                                                <br />
                                                算了，你厉害
                                                <br />
                                                <span style="
                                                            color: antiquewhite;
                                                      " v-if="comment
                                                                        .comment_content
                                                                        .length ===
                                                                  600
                                                                  ">(好吧，是我限制了你的发挥:D)</span>
                                                <span style="
                                                            color: antiquewhite;
                                                      " v-else-if="comment
                                                            .comment_content
                                                            .length > 600
                                                            ">(你是怎么写这么多字的 -_-
                                                      )</span>
                                                <span style="
                                                            color: antiquewhite;
                                                      " v-else>(看来我的字数限制发挥了作用
                                                      ^^ )</span>
                                          </div>
                                    </template>
                              </n-ellipsis>
                        </span>
                        <span class="comment_article_title">
                              <span class="comment_article_title_info">来自:</span>
                              {{
                                    comment.comment_article_title
                              }}</span>
                        <div class="comment_time_container">
                              <n-time :time="comment.comment_create_time" type="relative" class="comment_time"></n-time>
                        </div>
                        </p>
                        <!-- 隐藏的元素内容 -->
                  </div>

                  <n-empty description="啥也没有" v-if="comments.length == 0">
                        <template #extra>
                              <span> 快来第一个评论！ </span>
                        </template>
                  </n-empty>

                  <!-- 分页 -->
                  <n-space justify="center">
                        <n-pagination v-model:page="commentPageinfo.page" :page-count="commentPageinfo.pageCount"
                                      :page-slot="5" @update:page="changeCommentPage" style="margin-bottom: 30px">
                              <template #prev>
                                    <span style="font-size: 12px">上一页</span>
                              </template>
                              <template #next>
                                    <span style="font-size: 12px">下一页</span>
                              </template>
                        </n-pagination>
                  </n-space>
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
      watch,
      defineProps,
} from "vue";

import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");
const server_url = inject("server_url");

const props = defineProps({
      comment_article_id: {
            type: Number,
            default: 0,
      },
      comment_user_id: {
            type: Number,
            default: 0,
      },
      comment_article_title: {
            type: String,
            default: "主页",
      },
      user: {
            type: Boolean,
            default: false,
      },
      jumpToDetail: {
            type: Boolean,
            default: true,
      },
      canComment: {
            type: Boolean,
            default: true
      }
});

import { UserStore } from "../stores/UserStore";
import { routerKey } from "vue-router";
const userStore = UserStore();
const pageLoad = ref(0);
onMounted(() => {
      loadUser(); //内部加载评论
      setTimeout(() => {
            loadComments();
      }, 600);
      console.log(elementToObserve.value);
      createObserver();
});

//动态显示元素
const options = {
      threshold: 0.4 // 元素可见度阈值，即当元素50%以上可见时触发
};

//注册组件示例，用于访问底层dom
const elementToObserve = ref(null);

const createObserver = () => {
      const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                  if (entry.isIntersecting)
                  {
                        pageLoad.value++;
                        showElement(); // 元素进入视野时调用显示元素的方法
                  }
            });
      }, options);
      observer.observe(elementToObserve.value);
}


const showElement = () => {
      // 执行显示元素的逻辑
      console.log(pageLoad.value);
      if (pageLoad.value <= 1) return;
      for (let i = 0; i < elementToObserve.value.children.length; i++)
      {
            let children = elementToObserve.value.children[i];
            children.classList.remove("hidden-element");
            children.classList.remove("show-element");
      }

}
const commentPageinfo = reactive({
      page: 1,
      pageSize: 6,
      pageCount: 0,
      count: 0,
});

const userinfo = ref([]);

const comments = ref([]);

const comment_area = ref("");
const url = ref("");

const faceImg = (url, color) => {
      return `background-image: url(${url}`;
};
const handleImageError = () => {
      console.log("error");
};
const jumpToDetailFun = (article_id) => {
      if (!props.jumpToDetail || article_id == 0)
      {
            return;
      }
      openDetail(article_id);
};

//打开文章详细页
const openDetail = async (id) => {
      router.push({ path: "/detail", query: { id: id } });
};
//加载用户
const loadUser = async () => {
      let result = await axios.get("/user/user_list");
      // console.log(result);
      if (result.data.code == 200)
      {
            userinfo.value = result.data.rows.map((item) => {
                  return {
                        id: item.id,
                        user_name: item.user_name,
                        user_face_img: item.face_img_url,
                        token: item.token,
                  };
            });
      } else
      {
            message.error(`获取用户信息失败:${result.data.msg}`);
      }
};

//加载评论(总数)
const loadComments = async () => {
      loadingBar.start();
      let axios_get = props.user
            ? `/comment/comment_list?page=${commentPageinfo.page}&pagesize=${commentPageinfo.pageSize}&comment_article_id=${props.comment_article_id}&comment_user_id=${props.comment_user_id}`
            : `/comment/comment_list?page=${commentPageinfo.page}&pagesize=${commentPageinfo.pageSize}&comment_article_id=${props.comment_article_id}`;
      let result = await axios.get(axios_get);

      if (result.data.code == 200)
      {
            commentPageinfo.count = result.data.count;
            commentPageinfo.pageCount = Math.ceil(
                  commentPageinfo.count / commentPageinfo.pageSize
            );
            comments.value = result.data.rows.map((item) => {
                  let user_name = userinfo.value.find(
                        (user) => user.id == item.comment_user_id
                  ).user_name;
                  let user_face_img = userinfo.value.find(
                        (user) => user.id == item.comment_user_id
                  ).user_face_img;
                  return {
                        comment_article_id: item.comment_article_id,
                        comment_article_title: item.comment_article_title,
                        comment_content: item.comment_content,
                        comment_create_time: item.comment_create_time,
                        comment_user_id: item.comment_user_id,
                        comment_user_name: user_name,
                        comment_user_face_img: server_url + user_face_img,
                        comment_background_color: item.comment_background_color,
                  };
            });
            console.log(comments);
            loadingBar.finish();
            message.success(`获取评论成功`, {
                  duration: 600,
            });
      } else
      {
            loadingBar.error();
            message.error(`获取评论失败，请重试${result.data.msg}`);
      }
};

//改变评论页数
const changeCommentPage = (currentPage) => {
      commentPageinfo.page = currentPage;
      loadUser();
      loadComments();
};

//发送评论
const sendComment = async () => {
      if (comment_area.value.trim() == "")
      {
            message.warning("留言不能为空", { duration: 500 });
            comment_area.value = "";
            return;
      }
      loadingBar.start();
      let result = await axios.post("/comment/_user_token/comment_add", {
            comment_user_id:
                  localStorage.getItem("userid") == ""
                        ? userStore.id
                        : localStorage.getItem("userid"),
            comment_content: comment_area.value,
            comment_article_id: props.comment_article_id,
            comment_article_title: props.comment_article_title
      });
      if (result.data.code == 200)
      {
            message.success("发送成功");
            loadingBar.finish();
            loadComments();
      } else
      {
            message.error(`发送失败${result.data.msg}`);
            loadingBar.error();
      }
      comment_area.value = "";
};
</script>

<style lang="scss" scoped>
.comment {
      width: 100%;
      height: 360px;

      .comment_bcc {
            width: 80%;
            margin: 0 auto;

            .hidden-element {
                  opacity: 1;
                  /* 初始隐藏 */
                  transition: all 0.1s;
                  /* 可以添加过渡效果 */
            }

            .show-element {
                  opacity: 1;
            }

            .write_comment {
                  display: flex;
                  width: 100%;

                  .comment_area {
                        width: 100%;
                        outline: none;
                        transition: 0.6s all;
                        height: 100px;
                        border: none;

                        &::placeholder {
                              font-family: "Courier New", Courier, monospace;
                              font-weight: 600;
                              left: 37%;
                              top: 40%;
                              font-size: 12px;
                              transition: 1s all;
                              position: absolute;
                        }


                        &:focus::placeholder {
                              left :66%;
                              top: 6%;
                              transform: scale(0.96);
                        }

                        &:hover {
                              border: 2px solid #443e3e;
                        }
                  }

                  .comment_btn {
                        border: none;
                        outline: none;
                        background-color: navajowhite;
                        transform: scale(1);
                        transition: 0.6s all;

                        &:hover {
                              transform: scale(1.04);
                        }
                  }
            }

            .comment_title {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 22px;
                  height: 10px;
                  font-weight: 400;

                  &::after {
                        content: "--";
                  }

                  &::before {
                        content: "--";
                  }
            }

            .comment_item {
                  width: 100%;
                  overflow: hidden;
                  position: relative;
                  padding: 2px;
                  border-radius: 10px;
                  padding-bottom: 32px;
                  transition: 1s all;
                  transform: scale(1);

                  &:hover {
                        transform: scale(1.1);
                  }

                  .face_img {
                        width: 30px;
                        height: 30px;
                        margin: 3px;
                        float: left;
                        border-radius: 50%;
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        box-shadow: 0 0 0.625rem #8076a3;
                  }

                  .comment_user_name {
                        font-size: 18px;
                        color: #2c1f1f;
                        font-weight: bold;
                        padding-right: 10px;
                  }

                  .comment_user_content {
                        padding: 5px;
                        margin-bottom: 10px;
                        overflow: hidden;
                  }

                  .comment_article_title {
                        font-size: 14px;
                        position: absolute;
                        color: #df6b82;
                        transform: scale(0.9);
                        left: 0px;
                        bottom: 2px;

                        .comment_article_title_info {
                              font-size: 16px;
                              color: #eeb8c3;
                        }
                  }

                  .comment_time_container {
                        width: 100px;
                        position: absolute;
                        right: 0;
                        bottom: 2px;

                        .comment_time {
                              display: flex-end;
                              font-size: 12px;
                              text-align: center;
                              color: #e6d2d5;
                              margin: 5px;
                              margin-bottom: 0px;

                              &::before {
                                    content: "";
                              }
                        }
                  }
            }
      }
}
</style>

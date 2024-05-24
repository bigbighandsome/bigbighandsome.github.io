<template>
      <div class="wrap">
            <div class="bcc">
                  <n-back-top :right="14" :bottom="10" />
                  <div class="back_home">
                        <div class="back_btn" @click="backHome">返回</div>
                  </div>
                  <div class="like_container">
                        <n-icon class="like" @click="likeArticle">
                              <HeartIcon
                                    v-if="!like"
                                    class="HeartIcon"
                              ></HeartIcon>
                              <HeartSharpIcon
                                    v-if="like"
                                    class="HeartSharpIcon"
                              ></HeartSharpIcon>
                        </n-icon>
                        <div class="like_num">
                              <span>{{ articleLike.likeNum }}</span>
                        </div>
                  </div>
                  <div class="title">
                        <h2>{{ articleDetail.title }}</h2>
                  </div>
                  <div class="description">{{ articleDetail.description }}</div>
                  <div class="content">
                        <div
                              class="content-article"
                              v-html="articleDetail.content"
                              v-lazy-container="{ selector: 'img' }"
                        ></div>
                  </div>
                  <!-- 评论 -->
                  <Comment
                        :comment_article_id="articleDetail.id"
                        :comment_article_title="articleDetail.title"
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
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
      ArrowUpCircleOutline as ArrowUpCircleIcon,
      HeartOutline as HeartIcon,
      HeartSharp as HeartSharpIcon,
} from "@vicons/ionicons5";
//引入评论组件
import Comment from "../components/Comment.vue";

const route = useRoute();
const router = useRouter();
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");

const articleDetail = reactive({
      id: null,
      title: "",
      categoryid: null,
      content: "",
      description: "",
});
const like = ref(false);
const articleLike = reactive({
      id: 0,
      likeNum: 0,
});

onMounted(() => {
      LoadArticleDetail();
});
//加载单页
const LoadArticleDetail = async () => {
      let id = route.query.id;
      loadingBar.start();
      let result = await axios.get(`/blog/detail?id=${id}`);
      if (result.data.code == 200) {
            articleLike.id = result.data.rows[0].id;
            articleDetail.id = result.data.rows[0].id;
            articleDetail.title = result.data.rows[0].title;
            articleDetail.categoryid = result.data.rows[0].category_id;
            articleDetail.content = result.data.rows[0].content.replace(
                  /src/g,
                  "data-src"
            );
            articleDetail.description = result.data.rows[0].description;
            articleLike.likeNum =
                  result.data.rows[0].like_num == null
                        ? 0
                        : result.data.rows[0].like_num;
            like.value = articleLike.likeNum == 0 ? false : true;
            loadingBar.finish();
      } else {
            message.error("错误");
            loadingBar.error();
      }
};
const backHome = () => {
      router.push("/");
};

//点赞
const likeArticle = async () => {
      articleLike.likeNum++;
      like.value = articleLike.likeNum == 0 ? false : true;
      await axios.put("/blog/like", {
            id: articleLike.id,
            likenum: articleLike.likeNum,
      });
};
onBeforeUnmount(async () => {
      await axios.put("/blog/like", {
            id: articleLike.id,
            likenum: articleLike.likeNum,
      });
});
</script>

<style lang="scss" scoped>
.wrap {
      width: 100%;
      height: 100vh;
      overflow-y: hidden;
      background-color: #8ab5d7;
      border-radius: 10px;
      .bcc {
            width: 90%;
            height: 98%;
            margin: 0 auto;
            border-radius: 20px;
            margin-top: 10px;
            background-color: #b3cfe4;
            overflow-x: hidden;
            padding: 10px;
            .back_home {
                  min-width: 60px;
                  max-width: 100px;
                  height: 30px;
                  line-height: 30px;
                  background-color: #5b819e;
                  // box-shadow: 0px 0px 20px #61534e;
                  border-radius: 10px;
                  margin-left: 20px;
                  margin-top: 20px;
                  text-align: center;
                  transition: 0.6s all;
                  &:hover {
                        cursor: pointer;
                        background-color: #3d7dae;
                        // box-shadow: 0px 0px 20px #473d3a;
                  }
                  .back_btn {
                        transition: 0.6s all;
                  }
            }

            .backTop {
                  width: 100px;
                  height: 100px;
                  // background-color: red;
            }

            .like_container {
                  width: 100%;
                  display: flex;
                  justify-content: end;
                  flex-wrap: wrap;
                  position: relative;

                  .like {
                        margin-top: -40px;
                        margin-right: 20px;
                        .HeartIcon {
                              font-size: 38px;
                              border-radius: 50%;
                              cursor: pointer;
                        }

                        .HeartSharpIcon {
                              font-size: 38px;
                              border-radius: 50%;
                              color: #cb4c57;
                              filter: drop-shadow(1px 1px 4px #b0313c);
                              cursor: pointer;
                        }
                  }
                  .like_num {
                        width: 30px;
                        font-size: 16px;
                        color: #5fa2d6;
                        text-align: center;
                        filter: drop-shadow(2px 2px 2px #b3cfe4);
                        position: absolute;
                        bottom: -20px;
                  }
            }

            .title {
                  margin: 30px auto;
                  min-height: 60px;
                  line-height: 60px;
                  border-radius: 20px;
                  position: relative;
                  background-color: #5b9dcf;
                  opacity: 0.9;
                  box-shadow: 0px 0px 1px #768d9f;
                  h2 {
                        text-align: center;
                        font-weight: normal;
                        color: #000000;
                        filter: drop-shadow(2px 2px 6px #000000);
                  }
            }
            .description {
                  box-sizing: border-box;
                  width: 30%;
                  padding: 10px;
                  margin-top: 60px;
                  margin-left: 53%;
                  font-size: 14px;
                  border: 2px solid #000000;
                  border-radius: 10px;
                  color: #2c2c2c;
            }
            .content {
                  width: 100%;
                  margin-top: 30px;
                  margin-bottom: 30px;
                  border: 2px solid #3884bf;
                  box-shadow: 0 0 10px #1e6aa3;
                  border-radius: 5px;
                  overflow-x: hidden;
                  text-wrap: wrap;

                  .content-article {
                        padding: 10px;
                        text-wrap: wrap;
                  }
            }
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
      background-color: #313d44;
      opacity: 0.3;
      border-radius: 5px;
}
@media screen and (max-width: 720px) {
      .wrap {
            .bcc {
                  .title {
                        margin-top: 30px;
                  }
                  .description {
                        width: 100%;
                        margin: 0 auto;
                        margin-top: 50px;
                  }
            }
      }

      ::-webkit-scrollbar {
            width: 2px;
      }
}
</style>

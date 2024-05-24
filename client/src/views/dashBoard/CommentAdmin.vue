<template>
      <div class="wrap">
            <n-table class="table" :bordered="false" :single-line="false">
                  <thead>
                        <tr>
                              <!-- <td>id</td> -->
                              <td>评论内容</td>
                              <td>发布者</td>
                              <!-- <td>发布时间</td> -->
                              <td>操作</td>
                        </tr>
                  </thead>
                  <tbody>
                        <tr
                              v-for="(comment, index) in comments"
                              v-bind:key="comment.comment_id"
                        >
                              <!-- <td style="max-width: 30px">
                                    <n-ellipsis style="max-width: 100%">
                                          {{ comment.comment_article_id }}
                                    </n-ellipsis>
                              </td> -->

                              <td style="max-width: 100px">
                                    <n-ellipsis style="max-width: 100%">
                                          {{ comment.comment_content }}
                                    </n-ellipsis>
                              </td>
                              <td style="max-width: 100px">
                                    <n-ellipsis style="max-width: 100%">
                                          {{ comment.comment_user_name }}
                                    </n-ellipsis>
                              </td>
                              <!-- <td style="max-width: 40px">
                                    <n-ellipsis style="max-width: 100%">
                                          <span style="font-size: 12px">{{
                                                comment.comment_create_time
                                          }}</span>
                                    </n-ellipsis>
                              </td> -->
                              <td style="max-width: 60px">
                                    <n-space justify="center">
                                          <n-button
                                                @click="
                                                      deleteComment(
                                                            comment.comment_id
                                                      )
                                                "
                                          >
                                                删除
                                          </n-button>
                                    </n-space>
                              </td>
                        </tr>
                  </tbody>
            </n-table>

            <!-- 分页 -->
            <n-space justify="center">
                  <n-pagination
                        :page="commentPageinfo.page"
                        :page-count="commentPageinfo.pageCount"
                        :page-slot="5"
                        @update:page="changeCommentPage"
                        style="margin-bottom: 30px"
                  >
                        <template #prev>
                              <span style="font-size: 12px">上一页</span>
                        </template>
                        <template #next>
                              <span style="font-size: 12px">下一页</span>
                        </template>
                  </n-pagination>
            </n-space>
      </div>
</template>

<script setup>
//
import { ref, reactive, inject, watchEffect, onMounted } from "vue";
import { AdminStore } from "../../stores/AdminStore";
import { useRouter, useRoute } from "vue-router";
import LoginModal from "../../components/LoginModal.vue";

const route = useRoute();
const router = useRouter();
const adminStore = AdminStore();
//注入
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");
const server_url = inject("server_url");

const commentPageinfo = reactive({
      page: 1,
      pageSize: 20,
      pageCount: 0,
      count: 0,
});
const userinfo = ref([]);

const comments = ref([]);

onMounted(() => {
      loadUser();
      setTimeout(() => {
            loadComments();
      }, 300);
});

//加载用户
const loadUser = async () => {
      let result = await axios.get("/user/user_list");
      // console.log(result);
      if (result.data.code == 200) {
            userinfo.value = result.data.rows.map((item) => {
                  return {
                        id: item.id,
                        user_name: item.user_name,
                        user_face_img: item.face_img_url,
                        token: item.token,
                  };
            });
      } else {
            message.error(`获取用户信息失败:${result.data.msg}`);
      }
};
//加载评论(总数)
const loadComments = async () => {
      loadingBar.start();
      let axios_get = `/comment/comment_list?page=${commentPageinfo.page}&pagesize=${commentPageinfo.pageSize}`;
      let result = await axios.get(axios_get);
      if (result.data.code == 200) {
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
                  let comment_create_time = new Date(item.comment_create_time);
                  comment_create_time = `${comment_create_time.getFullYear()}年${
                        comment_create_time.getMonth() + 1
                  }月${comment_create_time.getDay()}日${comment_create_time.getHours()}时${comment_create_time.getMinutes()}分${comment_create_time.getSeconds()}秒`;
                  return {
                        comment_id: item.id,
                        comment_article_id: item.comment_article_id,
                        comment_article_title: item.comment_article_title,
                        comment_content: item.comment_content,
                        comment_create_time,
                        comment_user_id: item.comment_user_id,
                        comment_user_name: user_name,
                        comment_user_face_img: server_url + user_face_img,
                        comment_background_color: item.comment_background_color,
                  };
            });
            console.log(comments);
            loadingBar.finish();
            // message.success(`获取评论成功`, {
            //       duration: 1500,
            // });
      } else {
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
const deleteComment = async (id) => {
      console.log("delete");

      dialog.warning({
            title: "删除这条评论",
            content: "你确定？",
            positiveText: "确定",
            negativeText: "不确定",
            onPositiveClick: async () => {
                  loadingBar.start();
                  let axios_delete = `/comment/_user_token/comment_delete?id=${id}`;
                  let result = await axios.delete(axios_delete);
                  if (result.data.code == 200) {
                        message.success(`${result.data.msg}`, {
                              duration: 1500,
                        });
                        loadComments();
                  } else {
                        message.error(`${result.data.msg}`, {
                              duration: 1500,
                        });
                  }
                  loadingBar.finish();
            },
            onNegativeClick: () => {
                  message.info("取消");
            },
      });
};
</script>

<style lang="scss" scoped>
.wrap {
      width: 100%;
      .table {
            width: 100%;
      }
}
</style>

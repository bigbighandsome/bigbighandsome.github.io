<!--
 * @Author: xygodcyx 1323943635@qq.com
 * @Date: 2023-08-30 11:50:04
 * @LastEditors: xygodcyx 1323943635@qq.com
 * @LastEditTime: 2023-09-04 20:00:18
 * @FilePath: \blog\client\src\views\dashBoard\ArticleAdmin.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
      <n-card title="文章管理">
            <n-tabs
                  v-model:value="tabValue"
                  justify-content="start"
                  type="line"
                  animated="true"
                  @update:value="onTabChange"
            >
                  <n-tab-pane name="listArticle" tab="文章列表">
                        <div
                              v-for="(article, index) in articles"
                              style="margin-bottom: 10px"
                        >
                              <n-card>
                                    <h2>{{ article.title }}</h2>
                                    <span>{{ article.description }}</span>
                                    <template #footer>
                                          <n-space
                                                justify="start"
                                                style="align-items: center"
                                          >
                                                <span
                                                      class="text-lg max-lg:text-sm"
                                                >
                                                      写作于：{{
                                                            article.create_time
                                                      }}</span
                                                >

                                                <n-button
                                                      @click="
                                                            toUpdateArticle(
                                                                  article.id
                                                            )
                                                      "
                                                      >更新</n-button
                                                >
                                                <n-button
                                                      @click="
                                                            deleteArticle(
                                                                  article.id
                                                            )
                                                      "
                                                      >删除</n-button
                                                >
                                          </n-space>
                                          <spa class="text-xs"
                                                >最近更新于：</spa
                                          >
                                          <n-time
                                                class="text-xs text-blue-400"
                                                :time="article.timestamp"
                                                type="relative"
                                          >
                                          </n-time>
                                    </template>
                              </n-card>
                        </div>
                        <n-space justify="center">
                              <div
                                    v-for="(
                                          pageNumber, index
                                    ) in pageinfo.pageCount"
                              >
                                    <n-button @click="toPage(pageNumber)">
                                          {{ pageNumber }}
                                    </n-button>
                              </div>
                        </n-space>
                  </n-tab-pane>
                  <n-tab-pane name="addArticle" tab="添加文章">
                        <n-from>
                              <n-form-item label="标题" style="width: 200px">
                                    <n-input
                                          maxlength="26"
                                          show-count
                                          clearable
                                          v-model:value="addArticle.title"
                                          placeholder="请输入标题"
                                          max="10"
                                    />
                              </n-form-item>
                              <n-form-item label="分类" style="width: 200px">
                                    <n-select
                                          clearable
                                          filterable
                                          placeholder="请选择分类"
                                          v-model:value="addArticle.categoryid"
                                          :options="options"
                                    />
                              </n-form-item>

                              <n-form-item label="摘要">
                                    <n-input
                                          show-count
                                          clearable
                                          v-model:value="addArticle.description"
                                          type="textarea"
                                          placeholder="请输入摘要为空则自动摘取"
                                    ></n-input>
                              </n-form-item>
                              <n-form-item label="内容">
                                    <RichTextEditor
                                          ref="editor"
                                          v-model="addArticle.content"
                                    ></RichTextEditor>
                              </n-form-item>
                              <n-form-item>
                                    <n-button
                                          type="success"
                                          @click="onAddArticle"
                                          >写完了</n-button
                                    >
                              </n-form-item>
                        </n-from>
                  </n-tab-pane>
                  <n-tab-pane name="updateArticle" tab="更新文章"
                        ><n-from>
                              <div class="absolute top-0 right-56"></div>
                              <n-form-item label="标题" style="width: 200px">
                                    <n-input
                                          maxlength="26"
                                          show-count
                                          clearable
                                          v-model:value="updateArticle.title"
                                          placeholder="请输入标题"
                                          max="10"
                                    />
                              </n-form-item>
                              <n-form-item label="分类" style="width: 200px">
                                    <n-select
                                          clearable
                                          filterable
                                          placeholder="请选择分类"
                                          v-model:value="
                                                updateArticle.categoryid
                                          "
                                          :options="options"
                                    />
                              </n-form-item>
                              <n-form-item label="摘要">
                                    <n-input
                                          show-count
                                          clearable
                                          v-model:value="
                                                updateArticle.description
                                          "
                                          type="textarea"
                                          placeholder="请输入摘要为空则自动摘取"
                                    ></n-input>
                              </n-form-item>
                              <n-form-item label="内容">
                                    <RichTextEditor
                                          v-model="updateArticle.content"
                                    ></RichTextEditor>
                              </n-form-item>
                              <n-form-item>
                                    <n-space>
                                          <n-button
                                                type="success"
                                                @click="onUpdateArticle"
                                                >更新</n-button
                                          >
                                          <n-button
                                                type="success"
                                                @click="onCancelUpdateArticle"
                                                >取消</n-button
                                          >
                                    </n-space>
                              </n-form-item>
                        </n-from>
                  </n-tab-pane>
            </n-tabs>
      </n-card>

      <LoginModal ref="refLoginModal"></LoginModal>
</template>

<script setup>
import { ref, reactive, inject, watchEffect, onMounted, shallowRef } from "vue";
import { AdminStore } from "../../stores/AdminStore";
import { useRouter, useRoute } from "vue-router";
import LoginModal from "../../components/LoginModal.vue";
import RichTextEditor from "../../components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const adminStore = AdminStore();
//注入
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");

const addArticle = reactive({
      categoryid: null,
      title: "",
      content: "",
      description: "",
});
const updateArticle = reactive({
      id: null,
      categoryid: null,
      title: "",
      content: "",
      description: "",
});
const upDating = ref(false);
const tabValue = ref("listArticle");
const options = ref();
const refLoginModal = ref(true);
const editor = shallowRef();
const updateEditor = shallowRef();
const articles = ref([]);
const pageinfo = reactive({
      page: 1,
      pageSize: 3,
      pageCount: 0,
      count: 0,
});
onMounted(() => {
      loadCategory();
      loadArticle();
});
//切换标签页的时候
const onTabChange = (toTableName) => {
      switch (toTableName) {
            case "listArticle":
                  loadArticle();
                  break;
            case "addArticle":
                  break;
            case "updateArticle":
                  if (!upDating.value) {
                        updateArticle.content = "";
                  }
                  break;
      }
};
//加载文章
const loadArticle = async () => {
      loadingBar.start();

      let result = await axios.get(
            `/blog/list?page=${pageinfo.page}&pagesize=${pageinfo.pageSize}`
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
                  };
            });
      }
      loadingBar.finish();
};
//加载分类
const loadCategory = async () => {
      let result = await axios.get("/category/list");
      options.value = result.data.data.map((item) => {
            return {
                  label: item.name,
                  value: item.id,
            };
      });
      console.log(options.value);
};
//添加文章
const onAddArticle = async () => {
      if (addArticle.title == "" || addArticle.title == null) {
            message.warning("标题不能为空");
            return;
      }
      if (addArticle.categoryid == "" || addArticle.categoryid == null) {
            message.warning("请选择分类");
            return;
      }
      if (addArticle.content == "<p><br></p>" || addArticle.content == null) {
            message.warning("内容不能为空");
            return;
      }
      console.log(addArticle.description);
      loadingBar.start();
      let result = await axios.post("/blog/_token/add", addArticle);
      if (result.data.code == 200) {
            addArticle.categoryid = null;
            addArticle.title = "";
            addArticle.description = "";
            // editor.value.editorRef.getText();
            //清空编辑器，用编辑器手动暴露出来的editor
            // editor.value.editorRef.clear();
            addArticle.content = "";
            loadArticle();
            tabValue.value = "listArticle";
            message.success(result.data.msg);
      } else {
            if (result.data.msg == "请先登录") {
                  refLoginModal.value.showLoginModal = true;
            }
            message.error(result.data.msg);
      }
      loadingBar.finish();
};
//删除文章
const deleteArticle = async (id) => {
      if (upDating.value) {
            message.error("请不要在更新文章的时候删除文章!!!");
            return;
      }
      dialog.warning({
            title: "删除文章",
            content: "你确定？",
            positiveText: "确定",
            negativeText: "不确定",
            onPositiveClick: async () => {
                  loadingBar.start();
                  let result = await axios.delete(
                        `/blog/_token/delete?id=${id}`
                  );
                  if (result.data.code === 200) {
                        message.success(result.data.msg);
                        loadArticle();
                  } else if (result.data.msg == "请先登录") {
                        message.warning(result.data.msg);
                        refLoginModal.value.showLoginModal = true;
                  }
                  loadingBar.finish();
            },
            onNegativeClick: () => {
                  message.info("取消");
            },
      });
};
//改变页数
const toPage = (pageNumber) => {
      loadingBar.start();

      pageinfo.page = pageNumber;
      loadArticle();
      loadingBar.finish();
};
//更新文章（按钮）
const toUpdateArticle = async (id) => {
      upDating.value = true;
      updateArticle.id = id;
      let result = await axios.get(`/blog/detail?id=${id}`);
      if (result.data.code == 200) {
            console.log(result.data);
            updateArticle.title = result.data.rows[0].title;
            updateArticle.categoryid = result.data.rows[0].category_id;
            updateArticle.content = result.data.rows[0].content;
            updateArticle.description = result.data.rows[0].description;
      }
      tabValue.value = "updateArticle";
};
//更新文章
const onUpdateArticle = async (id) => {
      if (updateArticle.title == "" || updateArticle.title == null) {
            message.warning("标题不能为空");
            return;
      }
      if (updateArticle.categoryid == "" || updateArticle.categoryid == null) {
            message.warning("请选择分类");
            return;
      }
      if (
            updateArticle.content == "<p><br></p>" ||
            updateArticle.content == null
      ) {
            message.warning("内容不能为空");
            return;
      }
      loadingBar.start();

      let result = await axios.put("/blog/_token/update", updateArticle);
      if (result.data.code == 200) {
            updateArticle.categoryid = null;
            updateArticle.title = "";
            updateArticle.description = "";
            // editor.value.editorRef.getText();
            //清空编辑器，用编辑器手动暴露出来的editor
            // editor.value.editorRef.clear();
            updateArticle.content = "";
            message.success(result.data.msg);
            upDating.value = false;
            loadArticle();
            tabValue.value = "listArticle";
      } else {
            if (result.data.msg == "请先登录") {
                  refLoginModal.value.showLoginModal = true;
            }
            message.error(result.data.msg);
      }
      loadingBar.finish();
};
//取消更新文章（按钮）
const onCancelUpdateArticle = () => {
      updateArticle.categoryid = null;
      updateArticle.title = null;
      // editor.value.editorRef.getText();
      //清空编辑器，用编辑器手动暴露出来的editor
      updateArticle.content = "";
      message.warning("取消更新");
      upDating.value = false;
      tabValue.value = "listArticle";
};
</script>

<style lang="scss" scoped></style>
../../components/stores/AdminStore

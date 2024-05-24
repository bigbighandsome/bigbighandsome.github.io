<template>
      <div class="p-2">
            <n-button @click="addCategory">添加</n-button>
            <n-table :bordered="false" :single-line="false">
                  <thead>
                        <tr>
                              <th>编号</th>
                              <th>名称</th>
                              <th>操作</th>
                        </tr>
                  </thead>
                  <tbody>
                        <tr v-for="(category, index) in categorys">
                              <td>{{ category.id }}</td>
                              <td>{{ category.name }}</td>
                              <td>
                                    <n-space>
                                          <n-button
                                                @click="
                                                      updateCategory(
                                                            category.id
                                                      )
                                                "
                                                >修改</n-button
                                          >
                                          <n-button
                                                @click="
                                                      deleteCategory(
                                                            category.id
                                                      )
                                                "
                                                >删除</n-button
                                          >
                                    </n-space>
                              </td>
                        </tr>
                  </tbody>
            </n-table>
      </div>

      <n-modal v-model:show="showUpdate">
            <n-card
                  style="width: 400px"
                  title="更新分类"
                  :bordered="false"
                  size="huge"
                  preset="card"
                  aria-modal="true"
            >
                  <template #header-extra></template>
                  <n-input
                        v-model:value="categoryUpdateName"
                        placeholder="输入更新的分类名称"
                  ></n-input>
                  <template #footer>
                        <n-space justify="space-between">
                              <n-button
                                    type="info"
                                    @click="onUpdateNegativeClick"
                                    >取消</n-button
                              >
                              <n-button
                                    type="success"
                                    @click="onUpdatePositiveClick"
                              >
                                    更新
                              </n-button>
                        </n-space>
                  </template>
            </n-card>
      </n-modal>

      <n-modal v-model:show="showAdd">
            <n-card
                  style="width: 400px"
                  title="添加分类"
                  :bordered="false"
                  size="huge"
                  preset="card"
                  aria-modal="true"
            >
                  <template #header-extra></template>
                  <n-input
                        v-model:value="categoryName"
                        placeholder="输入添加的分类名称"
                  ></n-input>
                  <template #footer>
                        <n-space justify="space-between">
                              <n-button type="info" @click="onAddNegativeClick"
                                    >取消</n-button
                              >
                              <n-button
                                    type="success"
                                    @click="onAddPositiveClick"
                                    >添加</n-button
                              >
                        </n-space>
                  </template>
            </n-card>
      </n-modal>

      <n-modal v-model:show="showDelete">
            <n-card
                  style="width: 400px"
                  title="删除分类"
                  :bordered="false"
                  size="huge"
                  preset="card"
                  aria-modal="true"
            >
                  <template #header-extra>港真？</template>
                  确认删除这个分类吗？
                  <template #footer>
                        <n-space justify="space-between">
                              <n-button
                                    type="info"
                                    @click="onDeleteNegativeClick"
                                    >点错了</n-button
                              >
                              <n-button
                                    type="success"
                                    @click="onDeletePositiveClick"
                              >
                                    点对了
                              </n-button>
                        </n-space>
                  </template>
            </n-card>
      </n-modal>

      <LoginModal ref="refLoginModal"></LoginModal>
</template>

<script setup>
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
const loadingBar = inject("loadingBar");

const refLoginModal = ref(true);

const categorys = ref([]);
const categoryName = ref("");
const categoryUpdateName = ref("");
const showAdd = ref(false);
const showDelete = ref(false);
const showUpdate = ref(false);
const deleteID = ref(0);
const updateID = ref(0);

watchEffect(() => {});

onMounted(() => {
      loadCategorys();
});
const loadCategorys = async () => {
      loadingBar.start();

      let result = await axios.get("/category/list");
      console.log(result.data);
      if (result.data.code == 200) {
            categorys.value = result.data.data;
      }
      loadingBar.finish();
};

//更新
const updateCategory = (id) => {
      updateID.value = id;
      showUpdate.value = true;
};

const onUpdateNegativeClick = () => {
      showUpdate.value = false;
      categoryUpdateName.value = "";
};

const onUpdatePositiveClick = async () => {
      if (categoryUpdateName.value.trim() == "") {
            message.warning("不能为空");
            return;
      }
      let result = await axios.put("/category/_token/update", {
            id: updateID.value,
            name: categoryUpdateName.value,
      });
      console.log(result);
      if (result.data.code == 200) {
            message.success(result.data.msg);
            loadCategorys();
      } else if (result.data.msg == "请先登录") {
            refLoginModal.value.showLoginModal = true;
            message.info(result.data.msg);
      } else {
            message.warning(result.data.msg);
      }
      showUpdate.value = false;
      categoryUpdateName.value = "";
};

//删除
const deleteCategory = (id) => {
      deleteID.value = id;
      showDelete.value = true;
};

const onDeleteNegativeClick = () => {
      showDelete.value = false;
};
const onDeletePositiveClick = async () => {
      let result = await axios.delete(
            `/category/_token/delete?id=${deleteID.value}`
      );
      console.log(result);
      if (result.data.code == 200) {
            message.success(result.data.msg);
            loadCategorys();
      } else if (result.data.msg == "请先登录") {
            refLoginModal.value.showLoginModal = true;
            message.info(result.data.msg);
      } else {
            message.warning(result.data.msg);
      }
      showDelete.value = false;
};

//添加
const addCategory = () => {
      showAdd.value = true;
};

const onAddNegativeClick = () => {
      showAdd.value = false;
      categoryName.value = "";
};
const onAddPositiveClick = async () => {
      if (categoryName.value.trim() == "") {
            message.warning("不能为空", { duration: 600 });
            return;
      }
      let result = await axios.post("/category/_token/add", {
            name: categoryName.value,
      });
      if (result.data.code === 200) {
            loadCategorys();
      }
      message.info(result.data.msg);
      if (result.data.msg == "请先登录") {
            refLoginModal.value.showLoginModal = true;
      }
      showAdd.value = false;
      categoryName.value = "";
};
</script>

<style lang="scss" scoped></style>

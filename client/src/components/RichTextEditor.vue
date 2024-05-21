<template>
      <div>
            <div style="border: 1px solid #ccc; margin-top: 10px">
                  <Toolbar
                        :editor="editorRef"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                        style="border-bottom: 1px solid #cccccc"
                  />
                  <Editor
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        v-model="valueHtml"
                        style="height: 400px; overflow-y: hidden"
                        @onCreated="handleCreated"
                        @onChange="handleChange"
                        @onDestroyed="handleDestroyed"
                  />
            </div>
            <div style="margin-top: 10px; width: 50%">
                  <!-- <textarea
        v-model="valueHtml"
        readonly
        style="width: 100%; height: 200px; outline: none"></textarea> -->
            </div>
      </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted, inject } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const props = defineProps({
      modelValue: {
            type: String,
            default: "",
      },
});

const server_url = inject("server_url");

const emit = defineEmits(["update:model-value"]);

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

defineExpose({
      editorRef,
});

const valueHtml = ref("");

const toolbarConfig = { excludeKeys: ["uploadVideo"] };
const editorConfig = { placeholder: "请输入内容..." };

editorConfig.MENU_CONF = {};
editorConfig.MENU_CONF["uploadImage"] = {
      base64LimitSize: 10 * 1024, // 10kb
      server: server_url + "/upload/rich_editor_upload",
};
editorConfig.MENU_CONF["insertImage"] = {
      parseImageSrc: (src) => {
            if (src.indexOf("http") !== 0) {
                  console.log(src);

                  return `${server_url}${src[0]}`;
            }
            return src;
      },
};

const mode = ref("default");

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
      const editor = editorRef.value;

      if (editor == null) return;

      editor.destroy();
});
let initValued = false;
onMounted(() => {
      setTimeout(() => {
            valueHtml.value = props.modelValue;
            initValued = true;
      }, 10);
});
// 编辑器回调函数
const handleCreated = (editor) => {
      // console.log("created", editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
      editor.enable();
};
const handleChange = (editor) => {
      // console.log("change:", editor.getHtml());
      if (initValued) emit("update:model-value", valueHtml.value);
};
const handleDestroyed = (editor) => {
      // console.log("destroyed", editor);
};
</script>

<style lang="scss" scoped></style>

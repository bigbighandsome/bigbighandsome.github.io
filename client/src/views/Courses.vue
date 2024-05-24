<template>
      <div class="wrap">
            <div class="classTableWrap">
                  <!-- <div class="left">
                  <ul>
                        <li v-for="(i, index) in 11">{{ i }}</li>
                  </ul>
            </div> -->
                  <div class="right">
                        <!-- TODO完善样式，改成选择当前周，并且导航到当前周，加入日期 -->
                        <n-space justify="center" style="margin-top: 10px">
                              <!-- <n-button @click="nextClass">下一周</n-button>
                         -->
                              <n-button-group>
                                    <n-button
                                          secondary
                                          strong
                                          round
                                          color="#6B9AC4"
                                          @click="toHomePage"
                                          >返回首页</n-button
                                    >
                                    <n-button
                                          secondary
                                          strong
                                          round
                                          color="#F4B942"
                                          @click="quitLogin"
                                          v-if="isLogged"
                                          >退出登录</n-button
                                    >
                                    <n-button
                                          secondary
                                          strong
                                          round
                                          color="#97D8C4"
                                          @click="jumpToday"
                                          v-if="isLogged"
                                          >跳转到当前周</n-button
                                    >
                              </n-button-group>
                        </n-space>
                        <div class="selectDate" v-if="isLogged">
                              <!-- <n-select
                                    v-model:value="date_week"
                                    size="large"
                                    :options="date_options"
                                    class="select"
                              /> -->
                              <select class="select" v-model="date_week">
                                    <option
                                          class="date_option"
                                          :value="date.value"
                                          v-for="(date, index) in date_options"
                                          v-bind="index"
                                    >
                                          {{ date.label }}
                                    </option>
                              </select>
                              <span class="current_Week" v-if="isLogged"
                                    >当前周次:
                                    <span class="current_Week_num">
                                          {{ week }}
                                    </span></span
                              >
                        </div>

                        <table
                              :bordered="false"
                              :single-line="false"
                              v-if="isLogged"
                        >
                              <div class="classTable">
                                    <thead>
                                          <tr>
                                                <!-- <th
                                                :class="isToday"
                                                v-for="(day, index) in days"
                                          >
                                                {{ day }}
                                          </th> -->
                                                <th
                                                      class="courseTopInfo"
                                                      v-for="(
                                                            date, index
                                                      ) in courseDate"
                                                      v-bind:key="index"
                                                      :class="{
                                                            today:
                                                                  currentDay ===
                                                                  date.xqid * 1,
                                                      }"
                                                >
                                                      <span
                                                            style="
                                                                  font-size: 12px;
                                                                  height: 5px;
                                                                  display: inline-block;
                                                            "
                                                            >星期{{
                                                                  date.xqmc
                                                            }}</span
                                                      >
                                                      <span
                                                            style="
                                                                  font-size: 12px;
                                                                  height: 5px;
                                                                  display: inline-block;
                                                            "
                                                      >
                                                            {{ date.mxrq }}
                                                      </span>
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody style="width: 100%">
                                          <tr
                                                v-for="(
                                                      courses, index
                                                ) in courseInfo"
                                                v-bind:key="index"
                                          >
                                                <td
                                                      v-for="(
                                                            course, index
                                                      ) in courses"
                                                      v-bind:key="index"
                                                      @click="
                                                            classDetail(course)
                                                      "
                                                      :class="
                                                            course.courseName ==
                                                            noCourseName
                                                                  ? 'noCourse'
                                                                  : 'haveCourse'
                                                      "
                                                      class="courseCell"
                                                >
                                                      <span class="courseName">
                                                            {{
                                                                  course.courseName
                                                            }}
                                                      </span>
                                                      <span
                                                            class="courseClassroomName"
                                                      >
                                                            {{
                                                                  course.classroomName
                                                            }}
                                                      </span>
                                                </td>
                                          </tr>
                                    </tbody>
                              </div>
                        </table>
                  </div>
                  <n-form class="bottom" v-if="!isLogged">
                        <n-checkbox
                              v-model:checked="useDefaultAccount"
                              :disabled="
                                    loginInfo.account != '' ||
                                    loginInfo.password != ''
                              "
                        >
                              {{
                                    loginInfo.account != "" ||
                                    loginInfo.password != ""
                                          ? "使用默认账号（前端2202 cyx）请清空输入框再选择"
                                          : "使用默认账号（前端2202 cyx）"
                              }}
                        </n-checkbox>
                        <n-space vertical>
                              <template v-if="!useDefaultAccount">
                                    <n-input
                                          placeholder="输入账号"
                                          :maxlength="9"
                                          request
                                          v-model:value="loginInfo.account"
                                          clearable
                                    >
                                    </n-input>
                                    <n-input
                                          type="password"
                                          request
                                          placeholder="输入密码"
                                          show-password-on="click"
                                          v-model:value="loginInfo.password"
                                          clearable
                                    >
                                    </n-input>
                              </template>
                              <n-space justify="center">
                                    <n-button @click="login">登录</n-button>
                              </n-space>
                        </n-space>
                  </n-form>
            </div>
            <n-modal
                  v-model:show="showClassDetail"
                  class="classDetail"
                  preset="card"
                  :style="classDetailStyle"
                  title="上啥课啊？"
                  size="small"
                  :bordered="false"
                  :segmented="segmented"
            >
                  <template #header-extra>
                        <div class="classDetailHeader">
                              <p>哦吼！原来今天还要上课嘞？</p>
                              <p>？？？</p>
                        </div>
                  </template>
                  <div class="classDetailContent">
                        <ul class="content">
                              <li>
                                    <span class="content_left">课程名称:</span
                                    ><span class="content_right">{{
                                          detail.courseNameTitle
                                    }}</span>
                              </li>
                              <li>
                                    <span class="content_left">时间:</span
                                    ><span class="content_right">{{
                                          detail.courseTime
                                    }}</span>
                              </li>
                              <li>
                                    <span class="content_left">地点:</span
                                    ><span class="content_right">
                                          {{ detail.coursePosition }}</span
                                    >
                              </li>
                              <li>
                                    <span class="content_left">教师:</span
                                    ><span class="content_right">{{
                                          detail.courseTeacher
                                    }}</span>
                              </li>
                              <li>
                                    <span class="content_left">教学周:</span
                                    ><span class="content_right">{{
                                          detail.courseNeedWeek
                                    }}</span>
                              </li>
                        </ul>
                        <n-space justify="center">
                              <n-button
                                    tertiary
                                    type="primary"
                                    @click="showClassDetail = false"
                                    style="width: 60vw"
                                    >确定</n-button
                              >
                        </n-space>
                  </div>
                  <template #footer>
                        <div class="classDetailFooter">
                              <p>快去学习！</p>
                              <p>要不给你打个鸡血？</p>
                              <p>额。。。</p>
                              <p>还是算了~</p>
                        </div>
                  </template>
            </n-modal>
      </div>
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
      watch,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { PlayBackOutline as BackHomeIcon } from "@vicons/ionicons5";

import { CourseStore } from "../stores/CourseStore";

const route = useRoute();
const router = useRouter();
const axios = inject("axios");
const message = inject("message");
const dialog = inject("dialog");
const loadingBar = inject("loadingBar");
const courseStore = CourseStore();
//week定义
const week = ref(1);

const courseInfo = ref([]);
const courseTempInfo = ref([]);
const showClassDetail = ref(false);
const detail = reactive({
      courseNameTitle: "",
      courseTime: "",
      coursePosition: "",
      courseTeacher: "",
      courseNeedWeek: "",
      // coursePhysicalEducation: "",
});

const currentDay = computed(() => {
      return new Date().getDay();
});

//是某使用默认账号登录
const useDefaultAccount = ref(false);

//把今天的星期渲染成不同颜色
const isToday = ref("today");

const classDetailStyle = ref({
      width: "80%",
      height: "60vh",
});
const noCourseName = ref("");
const isLogged = ref(false);

//周次的日期选择
const date_options = [];

const loginInfo = reactive({
      account: "",
      password: "",
});

//选择周次
const date_week = ref(null);

watch(date_week, (value) => {
      console.log("watch date_week");
      console.log(`date_week.value:${value}`);
      if (value == null) {
            return;
      }
      week.value = value;
      console.log(`week.value:${week.value}`);
      getKCB();
});
// watch(week, () => {
//       console.log("watch week");
//       getKCB();
// });
const topInfo = reactive({
      maxWeek: "21",
      semesterId: "2023-2024-1",
      today: "2023-09-27",
      week: "5",
      weekday: "星期三",
});
const courseDate = ref([]);
const quitLogin = () => {
      dialog.create({
            type: "warning",
            title: "退出登录?",
            content: "退出了可就要重新登录了哈，而且慧通九职哪里也要重新登录",
            negativeText: "点错了",
            positiveText: "退出",
            onNegativeClick: () => {},
            onPositiveClick: () => {
                  localStorage.removeItem("school_course_user_token");
                  localStorage.removeItem("school_user_token");
                  localStorage.removeItem("kbjcmsid");
                  isLogged.value = false;
            },
      });
};
const jumpToday = () => {
      console.log("jumpToday");
      date_week.value = null;
      console.log(
            `week.value :${week.value} parseInt(topInfo.week):${parseInt(
                  topInfo.week
            )}`
      );
      if (week.value == parseInt(topInfo.week)) {
            message.warning("就是今天哦", {
                  duration: 600,
            });
            return;
      }
      week.value = parseInt(topInfo.week);
      localStorage.setItem("week", topInfo.week);
      getKCB();
};

onMounted(() => {
      usertoken.value =
            courseStore.usertoken == ""
                  ? localStorage.getItem("school_course_user_token")
                  : courseStore.usertoken;
      x_id_token.value =
            courseStore.x_id_token == ""
                  ? localStorage.getItem("school_course_user_token")
                  : courseStore.x_id_token;
      token.value =
            courseStore.token == ""
                  ? localStorage.getItem("school_user_token")
                  : courseStore.token;
      kbjcmsid.value =
            courseStore.kbjcmsid == ""
                  ? localStorage.getItem("kbjcmsid")
                  : courseStore.kbjcmsid;
      week.value = localStorage.getItem("week");
      if (usertoken.value && token.value) {
            isLogged.value = true;
            getKCB();
      } else {
            isLogged.value = false;
      }
      date_options.push({
            label: `选择周次`,
            value: null,
      });
      for (let i = 1; i <= topInfo.maxWeek; ++i) {
            date_options.push({
                  label: `星期${i}`,
                  value: i,
            });
      }
});

//输入登录验证
const login = () => {
      if (useDefaultAccount.value) {
            loginInfo.account = "223050659";
            loginInfo.password = "XXYXxxyx666";
      }
      if (loginInfo.account == "") {
            message.warning("就不能输个账号？", {
                  duration: 1000,
            });
            return;
      }
      if (loginInfo.password == "") {
            message.warning("就不能输个密码？", {
                  duration: 1000,
            });
            return;
      }
      console.log(loginInfo.account);
      console.log(loginInfo.password);
      getLogin();
      loginInfo.account = "";
      loginInfo.password = "";
};

//显示课程的详细信息
const classDetail = (course) => {
      if (course.courseName != noCourseName.value) {
            console.log(course);
            showClassDetail.value = true;
            detail.courseNameTitle = `${course.courseName} (${
                  course.fzmc == "" ? "不是体育课，废话！-_- " : course.fzmc
            }) `;
            detail.courseTime = ` ${classTimeToWeek(course.classTime)} (${
                  course.startTime
            }-${course.endTIme})`;
            detail.coursePosition = course.classroomName;
            detail.courseTeacher = course.teacherName;
            detail.courseNeedWeek = `第${course.classWeek}周`;
      }
};
//格式化课程显示日期
const classTimeToWeek = (classTime) => {
      let week = classTime.substring(0, 1);
      let classNode = classTime.substring(1, classTime.length);
      switch (week) {
            case "1":
                  week = "星期一";
                  break;
            case "2":
                  week = "星期二";
                  break;
            case "3":
                  week = "星期三";
                  break;
            case "4":
                  week = "星期四";
                  break;
            case "5":
                  week = "星期五";
                  break;
            case "6":
                  week = "星期六";
                  break;
            case "7":
                  week = "星期日";
                  break;
      }

      classNode = `第${classNode}节`;

      return `${week}，${classNode}`;
};
const usertoken = ref("");
const x_id_token = ref("");
const token = ref("");
const kbjcmsid = ref("");
//登录
const getLogin = async () => {
      loadingBar.start();
      try {
            let result = await axios({
                  url: "/course/get_login",
                  method: "post",
                  params: {
                        username: loginInfo.account,
                        password: loginInfo.password,
                  },
            });
            usertoken.value = result.data.data.idToken;
            x_id_token.value = result.data.data.idToken;
            console.log(result);
            localStorage.setItem("school_course_user_token", usertoken.value);
            isLogged.value = true;
            // message.success("登录成功", {
            //       duration: 1000,
            // });
            getKCB();
            loadingBar.finish();
      } catch (err) {
            message.error("登录失败");
            loadingBar.error();
      }
};
//get_token
const getToken = async () => {
      console.log("getToken");
      await axios({
            url: "/course/get_token",
            method: "get",
            params: {
                  url: "http://m-jiaowu.jvtc.jx.cn/njwhd/loginSso?toMenu=xs_kcb",
            },
            headers: {
                  usertoken: usertoken.value,
                  x_id_token: x_id_token.value,
            },
      }).then((response) => {
            const data = response.data;
            // console.log(data);
            const regex = /token=([^&]+)/; // 使用正则表达式匹配 "token=" 后面的非 & 字符
            const match = data.match(regex);
            let _token = match[1];
            token.value = _token;
            localStorage.setItem("school_user_token", token.value);
            // console.log(token);
            if (!kbjcmsid.value) {
                  getSjikbms();
            }
      });
};

//Get_sjkbms
const getSjikbms = async () => {
      console.log("getSjikbms");
      let result = await axios({
            url: "/course/get_sjkbms",
            method: "post",
            params: {
                  url: "http://mm-jiaowu.jvtc.jx.cn/njwhd/Get_sjkbms",
                  token: token.value,
            },
      });
      let _kbjcmsid = result.data.data[0].kbjcmsid;
      console.log(`_kbjcmsid:${_kbjcmsid}`);
      kbjcmsid.value = _kbjcmsid;
      localStorage.setItem("kbjcmsid", kbjcmsid.value);
      getKCB();
};
//获取课程表！！！
const getKCB = async () => {
      console.log("GetKCB");
      loadingBar.start();
      courseTempInfo.value = [];
      courseInfo.value = [];

      console.log(`week.value:${week.value} kbjcmsid.value:${kbjcmsid.value}`);
      let result = await axios({
            url: "/course/get_kcb",
            method: "post",
            params: {
                  url: `http://mm-jiaowu.jvtc.jx.cn/njwhd/student/curriculum?week=${week.value}&kbjcmsid=${kbjcmsid.value}`,
                  token: token.value,
            },
      });
      console.log(result.data.code);
      if (result.data.code != "1") {
            loadingBar.error();
            getToken();
            return;
      }
      courseDate.value = result.data.data[0].date;
      topInfo.maxWeek = result.data.data[0].topInfo[0].maxWeek;
      topInfo.semesterId = result.data.data[0].topInfo[0].semesterId;
      topInfo.today = result.data.data[0].topInfo[0].today;
      topInfo.week = result.data.data[0].topInfo[0].week;
      topInfo.weekday = result.data.data[0].topInfo[0].weekday;

      if (parseInt(topInfo.week) == parseInt(date_week.value)) {
            localStorage.setItem("week", topInfo.week);
      }

      if (result.data.code == "1") {
            let one = [];
            let three = [];
            let five = [];
            let seven = [];
            let nine = [];
            let eleven = [];
            for (let i = 0; i < result.data.data[0].item.length; i++) {
                  const item = result.data.data[0].item[i];
                  for (let j = 0; j < item.length; j++) {
                        const course = item[j][0];
                        const classTime = parseInt(
                              course.classTime.substring(2, 3)
                        );
                        switch (classTime) {
                              case 1:
                                    one.push(course);
                                    break;
                              case 3:
                                    three.push(course);
                                    break;
                              case 5:
                                    five.push(course);
                                    break;
                              case 7:
                                    seven.push(course);
                                    break;
                              case 9:
                                    nine.push(course);
                                    break;
                              case 11:
                                    eleven.push(course);
                                    break;
                        }
                  }
            }

            courseTempInfo.value.push(one);
            courseTempInfo.value.push(three);
            courseTempInfo.value.push(five);
            courseTempInfo.value.push(seven);
            courseTempInfo.value.push(nine);
            courseTempInfo.value.push(eleven);

            // message.success(`加载课程表成功！${result.data.Msg}`, {
            //       duration: 1000,
            // });

            // 生成二维表格占位
            for (let i = 0; i < 6; i++) {
                  const row = [];
                  for (let j = 0; j < 7; j++) {
                        row.push({
                              courseName: noCourseName.value,
                              classTime: 2 * i + 1,
                              weekDay: j + 1,
                        });
                  }
                  courseInfo.value.push(row);
            }

            // 合并数据
            for (let i = 0; i < courseTempInfo.value.length; i++) {
                  const item = courseTempInfo.value[i];
                  for (let j = 0; j < item.length; j++) {
                        const course = item[j];
                        const classTime = parseInt(
                              course.classTime.substring(2, 3)
                        );
                        const weekDay = parseInt(course.weekDay);
                        for (let k = 0; k < courseInfo.value.length; k++) {
                              const row = courseInfo.value[k];
                              const index = row.findIndex(
                                    (item) =>
                                          item.weekDay === weekDay &&
                                          item.classTime === classTime
                              );
                              if (index !== -1) {
                                    courseInfo.value[k][index] = course;
                                    break;
                              }
                        }
                  }
            }
            console.log(courseInfo.value);
            loadingBar.finish();
            // //修正格式

            // let one = [];
            // let three = [];
            // let five = [];
            // let seven = [];
            // let nine = [];
            // let eleven = [];

            // for (let i = 0; i < result.data.data[0].item.length; i++) {
            //       const item = result.data.data[0].item[i];
            //       let classTime = -1;
            //       for (let j = 0; j < item.length; j++) {
            //             const course = item[j][0];
            //             classTime = course.classTime.substring(2, 3) * 1;
            //             switch (classTime) {
            //                   case 1:
            //                         {
            //                               one.push(course);
            //                         }
            //                         break;
            //                   case 3:
            //                         {
            //                               three.push(course);
            //                         }
            //                         break;
            //                   case 5:
            //                         {
            //                               five.push(course);
            //                         }
            //                         break;

            //                   case 7:
            //                         {
            //                               seven.push(course);
            //                         }
            //                         break;
            //                   case 9:
            //                         {
            //                               nine.push(course);
            //                         }
            //                         break;
            //                   case 11:
            //                         {
            //                               eleven.push(course);
            //                         }
            //                         break;
            //             }
            //       }
            // }
            // courseTempInfo.value.push(one);
            // courseTempInfo.value.push(three);
            // courseTempInfo.value.push(five);
            // courseTempInfo.value.push(seven);
            // courseTempInfo.value.push(nine);
            // courseTempInfo.value.push(eleven);

            // loadingBar.finish();
            // message.success(`加载课程表成功！${result.data.Msg}`, {
            //       duration: 1000,
            // });

            // //生成二维表格占位
            // // console.log(result.data.data[0].item);
            // for (let i = 0; i < 6; i++) {
            //       courseInfo.value.push([]);
            //       for (let j = 0; j < 7; j++) {
            //             courseInfo.value[i].push({
            //                   courseName: noCourseName.value,
            //                   classTime: 2 * i + 1,
            //                   weekDay: j + 1,
            //             });
            //       }
            // }

            // //合并数据

            // for (let i = 0; i < courseTempInfo.value.length; i++) {
            //       const item = courseTempInfo.value[i];
            //       for (let j = 0; j < item.length; j++) {
            //             const course = item[j];
            //             let classTime = course.classTime.substring(2, 3) * 1;
            //             let weekDay = course.weekDay * 1;
            //             // console.log("classTime", classTime);
            //             // console.log("weekDay", weekDay);
            //             // console.log(courseInfo.value[i][j]);
            //             // if (
            //             //       classTime == courseInfo.value[i][j].classTime &&
            //             //       weekDay == courseInfo.value[i][j].classWeek
            //             // ) {
            //             //520行代码记录！！！程序员的浪漫，yyds
            //             //       courseInfo.value[i][j] = course;
            //             //       console.log(courseInfo.value[i][j]);
            //             // }
            //             for (let k = 0; k < courseInfo.value.length; k++) {
            //                   const co = courseInfo.value[k];
            //                   let c = co.find(
            //                         (item) =>
            //                               item.weekDay == weekDay &&
            //                               item.classTime == classTime
            //                   );
            //                   if (c) {
            //                         // console.log("c", c);
            //                         // console.log("co", co);
            //                         let index = co.findIndex(
            //                               (item) => item.weekDay == c.weekDay
            //                         );
            //                         // console.log("index", index);
            //                         courseInfo.value[k][index] = course;
            //                         break;
            //                   }
            //             }
            //             /*
            //             总结：
            //             1.先把得到的数据变成表格可绘制的，即一行一行渲染
            //             2.然后查出来重合的哪个元素（要的课程），然后再查这个课程所位于占位表的序号
            //              */
            //       }
            // }
      } else {
            message.error(`加载课程表时出现错误！${result.data.Msg}`);
            console.log(result.data.Msg);
      }
      // console.log("courseTempInfo:", courseTempInfo.value);
      // console.log("courseInfo:", courseInfo.value);
};

//返回首页
const toHomePage = () => {
      router.push("/");
};
</script>

<style lang="scss" scoped>
.blue-background {
      background-color: blue;
}

.classTableWrap {
      padding: 5px;

      .right {
            .selectDate {
                  .select {
                        width: 80px;
                        height: 40px;
                        margin: 10px 0;
                        margin-left: 30px;
                        align-items: center;
                        position: absolute;
                        border: 1px solid #5c7087;
                        color: #5c7087;
                        outline: none;
                        /* 添加滚动条样式 */
                        &::-webkit-scrollbar {
                              width: 1px; /* 滚动条宽度 */
                        }

                        &::-webkit-scrollbar-track {
                              background: #f1f1f1; /* 滚动条背景色 */
                        }

                        &::-webkit-scrollbar-thumb {
                              background: #888; /* 滚动条滑块颜色 */
                              border-radius: 4px; /* 滚动条滑块圆角 */
                        }
                        .date_option {
                              color: #4a5a6d;
                        }
                  }
                  .current_Week {
                        width: 30vw;
                        margin: 10px;
                        margin-left: 60%;
                        display: inline-block;
                        text-align: center;
                        font-size: 16px;
                        border: 1px solid #5c7087;
                        color: #5c7087;

                        .current_Week_num {
                              font-size: 22px;
                              filter: drop-shadow(0px 0px 1px #894e54);
                        }
                  }
            }
            table {
                  background-color: #ffffff;
                  border-collapse: separate;
                  border-spacing: 0;
                  table-layout: fixed; /* 设置表格布局为固定 */
                  tr,
                  td {
                        width: 100px; /* 设置单元格宽度为100px */
                        height: 60px; /* 设置行高为50px */
                  }
                  td {
                        text-overflow: ellipsis;
                  }
            }

            .classTable {
                  .date_select {
                        background-color: #4c4376;
                  }
                  .courseTopInfo {
                        width: 10px;
                        height: 20px;
                  }
                  .courseCell {
                        margin: 5px;
                        font-size: 12px;
                        .courseName {
                              // font-size: 14px;
                              display: block;
                              color: #a2bce0;
                        }
                        .courseClassroomName {
                              display: block;
                              // display: none;
                              color: #beb8eb;
                        }
                  }

                  .courseCell:first {
                        background-color: #4c4376;
                  }
                  tr {
                        th {
                              font-size: 16px;
                              background-color: #5c7087;
                        }

                        .today {
                              background-color: #cf4d6f !important;
                        }

                        .notoday {
                              font-size: 16px;
                        }

                        td {
                              border: 1px solid #76818e;
                        }

                        .noCourse {
                              color: #bab9c2;
                        }

                        .haveCourse {
                              color: #5c7087;
                              cursor: pointer;
                        }
                  }
            }
      }

      .bottom {
            margin-top: 10px;
      }
}

.classDetail {
      width: 60vw;
      height: 60vh;
      font: 100% "cute", serif;
      .classDetailHeader {
            font-size: 12px;
            color: #5e5c6c;
      }

      .classDetailContent {
            width: 100%;
            margin: 0 auto;

            ul {
                  list-style: none;
                  overflow-y: hidden;

                  li {
                        width: 100%;
                        margin: 0 auto;
                        margin-top: 5px;
                        text-align: center;

                        .content_left {
                              font-size: 16px;
                              font-weight: 600;
                              color: #5e5c6c;
                        }

                        .content_right {
                              font-size: 14px;
                              color: #5e5c6c;
                        }
                  }
            }
      }

      .classDetailFooter {
            font-size: 12px;
            color: #5e5c6c;
            margin-bottom: 100%;

            p {
                  height: 30%;
                  width: 100px;
                  display: inline;
                  margin: 0 10px;
            }
      }
}
</style>

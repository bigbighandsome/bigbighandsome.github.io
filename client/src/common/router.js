import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
      {
            path: "/test",
            component: () => import("../views/Test.vue"),
      },
      {
            path: "/",
            name: "index",
            component: () => import("../views/HomePage.vue"),
      },
      {
            path: "/detail",
            name: "Detail",
            component: () => import("../views/Detail.vue"),
      },
      {
            path: "/login",
            name: "adminLogin",
            component: () => import("../views/Login.vue"),
      },
      {
            path: "/mycenter",
            name: "MyCenter",
            component: () => import("../views/MyCenter.vue"),
      },
      {
            path: "/course",
            name: "Course",
            component: () => import("../views/Courses.vue"),
      },
      {
            path: "/somefun",
            name: "Somefun",
            component: () => import("../views/SomeFun.vue"),
      },
      {
            path: "/games",
            name: "Games",
            component: () => import("../views/Games.vue"),
      },
      {
            path: "/dashboard",
            component: () => import("../views/dashBoard/DashBoard.vue"),
            children: [
                  {
                        path: "/dashboard/article",
                        name: "articleAdmin",
                        component: () =>
                              import("../views/dashBoard/ArticleAdmin.vue"),
                  },
                  {
                        path: "/dashboard/category",
                        name: "categoryAdmin",
                        component: () =>
                              import("../views/dashBoard/CategoryAdmin.vue"),
                  },
                  {
                        path: "/dashboard/comment",
                        name: "commentAdmin",
                        component: () =>
                              import("../views/dashBoard/CommentAdmin.vue"),
                  },
            ],
      },
];

const router = createRouter({
      history: createWebHashHistory(),
      routes,
});

export { router, routes };

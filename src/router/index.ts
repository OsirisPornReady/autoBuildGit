import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../page/dashboard.vue"),
    meta: {
      title: "dashboard",
    },
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../page/index.vue"),
        meta: {
          title: "表单页面",
          key: 1
        },
      },
      {
        path: "/list",
        name: "",
        component: () => import("../components/project-list.vue"),
        meta: {
          title: "项目列表",
          key: 2
        },
      }
    ],
    redirect: '/list'
  },
  {
    path: "/page",
    name: "",
    component: () => import("../page/page.vue"),
    meta: {
      title: "测试页面",
    },
  },
  {
    path: "/:pathMatch(.*)*", // 重定向页面地址
    redirect: "/",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

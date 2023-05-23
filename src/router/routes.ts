import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Demo from "@/views/demo/index.vue";
import Login from "@/views/login/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    meta: {
      title: "首页"
    },
    redirect: "Demo",
    children: [
      {
        path: "demo",
        name: "Demo",
        component: Demo,
        meta: {
          title: "主页"
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "工具"
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: Login
  }
];

export default routes;

import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";
import Login from "@/views/login/index.vue";
import Forget from "@/views/forget/index.vue"
import Code from "@/views/login/code/index.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    meta: {
      title: "首页"
    },
    redirect: "Home",
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "主页"
        }
      },
      {
        path: "my",
        name: "My",
        component: () => import("@/views/my/index.vue"),
        meta: {
          title: "我的",
          noCache: true
        }
      },
      {
        path: "bullhorn",
        name: "Bullhorn",
        component: () => import("@/views/bullhorn/index.vue"),
        meta: {
          title: "消息",
          noCache: true
        }
      },
      {
        path: "bullhorn",
        name: "Open",
        component: () => import("@/views/open/index.vue"),
        meta: {
          title: "开门",
          noCache: true
        }
      },
      {
        path: "service",
        name: "Service",
        component: () => import("@/views/service/index.vue"),
        meta: {
          title: "服务",
          noCache: true
        }
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录"
    },
    component: Login
  }, {
    path: "/forget",
    name: "forget",
    meta: {
      title: "忘记密码"
    },
    component: Forget
  }, {
    path: "/code",
    name: "code",
    meta: {
      title: "登录"
    },
    component: Code
  },
];

export default routes;

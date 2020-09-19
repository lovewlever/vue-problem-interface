import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Welcome from "../views/Welcome";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: "/homeMineComponent",
    children: [
      { // 我的页面
        path: "/homeMineComponent",
        name: "HomeMineComponent",
        component: () => import("../components/HomeMineComponent.vue")
      },
      { // 项目列表页面
        path: "/homeProjectListComponent",
        name: "HomeProjectListComponent",
        component: () => import("../components/HomeProjectListComponent.vue")
      },
      { // 项目详情
        path: "/homeProjectDetailsComponent",
        name: "HomeProjectDetailsComponent",
        component: () => import("../components/HomeProjectDetailsComponent.vue")
      },
      { // 创建项目
        path: "/homeCreateProjectComponent",
        name: "HomeCreateProjectComponent",
        component: () => import("../components/HomeCreateProjectComponent.vue")
      },
      { // 项目问题列表
        path: "/homeProblemListComponent",
        name: "HomeProblemListComponent",
        component: () => import("../components/HomeProblemListComponent.vue")
      },
      { // 添加问题到项目
        path: "/homeAddProblemToProjectComponent",
        name: "HomeAddProblemToProjectComponent",
        component: () => import("../components/HomeAddProblemToProjectComponent.vue")
      },
      { // 添加问题到项目
        path: "/homeAddInterfaceToProjectComponent",
        name: "HomeAddInterfaceToProjectComponent",
        component: () => import("../components/HomeAddInterfaceToProjectComponent.vue")
      },
      { // 接口列表
        path: "/homeInterfaceListComponent",
        name: "HomeInterfaceListComponent",
        component: () => import("../components/HomeInterfaceListComponent.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

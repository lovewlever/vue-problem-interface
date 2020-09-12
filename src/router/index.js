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
      { // 创建项目
        path: "/homeCreateProjectComponent",
        name: "HomeCreateProjectComponent",
        component: () => import("../components/HomeCreateProjectComponent.vue")
      },
      { // 项目问题列表
        path: "/homeProblemComponent",
        name: "HomeProblemComponent",
        component: () => import("../components/HomeProblemComponent.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

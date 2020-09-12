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
      {
        path: "/homeMineComponent",
        name: "HomeMineComponent",
        component: () => import("../components/HomeMineComponent.vue")
      },{
        path: "/homeProjectListComponent",
        name: "HomeProjectListComponent",
        component: () => import("../components/HomeProjectListComponent.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

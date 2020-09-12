import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
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
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

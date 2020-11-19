import Vue from "vue";
import VueRouter from "vue-router";
import OpenWeatherMap from "../views/OpenWeatherMap.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "OpenWeatherMap",
    component: OpenWeatherMap
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

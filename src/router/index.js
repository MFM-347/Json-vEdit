import { createRouter, createWebHistory } from "vue-router";
import vHome from "../views/vHome.vue";
import vEditor from "../views/vEditor.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: vHome,
    },
    {
      path: "/editor",
      name: "editor",
      component: vEditor,
    },
  ],
});

export default router;

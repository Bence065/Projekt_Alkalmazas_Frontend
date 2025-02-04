import { createRouter, createWebHistory } from "vue-router";
import ProjectForm from "@/components/ProjectForm.vue";
import ProjectList from "@/components/ProjectList.vue";

const routes = [
  {
    path: "/",
    component: ProjectList
  },
  {
    path: "/projectForm",
    component: ProjectForm
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

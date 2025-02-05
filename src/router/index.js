import { createRouter, createWebHistory } from "vue-router";
import ProjectForm from "@/views/ProjectForm.vue";
import ProjectList from "@/views/ProjectList.vue";

const routes = [
  {
    path: "/",
    component: ProjectList
  },
  {
    path: "/project-form",
    component: ProjectForm
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

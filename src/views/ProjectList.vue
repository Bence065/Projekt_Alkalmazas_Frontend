<script setup>
import ProjectTable from '@/components/ProjectTable.vue';
import { ref, watch, computed } from 'vue';

const searchQuery = ref('');

const loadProjects = () => {
  try {
    const stored = localStorage.getItem('projects');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(error)
    return [];
  }
};

const projects = ref(loadProjects());

const editProject = (index) => {
  projects.value[index].editing = true;
};

const saveProject = (index) => {
  projects.value[index].editing = false;
  localStorage.setItem('projects', JSON.stringify(projects.value));
};

const deleteProject = (index) => {
  projects.value.splice(index, 1);
  localStorage.setItem('projects', JSON.stringify(projects.value));
};

const filteredProjects = computed(() => {
  return projects.value.filter(project =>
    project.projectName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(projects, (newProjects) => {
  try {
    localStorage.setItem('projects', JSON.stringify(newProjects));
  } catch (error) {
    console.error("Hiba a localStorage mentésnél:", error);
  }
});
</script>

<template>
  <h1 class="text-center m-5" v-if="projects.length == 0">Nincs mentett projekt</h1>
  <div v-else>
    <input v-model="searchQuery" placeholder="Keresés" class="form-control m-3 w-25" />
    <ProjectTable 
      :projects="filteredProjects" 
      @edit="editProject" 
      @save="saveProject" 
      @delete="deleteProject"
    />
    <h3 class="text-center m-5" v-if="filteredProjects.length == 0">Keresett projekt nem található</h3>
  </div>
</template>

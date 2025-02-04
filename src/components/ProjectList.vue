<script setup>
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

const formatCurrency = (value) => {
  return new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF' }).format(value);
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
        <input v-model="searchQuery" placeholder="Keresés" class="form-control m-3 w-25">
        <table class="table table-bordered table-striped m-3" >
            <thead>
                <tr>
                    <th>Projekt neve</th>
                    <th>Kezdési dátum</th>
                    <th>Leírás</th>
                    <th>Költségvetés</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in filteredProjects" :key="index">
                    <td class="projectName">
                        <input v-if="item.editing" v-model="item.projectName" class="form-control">
                        <span v-else>{{ item.projectName }}</span>
                    </td>
                    <td>
                        <input v-if="item.editing" 
                               v-model="item.date" 
                               type="date" 
                               class="form-control">
                        <span v-else>{{ item.date }}</span>
                    </td>
                    <td class="description">
                        <textarea v-if="item.editing" v-model="item.description" class="form-control"></textarea>
                        <span v-else>{{ item.description }}</span>
                    </td>
                    <td>
                        <input v-if="item.editing" 
                               v-model="item.budget" 
                               type="number" 
                               min="0"
                               class="form-control">
                        <span v-else>{{ formatCurrency(item.budget) }}</span>
                    </td>
                    <td class="icons">
                        <i v-if="item.editing" @click="saveProject(index)" class="bi bi-floppy-fill m-2" title="Mentés"></i>
                        <i v-else @click="editProject(index)" class="bi bi-wrench m-2" title="Szerkesztés"></i>
                        <i @click="deleteProject(index)" class="bi bi-dash-circle-fill delete" title="Törlés"></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 class="text-center m-5" v-if="filteredProjects.length == 0">Keresett projekt nem található</h3>
    </div>
</template>

<style scoped>
.bi{
    border-radius: 100%;
    font-size: large;
}

.delete{
    color:red
}

.icons{
    min-width:40px;
    max-width:40px;
}

.description{
  max-width: 400px;
}

.table{
    max-width: 98%;
}

.projectName{
    max-width: 100px;
}
</style>
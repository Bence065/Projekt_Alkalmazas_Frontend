<script setup>
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';

const showAlert   = ref(false);

const newProject = ref({
    projectName:"",
    description:"",
    date:"",
    budget:""
});

function addProject() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(newProject.value);
    localStorage.setItem('projects', JSON.stringify(projects));

    showAlert.value = true;

    setTimeout(() => {
        showAlert.value = false;
    }, 3000);
}
</script>

<template>
    <div v-if="showAlert" class="alert alert-success" role="alert">
      Projekt sikeresen elmentve!
    </div>
    <form class="d-flex justify-content-center align-items-center mt-5" @submit.prevent="addProject">
  <div class="border p-4 w-50">
    <h2 class="text-center mb-4">Új projekt hozzáadása</h2>

    <CustomInput v-model="newProject.projectName" label="Projekt neve" type="text" required/>
    <CustomInput v-model="newProject.date" label="Kezdés időpontja" type="date" required/>
    <CustomInput v-model="newProject.description" label="Leírás" type="textbox"/>
    <CustomInput v-model="newProject.budget" label="Költségvetés" type="number" min="0" required/>
    <button type="submit" class="btn btn-primary w-100">Projekt feltöltése</button>
  </div>
</form>

</template>

<style scoped>
.border{
    border: 2px solid black;
    border-radius: 16px;
    box-shadow: 1px 1px 1px 0px;
}

</style>
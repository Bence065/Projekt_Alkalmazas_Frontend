<script setup>
import { ref } from 'vue';

const showAlert = ref(false);

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
        <div class="border w-50">
            <h2 class="text-center m-2">Új projekt hozzáadása</h2>
            <div class="col m-2 form-group">
                <label for="projectName">Projekt neve</label>
                <input
                v-model="newProject.projectName"
                type="text" 
                id="projectName" 
                class="form-control w-100" 
                required>
            </div>
            <div class="col m-2 form-group">
                <label for="projectDescription">Leírás</label>
                <textarea
                v-model="newProject.description"
                type="text" 
                id="projectDescription" 
                class="form-control w-100"
                ></textarea>
            </div>
            <div class="col m-2 form-group">
                <label for="date">Kezdési dátum</label>
                <input 
                v-model="newProject.date"
                type="date" 
                id="date"
                class="form-control w-100"
                required>
            </div>
            <div class="col m-2 form-group">
                <label for="budget">Költségvetés</label>
                <input 
                type="number" 
                min="0" 
                class="form-control w-100"
                v-model="newProject.budget"
                required>
            </div>
            <div class="col m-2 form-group">
                <button type="submit" min="0" class="btn btn-primary w-100">Projekt feltöltése</button>
            </div>
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
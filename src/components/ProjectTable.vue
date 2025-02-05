<script setup>
import { defineProps } from 'vue';

defineProps({
  projects: Array,
  formatCurrency: Function
});
</script>

<template>
    <table class="table table-bordered table-striped m-3">
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
            <tr v-for="(item, index) in projects" :key="index">
                <td class="projectName">
                    <input v-if="item.editing" v-model="item.projectName" class="form-control" />
                    <span v-else>{{ item.projectName }}</span>
                </td>
                <td class="date">
                    <input v-if="item.editing" v-model="item.date" type="date" class="form-control" />
                    <span v-else>{{ item.date }}</span>
                </td>
                <td class="description">
                    <textarea v-if="item.editing" v-model="item.description" class="form-control"></textarea>
                    <span v-else>{{ item.description }}</span>
                </td>
                <td class="budget">
                    <input v-if="item.editing" v-model="item.budget" type="number" min="0" class="form-control" />
                    <span v-else>{{ formatCurrency(item.budget) }}</span>
                </td>
                <td class="icons">
                    <i v-if="item.editing" @click="$emit('save', index)" class="bi bi-floppy-fill m-2" title="Mentés"></i>
                    <i v-else @click="$emit('edit', index)" class="bi bi-wrench m-2" title="Szerkesztés"></i>
                    <i @click="$emit('delete', index)" class="bi bi-dash-circle-fill delete" title="Törlés"></i>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
  @import url("./../assets/css/main.css");
  
</style>
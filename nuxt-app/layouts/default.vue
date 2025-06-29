<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-cart" title="Orders" to="/orders"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true) // Drawer is open by default
</script>

<style>
/* Optional: Add some global styles or layout-specific styles here */
</style>

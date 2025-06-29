<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Dashboard</h1>
        <p>Welcome to the Admin Dashboard.</p>
        <p>Use the navigation drawer to explore different sections.</p>
      </v-col>
    </v-row>
     <v-row>
      <v-col md="6">
        <v-card>
          <v-card-title>Quick Stats</v-card-title>
          <v-card-text>
            <p>Total Orders: 5</p>
            <p>Pending Orders: 2</p>
            <p>Revenue: $846.45</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-card-title>Recent Activity</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>Order #1005 placed</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Order #1003 delivered</v-list-item-title>
              </v-list-item>
               <v-list-item>
                <v-list-item-title>User Jane Smith registered</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// No specific script needed for this simple dashboard page yet
</script>

<style scoped>
h1 {
  margin-bottom: 16px;
}
p {
  margin-bottom: 8px;
}
</style>

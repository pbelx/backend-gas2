<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Orders</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="orders"
          item-key="id"
          class="elevation-1"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getStatusColor(item.status)" dark>{{ item.status }}</v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="viewOrder(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headers = ref([
  { title: 'Order ID', align: 'start', sortable: true, value: 'id' },
  { title: 'Customer', value: 'customerName' },
  { title: 'Date', value: 'date' },
  { title: 'Total', value: 'total' },
  { title: 'Status', value: 'status' },
  { title: 'Actions', value: 'actions', sortable: false },
])

const orders = ref([
  { id: '1001', customerName: 'John Doe', date: '2023-10-26', total: '$150.00', status: 'Processing' },
  { id: '1002', customerName: 'Jane Smith', date: '2023-10-25', total: '$200.50', status: 'Shipped' },
  { id: '1003', customerName: 'Alice Brown', date: '2023-10-24', total: '$75.20', status: 'Delivered' },
  { id: '1004', customerName: 'Bob Johnson', date: '2023-10-23', total: '$300.00', status: 'Cancelled' },
  { id: '1005', customerName: 'Eve Williams', date: '2023-10-22', total: '$120.75', status: 'Processing' },
])

const getStatusColor = (status: string) => {
  if (status === 'Processing') return 'blue'
  if (status === 'Shipped') return 'orange'
  if (status === 'Delivered') return 'green'
  if (status === 'Cancelled') return 'red'
  return 'grey'
}

const viewOrder = (order: any) => {
  // Placeholder for navigating to an order details page or showing a dialog
  console.log('View order:', order)
  alert(`Viewing order: ${order.id}\nCustomer: ${order.customerName}\nTotal: ${order.total}`)
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>

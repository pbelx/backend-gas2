<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Orders</h1>
      </v-col>
    </v-row>

    <v-alert v-if="ordersStore.error" type="error" dense class="mb-4">
      {{ ordersStore.error }}
    </v-alert>

    <v-card>
      <v-card-title>
        All Orders
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="loadOrders" :loading="ordersStore.loading">
          <v-icon left>mdi-refresh</v-icon>
          Refresh
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="ordersStore.orders"
        :loading="ordersStore.loading"
        item-value="id"
        class="elevation-1"
        :server-items-length="ordersStore.pagination?.total || 0"
        :page="currentPage"
        :items-per-page="itemsPerPage"
        @update:page="updatePage"
        @update:items-per-page="updateItemsPerPage"
      >
        <template v-slot:item.customer="{ item }">
          {{ item.customer.firstName }} {{ item.customer.lastName }}
        </template>
        <template v-slot:item.totalAmount="{ item }">
          ${{ item.totalAmount.toFixed(2) }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" small>{{ item.status }}</v-chip>
        </template>
        <template v-slot:item.createdAt="{ item }">
          {{ new Date(item.createdAt).toLocaleDateString() }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="viewOrderDetails(item)">mdi-eye</v-icon>
          <!-- Add more actions like edit or delete if needed -->
        </template>
         <template v-slot:loading>
          <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
        </template>
        <template v-slot:no-data>
          <v-alert type="info" class="ma-4">No orders found.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useOrdersStore } from '~/stores/orders';
import type { Order, OrderStatus } from '~/services/api'; // Import OrderStatus

const ordersStore = useOrdersStore();

const headers = ref([
  { title: 'Order #', key: 'orderNumber', sortable: true },
  { title: 'Customer', key: 'customer', sortable: false }, // Not directly sortable on backend without specific logic
  { title: 'Date', key: 'createdAt', sortable: true },
  { title: 'Total', key: 'totalAmount', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
]);

const currentPage = ref(ordersStore.pagination?.page || 1);
const itemsPerPage = ref(ordersStore.pagination?.limit || 10);


const loadOrders = async () => {
  await ordersStore.fetchOrders({ page: currentPage.value, limit: itemsPerPage.value });
};

onMounted(() => {
  // Fetch orders if they haven't been loaded yet or if pagination is null
  if (!ordersStore.orders.length || !ordersStore.pagination) {
    loadOrders();
  } else {
    // If orders are already in store, update local pagination refs
    currentPage.value = ordersStore.pagination.page;
    itemsPerPage.value = ordersStore.pagination.limit;
  }
});

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING: return 'blue-grey';
    case OrderStatus.CONFIRMED: return 'blue';
    case OrderStatus.ASSIGNED: return 'cyan';
    case OrderStatus.IN_TRANSIT: return 'orange';
    case OrderStatus.DELIVERED: return 'green';
    case OrderStatus.CANCELLED: return 'red';
    default: return 'grey';
  }
};

const viewOrderDetails = (order: Order) => {
  // Placeholder for actual navigation or dialog
  console.log('View order details:', order);
  alert(`Viewing Order: #${order.orderNumber}\nCustomer: ${order.customer.firstName} ${order.customer.lastName}\nTotal: $${order.totalAmount.toFixed(2)}`);
};

const updatePage = (newPage: number) => {
  currentPage.value = newPage;
  loadOrders();
};

const updateItemsPerPage = (newItemsPerPage: number) => {
  itemsPerPage.value = newItemsPerPage;
  currentPage.value = 1; // Reset to first page when items per page changes
  loadOrders();
};

</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>

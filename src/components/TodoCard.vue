<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
    <h1 class="text-xl font-bold text-gray-900 mb-2">{{ todo.todo }}</h1>
    <p v-if="todo.completed" class="text-green-600 font-medium">✓ Completed</p>
    <p v-else class="text-gray-500 italic">Pending</p>
  </div>
</template>

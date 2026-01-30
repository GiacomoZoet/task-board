<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import TodoCard from '@/components/TodoCard.vue'  // Adjust path

const tasks = useTodoStore()

onMounted(() => {
  tasks.getData()
})
</script>

<template>
  <section class="home py-8 px-4">
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TodoCard
          v-for="todo in tasks.todos"
          :key="todo.id"
          :todo="todo"
      />
    </div>
  </section>
</template>

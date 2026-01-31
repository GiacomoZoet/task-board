<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  showAddButton: {
    type: Boolean,
    default: true
  },
  showCompleteButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add-to-todo', 'complete-todo'])

const handleAddTodo = () => {
  console.log('Emitting:', props.todo)
  emit('add-to-todo', props.todo)
}

const handleComplete = () => {
  emit('complete-todo', props.todo)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
    <!-- Todo Title -->
    <h1
        class="text-xl font-semibold mb-3"
        :class="todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'"
    >
      {{ todo.todo }}
    </h1>

    <!-- Status -->
    <div class="mb-4">
      <span
          v-if="todo.completed"
          class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700"
      >
        ✓ Completed
      </span>
      <span
          v-else
          class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600"
      >
        Pending
      </span>
    </div>

    <!-- Buttons -->
    <div class="flex gap-2">
      <!-- Add to Todo Button (Home page only) -->
      <button
          v-if="showAddButton && !todo.completed"
          @click="handleAddTodo"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Add to My Todos
      </button>

      <!-- Complete Button (Workspace only) -->
      <button
          v-if="showCompleteButton && !todo.completed"
          @click="handleComplete"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Complete
      </button>
    </div>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration-thickness: 2px;
}
</style>

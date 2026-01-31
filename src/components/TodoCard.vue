<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-todo'])

const handleAddTodo = () => {
  console.log('Emitting:', props.todo)
  emit('add-to-todo', props.todo)
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all">
    <h1 class="text-xl font-bold text-gray-900 mb-2">{{ todo.todo }}</h1>
    <p v-if="todo.completed" class="text-green-600 font-medium">✓ Completed</p>
    <p v-else class="text-gray-500 italic">Pending</p>
    <button v-if="!todo.completed" @click="handleAddTodo" class="add-btn">
      Add to My Todos
    </button>
  </div>
</template>

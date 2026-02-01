<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import TodoCard from '@/components/TodoCard.vue'
import { getUser, isAuthenticated} from "@/services/authentication.js";
import {addTodo, getTodos, checkTodoExists} from "@/services/todos.js";
import { useToast } from "vue-toastification";
import {useRouter} from "vue-router";
import {getAuth} from "firebase/auth";


const router = useRouter();
const toast = useToast()
const tasks = useTodoStore()
const assignedTask = ref([])
const loading = ref(true)
const error = ref(null)
const filter = ref('all')

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    await tasks.getData()

    const user = getUser()

    if (user.value?.uid) {
      const result = await getTodos(user.value.uid)
      assignedTask.value = result.todos || []
      console.log("Your assigned tasks:", assignedTask.value)
    } else {
      console.log("Not logged in")
    }
  } catch (err) {
    error.value = "Error al cargar las tareas. Por favor, intenta de nuevo."
    console.error("Error loading tasks:", err)
  } finally {
    loading.value = false
  }
})


const filteredTodos = computed(() => {
  if (filter.value === 'all') {
    return tasks.todos
  } else if (filter.value === 'completed') {
    return tasks.todos.filter(todo => todo.completed === true)
  } else if (filter.value === 'pending') {
    return tasks.todos.filter(todo => todo.completed === false)
  } else if (filter.value === 'assigned') {
    return tasks.todos.filter(todo => todo.isInDB === true)
  }
  return tasks.todos
})


const addTodoToList = async (todo) => {
  if (!isAuthenticated()) {
    toast.warning("Please login to add to favourites")
    setTimeout(() => {
      router.push({ path: "/login" })
    }, 1500)
    return
  }

  const user = getUser()

  const alreadyHave = assignedTask.value.find(t => t.id === todo.id)

  if (alreadyHave) {
    toast.warning("You already have this task added to your todos!")
    return
  }

  const exists = await checkTodoExists(todo.id)

  if (exists) {
    toast.warning("This task has already been claimed by another user!")
    return
  }

  const data = {
    id: todo.id,
    todo: todo.todo,
    completed: todo.completed,
    assignedTo: user.value.uid
  }

  const result = await addTodo(user.value.uid, data)

  if (result.ok) {
    toast.success("Task added to todolist.")
    assignedTask.value.push(data)
  } else {
    toast.warning("Failed to add task.")
  }
}


</script>



<template>
  <section class="home py-8 px-4">
    <div class="max-w-4xl mx-auto">

      <div class="mb-6 flex items-center gap-4">
        <label for="filter" class="text-gray-700 font-medium">Filter todos:</label>
        <select
            id="filter"
            v-model="filter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All todos</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned to users</option>
        </select>
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Loading todos...</p>
      </div>


      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-600">{{ error }}</p>
      </div>




      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodoCard
            v-for="todo in filteredTodos"
            :key="todo.id"
            :todo="todo"
            :show-add-button="true"
            :show-complete-button="false"
            @add-to-todo="addTodoToList"
        />
      </div>

      <div v-if="!loading && !error && filteredTodos.length === 0" class="text-center py-8">
        <p class="text-gray-600">No tasks matching the selected filter</p>
      </div>

    </div>
  </section>
</template>

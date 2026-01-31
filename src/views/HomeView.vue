<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '@/stores/TodoStore.js'
import TodoCard from '@/components/TodoCard.vue'
import { getUser, isAuthenticated} from "@/services/authentication.js";
import {addTodo, getTodos, getAllTodos} from "@/services/todos.js";
import { useToast } from "vue-toastification";
import {useRouter} from "vue-router";
import {getAuth} from "firebase/auth";


const router = useRouter();
const toast = useToast()
const tasks = useTodoStore()
const assignedTask = ref([])

onMounted(async () => {
  tasks.getData()
  assignedTask.value = await getAllTodos()
  console.log('HAAAAAA', assignedTask.value.todos)
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

  const data = {
    id: todo.id,
    todo: todo.todo,
    completed: todo.completed,
    assignedTo: user.value.uid
  }


  const result = await addTodo(user.value.uid , data)

  if (result.ok) {
    toast.success("Task added to todolist.")
  } else {
    toast.warning("Failed to add task.")
  }
}


</script>

<template>
  <section class="home py-8 px-4">
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TodoCard
          v-for="todo in tasks.todos"
          :key="todo.id"
          :todo="todo"
          @add-to-todo="addTodoToList"
      />
    </div>
  </section>
</template>

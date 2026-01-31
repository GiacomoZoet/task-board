<script setup>
import {useTodoStore} from "@/stores/TodoStore.js";
import {ref, onMounted} from "vue";
import TodoCard from "@/components/TodoCard.vue";
import {getUser} from "@/services/authentication.js";
import {getTodos, completeTodo} from "@/services/todos.js";
import {getAuth} from "firebase/auth";
import {useToast} from "vue-toastification";

const toast = useToast()
const tasks = ref([]);
const user = getUser();


onMounted(async () => {
  const auth = getAuth()
  console.log("Current user:", auth.currentUser);

  if (!auth.currentUser?.uid) {
    console.log("Not logged in");
    return;
  }

  const result = await getTodos(auth.currentUser.uid)
  console.log("getTodos result:", result);
  tasks.value = result.todos || []
  console.log("tasks.value:", tasks.value);
})


const handleComplete = async (todo) => {
  const result = await completeTodo(todo.id)

  if (result.ok) {
    toast.success("Task completed!")

    const index = tasks.value.findIndex(t => t.id === todo.id)
    if (index !== -1) {
      tasks.value[index].completed = true
    }
  } else {
    toast.error("Failed to complete task")
  }
}

</script>

<template>
  <section class="home py-8 px-4">
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TodoCard
          v-for="todo in tasks"
          :key="todo.id"
          :todo="todo"
          :show-add-button="false"
          :show-complete-button="true"
          @complete-todo="handleComplete"
      />

    </div>
  </section>
</template>

<style scoped>

</style>
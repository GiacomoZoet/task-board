<script setup>
import {useTodoStore} from "@/stores/TodoStore.js";
import {ref, onMounted} from "vue";
import TodoCard from "@/components/TodoCard.vue";
import {getUser} from "@/services/authentication.js";
import {getTodos} from "@/services/todos.js";
import {getAuth} from "firebase/auth";

const tasks = ref([]);
const user = getUser();


onMounted(async () => {
  const auth = getAuth()
  if (!auth.currentUser?.uid) {
    console.log("Not logged in");
    return;
  }

  const result = await getTodos(auth.currentUser.uid)
  tasks.value = result.todos || []
})




</script>

<template>
  <section class="home py-8 px-4">
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TodoCard
          v-for="todo in tasks"
          :key="todo.id"
          :todo="todo"
      />
    </div>
  </section>
</template>

<style scoped>

</style>
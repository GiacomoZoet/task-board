import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useTodoStore = defineStore('Todo', () => {
    let todos = ref([])

    let getData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos')
            console.log('API Response:', response.data)
            console.log('Products:', response.data.todos)
            todos.value = response.data.todos
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment() {
        count.value++
    }
    return { count, doubleCount, increment, getData, todos }
})

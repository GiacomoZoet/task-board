import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { db } from '@/firebase/config.js'
import { collection, getDocs } from 'firebase/firestore'

export const useTodoStore = defineStore('Todo', () => {
    let todos = ref([])

    let getData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/todos')
            const apiTodos = response.data.todos

            const todoCollection = collection(db, 'todo')
            const snapshot = await getDocs(todoCollection)
            const dbTodos = snapshot.docs.map(doc => doc.data())

            todos.value = apiTodos.map(apiTodo => {
                const dbTodo = dbTodos.find(db => db.id === apiTodo.id)
                return {
                    ...apiTodo,
                    completed: dbTodo ? dbTodo.completed : apiTodo.completed,
                    isInDB: !!dbTodo
                }
            })

            console.log('Todos with DB status:', todos.value)
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

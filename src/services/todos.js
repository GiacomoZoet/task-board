import { db } from '../firebase/config.js'
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore'

// Add task to todo list
export const addTodo = async (userId, todo) => {
    try {
        const taskRef = doc(db, 'users', userId, 'todo', todo.id.toString())
        await setDoc(taskRef, todo)
        return { ok: true }
    } catch (error) {
        return { ok: false, error }
    }
}

// Get all user todos
export const getTodos = async (userId) => {
    try {
        const todoCollection = collection(db, 'users', userId, 'todos')
        const snapshot = await getDocs(todoCollection)
        const todos = snapshot.docs.map(doc => doc.data())
        return { ok: true, todos }
    } catch (error) {
        return { ok: false, todos: [] }
    }
}

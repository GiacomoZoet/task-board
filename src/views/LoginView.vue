<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification'
import { login, register, sendEmailVerificationDB } from '@/services/authentication.js'
import { getAuth } from "firebase/auth"

const router = useRouter()
const toast = useToast()
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const loading = ref(false)
const error = ref('')
const success = ref('')
const isRegistered = ref(true)

const auth = getAuth()

const registerUser = async () => {
  error.value = ''
  success.value = ''



  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!'
    toast.error("Passwords do not match!")
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters'
    toast.error('Password must be at least 6 characters')
    return
  }

  loading.value = true

  const result = await register(email.value, password.value)

  if (result.ok) {
    success.value = result.message
    toast.success("User registered successfully.")



    //send email verification
    await sendEmailVerificationDB(result.user.user)
    toast.success("Email verification sent.")

    setTimeout(() => {
      isRegistered.value = true
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
    }, 200)
  }else {
    error.value = result.message
    toast.error("Register email verification failed!")
  }

  loading.value = false


}


const activateSession = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  const result = await login(email.value, password.value)
  try {
    if (!result.user.emailVerified) {
      await auth.signOut()
      error.value = 'Please verify your email before logging in. Check your inbox and spam'
      toast.error('Email not verified. Check your email.')
      email.value = ''
      password.value = ''
      loading.value = false
      return
    }

    if (result.ok) {
      success.value = result.message
      toast.success("User login successfully.")
      setTimeout(() => {
        router.push('/')
      }, 200)
    } else {
      error.value = result.error
      toast.error("Login failed. Please check your credentials.")
      password.value = ''
    }
  } catch (error) {
    error.value = result.error
    toast.error("Login failed. Please check your credentials.")
  }

  loading.value = false

}


</script>

<template>
  <section id="auth">
    <div v-if="isRegistered===false">
      <form @submit.prevent="registerUser">

        <div>
          <label for="email">
            <i></i>email
          </label>
          <input type="email" placeholder="Email" v-model="email" required />
        </div>

        <div>
          <label for="password">
            <i></i>password
          </label>
          <input type="password" placeholder="Password" v-model="password" required />
          <p>Must be at least 6 characters in length</p>
        </div>

        <div>
          <label for="confirmPassword">
            <i></i>Confirm Password
          </label>
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
        </div>

        <button type="submit" :disabled="loading">
          <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
          <i v-else class="fas fa-user-plus mr-2"></i>
          {{ loading ? 'Creating account...' : 'Register' }}
        </button>
        <div>
          <div>
            <p>Already have an account? </p>
            <button @click="isRegistered=true">login</button>
          </div>
        </div>
      </form>

    </div>


    <div v-if="isRegistered===true">
      <form @submit.prevent="activateSession">

        <div>
          <label for="email">
            <i></i>email
          </label>
          <input type="email" placeholder="Email" v-model="email" required />
        </div>

        <div>
          <label for="password">
            <i></i>password
          </label>
          <input type="password" placeholder="Password" v-model="password" required />
        </div>

        <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-lg bg-gray-900 hover:bg-gray-700 px-6 py-3 text-white font-semibold text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
          <i v-else class="fas fa-sign-in-alt mr-2"></i>
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <div class="flex items-center gap-1">
          <p>Dont have an account?</p>
          <button @click="isRegistered=false">Register</button>
        </div>
      </form>

    </div>
  </section>
</template>

<style scoped>

</style>
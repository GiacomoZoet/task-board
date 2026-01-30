<script setup>
import {ref} from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification'
import { login, register, sendEmailVerificationDB } from '@/services/authentication.js'

const router = useRouter()
const toast = useToast()
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const loading = ref(false)
const error = ref('')
const success = ref('')
const isRegistered = ref(false)

const registerUser = async () => {
  error.value = ''
  success.value = ''


}

</script>

<template>
  <section id="auth">
    <div v-if="isRegistered==false">
      <form @submit.prevent="isRegistered">

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
      </form>
      <div>
        <div>
          <p>Already have an account? </p>
          <button @click="isRegistered=true">login</button>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>

</style>
<script setup>
import {ref} from "vue";
import useRouter from "vue-router";
import { useToast } from 'vue-toastification'
import { login, register, sendEmailVerificationDB } from '@/services/authentication.js'
const router = useRouter()
const toast = useToast()
const email = ref("")
const password = ref("")
const confirmPassword = ref("")

</script>

<template>
<h1>AAAAA</h1>
</template>

<style scoped>

</style>
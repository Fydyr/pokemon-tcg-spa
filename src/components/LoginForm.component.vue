<template>
    <n-form ref="formRef" label-width="80" :rules="rules.login" label-placement="top">
        <n-form-item-row label="email">
            <n-input v-model:value="formValue.email" />
        </n-form-item-row>
        <n-form-item-row label="Password">
            <n-input type="password" v-model:value="formValue.password" />
        </n-form-item-row>
        <n-button type="primary" block secondary strong @click="handleLogin">
            Login
        </n-button>
    </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, type FormInst } from 'naive-ui'
import { useUserStore } from '../stores/Users.store'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const formRef = ref<FormInst | null>(null)
const message = useMessage()

const formValue = ref({
    email: '',
    password: ''
})

const rules = {
    login: {
        email: {
            required: true,
            message: 'Please input your email',
            trigger: 'blur'
        },
        password: {
            required: true,
            message: 'Please input your password',
            trigger: 'blur'
        }
    }
}

const handleLogin = () => {
    try {
        if (formValue.value.email && formValue.value.password) {
            userStore.login({
                email: formValue.value.email,
                password: formValue.value.password
            })
            message.success('Success Login.')
            router.push('/deck-builder')
        } else {
            message.error('Please fill in all the required fields.')
        }
    } catch (error) {
        message.error('Error login.')
    }
}
</script>
<template>
    <n-form ref="formRef" label-width="80" :rules="rules.register" label-placement="top">
        <n-form-item-row label="email">
            <n-input v-model:value="formValue.email" />
        </n-form-item-row>
        <n-form-item-row label="Password">
            <n-input type="password" v-model:value="formValue.password" />
        </n-form-item-row>
        <n-form-item-row label="Reenter Password">
            <n-input type="password" v-model:value="formValue.reenterPassword" />
        </n-form-item-row>
        <n-button type="primary" block secondary strong @click="handleRegister">
            Register
        </n-button>
    </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage, type FormInst } from 'naive-ui'
import { useUserStore } from '../stores/Users.store'

const userStore = useUserStore()

const formRef = ref<FormInst | null>(null)
const message = useMessage()

const formValue = ref({
    email: '',
    password: '',
    reenterPassword: ''
})

const rules = {
    register: {
        email: {
            required: true,
            message: 'Please input your email',
            trigger: 'blur'
        },
        password: {
            required: true,
            message: 'Please input your password',
            trigger: 'blur'
        },
        reenterPassword: {
            required: true,
            message: 'Please reenter your password',
            trigger: 'blur'
        },
        passwordMatch: {
            validator: (_rule: any, value: string, callback: (arg0: Error | undefined) => void) => {
                if (value !== formValue.value.password) {
                    callback(new Error('Passwords do not match'))
                } else {
                    callback(undefined)
                }
            },
            trigger: 'blur'
        }
    }
}

const handleRegister = () => {
    try {
        if (formValue.value.email && formValue.value.password && formValue.value.reenterPassword) {
            if (formValue.value.password !== formValue.value.reenterPassword) {
                return console.error('Incorrect password')
            }
            userStore.register({
                email: formValue.value.email,
                password: formValue.value.password
            })
            message.success('Success register.')
        } else {
            message.error('Please fill in all the required fields.')
        }
    } catch (error) {
        message.error('Error register.')
    }
}
</script>
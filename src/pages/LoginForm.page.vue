<template>
  <n-card>
    <n-tabs class="card-tabs" default-value="²" size="large" animated pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;">
      <n-tab-pane name="login" tab="Login">
        <LoginForm />
      </n-tab-pane>
      <n-tab-pane name="register" tab="Register">
        <RegisterForm />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.component.vue'
import RegisterForm from '../components/RegisterForm.component.vue'
</script>

<style scoped></style>
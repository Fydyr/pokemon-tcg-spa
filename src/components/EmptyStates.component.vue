<template>
    <div :class="CSS_CLASSES.EMPTY_STATE">
        <n-spin v-if="isLoading" size="large">
            <template #description>{{ loadingText }}</template>
        </n-spin>

        <n-empty v-else-if="!isAuthenticated" :description="notAuthenticatedText">
            <template #extra>
                <n-button type="primary" @click="$emit('login')">{{ loginButtonText }}</n-button>
            </template>
        </n-empty>

        <n-empty v-else :description="emptyText">
            <template #extra>
                <n-button type="primary" @click="$emit('create')">{{ createButtonText }}</n-button>
            </template>
        </n-empty>
    </div>
</template>

<script setup lang="ts">
import { CSS_CLASSES } from '../constants';

defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    isAuthenticated: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Chargement...'
    },
    notAuthenticatedText: {
        type: String,
        default: 'Veuillez vous connecter pour voir les données'
    },
    emptyText: {
        type: String,
        default: 'Aucune donnée disponible'
    },
    loginButtonText: {
        type: String,
        default: 'Se connecter'
    },
    createButtonText: {
        type: String,
        default: 'Créer'
    }
});

defineEmits(['login', 'create']);
</script>

<style scoped>
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
    text-align: center;
}
</style>
<template>
    <n-modal :show="modelValue" preset="dialog" :title="title" type="warning" :positive-text="confirmText"
        :negative-text="cancelText" @update:show="$emit('update:modelValue', $event)" @positive-click="$emit('confirm')"
        @negative-click="$emit('cancel')">
        <template #icon>
            <div :class="CSS_CLASSES.WARNING_ICON">⚠️</div>
        </template>
        <div :class="CSS_CLASSES.DELETE_CONFIRMATION_CONTENT">
            <p>{{ message }}</p>
            <p :class="CSS_CLASSES.WARNING_TEXT">{{ warningText }}</p>
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { CSS_CLASSES } from '../constants';

defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Confirmer la suppression'
    },
    message: {
        type: String,
        default: 'Êtes-vous sûr de vouloir supprimer cet élément?'
    },
    warningText: {
        type: String,
        default: 'Cette action est irréversible.'
    },
    confirmText: {
        type: String,
        default: 'Supprimer'
    },
    cancelText: {
        type: String,
        default: 'Annuler'
    }
});

defineEmits(['update:modelValue', 'confirm', 'cancel']);
</script>

<style scoped>
.delete-confirmation-content {
    margin: 16px 0;
}

.warning-icon {
    font-size: 24px;
}

.warning-text {
    color: #ff4d4f;
    font-size: 14px;
    margin-top: 8px;
}
</style>
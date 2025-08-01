<template>
    <div class="deck-header-container">
        <n-divider title-placement="left">
            <h2 class="section-title">{{ UI.DECK_TITLE }}</h2>
        </n-divider>

        <div class="auth-status" v-if="isAuthenticated">
            <n-tag type="success" round>
                {{ UI.AUTH_CONNECTED_AS }} {{ userEmail }}
            </n-tag>
        </div>

        <div class="auth-status" v-else>
            <n-tag type="warning" round>
                {{ UI.AUTH_NOT_CONNECTED }}
            </n-tag>
            <n-button round type="info" size="small" @click="$emit('login')">
                {{ UI.AUTH_LOGIN_BUTTON }}
            </n-button>
        </div>

        <div class="deck-header">
            <n-input round v-model:value="deckNameModel" :placeholder="UI.DECK_NAME_PLACEHOLDER"
                class="deck-name-input" />
            <n-button round type="primary" strong @click="$emit('save')" :disabled="!canSave || !isAuthenticated">
                {{ UI.SAVE_DECK_BUTTON }}
            </n-button>
        </div>

        <div class="deck-info" v-if="deckSize > 0">
            <div class="deck-stats">
                <span>{{ deckSize }} {{ UI.POKEMON_COUNT_LABEL }}</span>
                <span>|</span>
                <span>{{ UI.TYPES_COUNT_LABEL }}: {{ typesCount }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DECK_BUILDER_UI as UI } from '../constants';

const props = defineProps({
    isAuthenticated: {
        type: Boolean,
        required: true
    },
    userEmail: {
        type: String,
        default: ''
    },
    deckName: {
        type: String,
        default: ''
    },
    deckSize: {
        type: Number,
        default: 0
    },
    typesCount: {
        type: Number,
        default: 0
    }
});

const emit = defineEmits(['login', 'save', 'update:deckName']);

const deckNameModel = ref(props.deckName);

watch(() => props.deckName, (newVal) => {
    deckNameModel.value = newVal;
});

watch(deckNameModel, (newVal) => {
    emit('update:deckName', newVal);
});

const canSave = computed(() => {
    return deckNameModel.value.trim() !== '' && props.deckSize > 0;
});
</script>

<style scoped>
.deck-header-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section-title {
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
}

.auth-status {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.deck-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 10px;
}

.deck-name-input {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
}

.deck-info {
    margin-bottom: 16px;
    background: white;
    padding: 8px 16px;
    border-radius: 8px;
}

.deck-stats {
    display: flex;
    gap: 12px;
    font-size: 0.9em;
    color: #555;
}
</style>
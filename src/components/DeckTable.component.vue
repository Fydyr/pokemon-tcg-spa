<template>
    <n-card :class="CSS_CLASSES.DECKS_CARD" :bordered="false">
        <template #header>
            <div :class="CSS_CLASSES.CARD_HEADER">
                <span :class="CSS_CLASSES.CARD_TITLE">{{ title }}</span>
                <n-tag v-if="decks.length > 0" type="success" round>{{ decks.length }} deck(s)</n-tag>
            </div>
        </template>

        <div :class="CSS_CLASSES.TABLE_CONTAINER">
            <n-data-table v-if="decks.length > 0" :columns="columns" :data="decks" :bordered="false"
                :single-line="false" striped :class="CSS_CLASSES.DECKS_TABLE" />

            <slot v-else name="empty-state"></slot>
        </div>
    </n-card>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { NButton, NTag } from 'naive-ui';
import { CSS_CLASSES } from '../constants';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    decks: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['show-details', 'delete-deck']);

const columns = [
    {
        title: 'ID',
        key: 'id',
        width: 80
    },
    {
        title: 'Nom du deck',
        key: 'name',
        width: 200,
        render: (row: any) => {
            return h('div', { class: 'deck-name' }, row.name);
        }
    },
    {
        title: 'Nombre de Pokémon',
        key: 'pokemonCount',
        width: 150,
        render: (row: any) => {
            const count = row.pokemonIds ? row.pokemonIds.length : 0;
            return h(NTag, {
                type: count > 0 ? 'success' : 'warning',
                size: 'small',
                round: true
            }, { default: () => `${count} Pokémon` });
        }
    },
    {
        title: 'Actions',
        key: 'actions',
        width: 200,
        render: (row: any) => {
            return h('div', { class: 'action-buttons' }, [
                h(NButton, {
                    type: 'info',
                    size: 'small',
                    round: true,
                    onClick: () => emit('show-details', row)
                }, { default: () => 'Détails' }),
                h(NButton, {
                    type: 'error',
                    size: 'small',
                    round: true,
                    onClick: () => emit('delete-deck', row.id)
                }, { default: () => 'Supprimer' })
            ]);
        }
    }
];
</script>

<style scoped>
.decks-card {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    margin-bottom: 24px;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.card-title {
    font-size: 18px;
    font-weight: bold;
}

.table-container {
    padding: 8px 0;
}

.decks-table {
    width: 100%;
}

.deck-name {
    font-weight: 500;
}

.action-buttons {
    display: flex;
    gap: 8px;
}
</style>
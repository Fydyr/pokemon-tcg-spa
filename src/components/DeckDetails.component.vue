<template>
    <n-modal :show="modelValue" @update:show="$emit('update:modelValue', $event)" preset="card" :title="title"
        :style="{ width: '90%', maxWidth: '1000px' }" :bordered="false" :segmented="true" class="deck-details-modal"
        size="huge">
        <template #header-extra>
            <n-tag v-if="pokemons.length > 0" type="info" round>{{ pokemons.length }} Pokémon</n-tag>
        </template>

        <div :class="CSS_CLASSES.DECK_DETAILS_CONTENT">
            <n-spin v-if="loading" size="large" :description="loadingText"></n-spin>

            <template v-else>
                <!-- Affichage des types uniques présents dans le deck -->
                <div v-if="pokemons.length > 0" :class="CSS_CLASSES.DECK_TYPES_SUMMARY">
                    <div :class="CSS_CLASSES.TYPE_LABEL">{{ typeLabel }}</div>
                    <div :class="CSS_CLASSES.TYPE_TAGS">
                        <n-tag v-for="type in uniqueTypes" :key="type"
                            :color="{ color: getTypeHexColor(type), textColor: getTypeTextColor(type) }" round
                            size="small">
                            {{ type }}
                        </n-tag>
                    </div>
                </div>

                <!-- Grille des Pokémon -->
                <div :class="CSS_CLASSES.POKEMON_GRID">
                    <pokemon-card v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon"
                        :height-label="heightLabel" :weight-label="weightLabel" />
                </div>

                <!-- Message si le deck est vide -->
                <n-empty v-if="pokemons.length === 0" :description="emptyText" />
            </template>
        </div>

        <template #footer>
            <div :class="CSS_CLASSES.MODAL_FOOTER">
                <n-button type="default" @click="$emit('update:modelValue', false)">
                    {{ closeText }}
                </n-button>
            </div>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PokemonCard from './PokemonCard.component.vue';
import { type IPokemon } from '../types/Pokemon.type';
import { CSS_CLASSES, getTypeHexColor, getTypeTextColor } from '../constants';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Détails du deck'
    },
    pokemons: {
        type: Array as () => IPokemon[],
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingText: {
        type: String,
        default: 'Chargement des Pokémon...'
    },
    typeLabel: {
        type: String,
        default: 'Types:'
    },
    heightLabel: {
        type: String,
        default: 'Taille:'
    },
    weightLabel: {
        type: String,
        default: 'Poids:'
    },
    emptyText: {
        type: String,
        default: 'Ce deck ne contient aucun Pokémon'
    },
    closeText: {
        type: String,
        default: 'Fermer'
    }
});

defineEmits(['update:modelValue']);

const uniqueTypes = computed(() => {
    const types = new Set<string>();
    props.pokemons.forEach(pokemon => {
        types.add(pokemon.type.name);
    });
    return Array.from(types);
});
</script>

<style scoped>
.deck-details-content {
    padding: 8px 0;
    min-height: 300px;
}

.deck-types-summary {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.type-label {
    font-weight: bold;
    font-size: 14px;
}

.type-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 16px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}
</style>
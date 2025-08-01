<template>
    <div>
        <n-divider title-placement="left">
            <h2 class="section-title">{{ UI.COLLECTION_TITLE }}</h2>
        </n-divider>

        <div>
            <n-input round :placeholder="UI.SEARCH_PLACEHOLDER" v-model:value="searchModel" class="search-input" />
        </div>

        <div class="pokemon-container">
            <n-grid :x-gap="12" :y-gap="12" cols="1 s:2 m:3 l:4 xl:5 xxl:6" responsive>
                <n-grid-item v-for="pokemon in filteredPokemons" :key="pokemon.id">
                    <n-card :title="pokemon.name" hoverable class="pokemon-card" embedded>
                        <template #cover>
                            <div class="pokemon-cover" :style="getTypeBackgroundColor(pokemon.type.name)"
                                @click="$emit('add', pokemon)">
                                <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-image">
                                <div class="pokemon-type-badge" :style="getTypeColor(pokemon.type.name)">
                                    {{ pokemon.type.name }}
                                    <div class="pokemon-hp">
                                        <span>❤️</span>
                                        <span>{{ pokemon.lifePoints }} PV</span>
                                    </div>
                                </div>
                                <div class="add-badge">
                                    <span>+</span>
                                </div>
                            </div>
                        </template>

                        <div class="pokemon-brief-details">
                            <div class="pokemon-name">{{ pokemon.attack.name }}</div>
                            <div class="pokemon-hp">
                                <span>❤️</span>
                                <span>{{ pokemon.attack.damages }} PV</span>
                            </div>
                        </div>
                        <n-button strong secondary round type="info" @click.stop="$emit('view-details', pokemon)">
                            {{ UI.DETAILS_BUTTON }}
                        </n-button>
                    </n-card>
                </n-grid-item>
            </n-grid>

            <n-empty v-if="filteredPokemons.length === 0 && !isLoading" :description="UI.EMPTY_SEARCH" />

            <n-spin v-if="isLoading" size="large" class="loading-spinner" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { type IPokemon } from '../types/Pokemon.type';
import { DECK_BUILDER_UI as UI } from '../constants';
import { getTypeColor, getTypeBackgroundColor } from '../constants/pokemon-types';

const props = defineProps({
    pokemons: {
        type: Array as () => IPokemon[],
        default: () => []
    },
    searchQuery: {
        type: String,
        default: ''
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['add', 'view-details', 'update:searchQuery']);

const searchModel = ref(props.searchQuery);

watch(() => props.searchQuery, (newVal) => {
    searchModel.value = newVal;
});

watch(searchModel, (newVal) => {
    emit('update:searchQuery', newVal);
});

const filteredPokemons = computed(() => {
    if (!searchModel.value) {
        return props.pokemons;
    }

    const query = searchModel.value.toLowerCase().trim();
    return props.pokemons.filter(pokemon => {
        return (
            pokemon.name.toLowerCase().includes(query) ||
            pokemon.type.name.toLowerCase().includes(query) ||
            pokemon.attack.name.toLowerCase().includes(query) ||
            pokemon.pokedexId.toString().includes(query)
        );
    });
});
</script>

<style scoped>
.section-title {
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
}

.search-input {
    margin-bottom: 16px;
}

.pokemon-container {
    padding: 20px;
    position: relative;
    background-color: #f4f4f4;
    border-radius: 16px;
}

.pokemon-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 16px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.pokemon-cover {
    position: relative;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}

.add-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(72, 199, 116, 0.8);
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
}

.pokemon-cover:hover .add-badge {
    opacity: 1;
    transform: scale(1.1);
}

.pokemon-type-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
    max-height: 200px;
    max-width: 200px;
    object-fit: contain;
}

.pokemon-brief-details {
    text-align: center;
    padding: 10px;
    background-color: #f9f9f9;
}

.pokemon-name {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 5px;
    color: #333;
}

.pokemon-hp {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: #666;
}

.loading-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
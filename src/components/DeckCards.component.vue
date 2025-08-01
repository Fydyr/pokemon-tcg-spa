<template>
    <div class="deck-cards-container">
        <template v-if="pokemonList.length > 0">
            <n-scrollbar style="max-height: 250px;">
                <div class="deck-cards">
                    <n-card v-for="(pokemon, index) in pokemonList" :key="`deck-${pokemon.id}-${index}`"
                        class="pokemon-mini-card" @click="$emit('remove', index)">
                        <div class="pokemon-mini-content" :style="getTypeBackgroundColor(pokemon.type.name)">
                            <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-mini-image">
                            <div class="pokemon-mini-info">
                                <span class="pokemon-mini-name">{{ pokemon.name }}</span>
                                <span class="pokemon-mini-type" :style="getTypeColor(pokemon.type.name)">
                                    {{ pokemon.type.name }}
                                </span>
                            </div>
                            <div class="pokemon-mini-hp">
                                <span>❤️</span>
                                <span>{{ pokemon.lifePoints }} PV</span>
                            </div>
                            <div class="remove-badge">
                                <span>✕</span>
                            </div>
                        </div>
                    </n-card>
                </div>
            </n-scrollbar>
        </template>
        <n-empty v-else :description="UI.EMPTY_DECK" />
    </div>
</template>

<script setup lang="ts">
import { type IPokemon } from '../types/Pokemon.type';
import { DECK_BUILDER_UI as UI } from '../constants';
import { getTypeColor, getTypeBackgroundColor } from '../constants/pokemon-types';

const props = defineProps({
    pokemonList: {
        type: Array as () => IPokemon[],
        default: () => []
    }
});

defineEmits(['remove']);
</script>

<style scoped>
.deck-cards-container {
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.deck-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    padding: 8px 0;
}

.pokemon-mini-card {
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: white;
    border: 2px solid transparent;
    position: relative;
}

.pokemon-mini-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    border-color: #ff6b6b;
}

.pokemon-mini-content {
    height: 150px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
}

.pokemon-mini-image {
    max-height: 80px;
    max-width: 80px;
    object-fit: contain;
}

.pokemon-mini-info {
    margin-top: 8px;
    text-align: center;
    width: 100%;
}

.pokemon-mini-name {
    font-weight: bold;
    font-size: 0.9em;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    display: block;
}

.pokemon-mini-type {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 0.7em;
    margin-top: 4px;
    text-transform: uppercase;
    font-weight: bold;
}

.pokemon-mini-hp {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 0.8em;
    background: rgba(255, 255, 255, 0.8);
    padding: 2px 5px;
    border-radius: 10px;
    color: #333;
}

.remove-badge {
    position: absolute;
    top: 5px;
    left: 5px;
    background: rgba(255, 0, 0, 0.7);
    color: white;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.2s;
}

.pokemon-mini-card:hover .remove-badge {
    opacity: 1;
}
</style>
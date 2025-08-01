<template>
    <div :class="CSS_CLASSES.POKEMON_CARD" :style="getTypeBackgroundColor(pokemon.type.name)">
        <div :class="CSS_CLASSES.POKEMON_CARD_INNER">
            <div :class="CSS_CLASSES.POKEMON_HEADER">
                <span :class="CSS_CLASSES.POKEMON_ID">#{{ pokemon.pokedexId }}</span>
                <span :class="CSS_CLASSES.POKEMON_HP">❤️ {{ pokemon.lifePoints }} PV</span>
            </div>

            <div :class="CSS_CLASSES.POKEMON_IMAGE_CONTAINER">
                <img :src="pokemon.imageUrl" :alt="pokemon.name" :class="CSS_CLASSES.POKEMON_IMAGE" />
            </div>

            <div :class="CSS_CLASSES.POKEMON_INFO">
                <h4>{{ pokemon.name }}</h4>
                <div :class="CSS_CLASSES.POKEMON_TYPE" :style="getTypeColor(pokemon.type.name)">
                    {{ pokemon.type.name }}
                </div>
                <div :class="CSS_CLASSES.POKEMON_STATS">
                    <div :class="CSS_CLASSES.STAT">
                        <span :class="CSS_CLASSES.STAT_LABEL">{{ heightLabel }}</span>
                        <span :class="CSS_CLASSES.STAT_VALUE">{{ pokemon.height }}m</span>
                    </div>
                    <div :class="CSS_CLASSES.STAT">
                        <span :class="CSS_CLASSES.STAT_LABEL">{{ weightLabel }}</span>
                        <span :class="CSS_CLASSES.STAT_VALUE">{{ pokemon.weight }}kg</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type IPokemon } from '../types/Pokemon.type';
import { CSS_CLASSES, getTypeColor, getTypeBackgroundColor } from '../constants';

defineProps({
    pokemon: {
        type: Object as () => IPokemon,
        required: true
    },
    heightLabel: {
        type: String,
        default: 'Taille:'
    },
    weightLabel: {
        type: String,
        default: 'Poids:'
    }
});
</script>

<style scoped>
.pokemon-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 300px;
    animation: fadeIn 0.3s ease-out;
    animation-fill-mode: both;
}

.pokemon-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.pokemon-card-inner {
    height: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
}

.pokemon-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.pokemon-id {
    font-weight: bold;
    opacity: 0.8;
    font-size: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 2px 6px;
    border-radius: 10px;
}

.pokemon-hp {
    font-weight: bold;
    font-size: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 2px 6px;
    border-radius: 10px;
}

.pokemon-image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
}

.pokemon-image {
    max-width: 120px;
    max-height: 120px;
    object-fit: contain;
    transition: transform 0.3s ease;
}

.pokemon-card:hover .pokemon-image {
    transform: scale(1.1);
}

.pokemon-info {
    margin-top: auto;
    text-align: center;
}

.pokemon-info h4 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.pokemon-type {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.pokemon-stats {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 8px;
}

.stat {
    text-align: center;
    flex: 1;
}

.stat-label {
    display: block;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.9);
}

.stat-value {
    display: block;
    font-weight: bold;
    font-size: 14px;
    color: white;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
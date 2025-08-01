<template>
    <n-modal :show="modelValue" @update:show="$emit('update:modelValue', $event)" preset="card"
        :title="pokemon ? pokemon.name : 'Détails du Pokémon'" :style="{
            width: '600px',
            borderRadius: '20px',
            background: pokemon ? getTypeGradient(pokemon.type.name) : 'white'
        }" class="pokemon-details-modal" responsive>
        <template #default v-if="pokemon">
            <div class="pokemon-modal-content">
                <div class="pokemon-modal-header">
                    <img :src="pokemon.imageUrl" :alt="pokemon.name" class="pokemon-modal-image" />
                    <div class="pokemon-modal-type-badge" :style="getTypeColor(pokemon.type.name)">
                        {{ pokemon.type.name }}
                    </div>
                    <n-button type="primary" size="small" class="modal-add-button" @click="$emit('add', pokemon)">
                        {{ UI.ADD_TO_DECK_BUTTON }}
                    </n-button>
                </div>

                <n-descriptions :column="2" size="medium" bordered label-placement="left"
                    class="pokemon-details-description" responsive>
                    <n-descriptions-item label="Name">
                        {{ pokemon.name }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Pokedex ID">
                        #{{ pokemon.pokedexId }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Type">
                        {{ pokemon.type.name }}
                    </n-descriptions-item>
                    <n-descriptions-item label="PV">
                        {{ pokemon.lifePoints }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Attack">
                        {{ pokemon.attack.name }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Dammage">
                        {{ pokemon.attack.damages }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Type of attack">
                        {{ pokemon.attack.type.name }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Weakness">
                        {{ pokemon.weakness.name }}
                    </n-descriptions-item>
                    <n-descriptions-item :label="TEXT.POKEMON_STATS_HEIGHT">
                        {{ pokemon.height }}m
                    </n-descriptions-item>
                    <n-descriptions-item :label="TEXT.POKEMON_STATS_WEIGHT">
                        {{ pokemon.weight }}kg
                    </n-descriptions-item>
                </n-descriptions>
            </div>
        </template>
    </n-modal>
</template>

<script setup lang="ts">
import { type IPokemon } from '../types/Pokemon.type';
import { DECK_BUILDER_UI as UI, UI_TEXT as TEXT } from '../constants';
import { getTypeColor, getTypeGradient } from '../constants/pokemon-types';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    pokemon: {
        type: Object as () => IPokemon | null,
        default: null
    }
});

defineEmits(['update:modelValue', 'add']);
</script>

<style scoped>
.pokemon-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}

.pokemon-modal-header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.modal-add-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.pokemon-modal-image {
    max-width: 250px;
    max-height: 250px;
    object-fit: contain;
    z-index: 1;
}

.pokemon-modal-type-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 2;
}

.pokemon-details-description {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    overflow: hidden;
}

.pokemon-details-modal :deep(.n-card-title) {
    color: white;
    text-align: center;
    font-weight: bold;
}
</style>
import { defineStore } from "pinia";
import { ref } from 'vue';
import { GetAllPokemon, GetPokemonById } from '../apis/Pokemon.api';
import { type IPokemon } from '../types/Pokemon.type';

export const usePokemonStore = defineStore('Pokemon', () => {
    const pokemons = ref<IPokemon[]>([]);

    const getAllPokemon = async () => {
        try {
            const response = await GetAllPokemon();
            pokemons.value = response;
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération des pokemons :', error);
            throw error;
        }
    }

    const getPokemonById = async (id: number) => {
        try {
            const response = await GetPokemonById(id);
            return response;
        } catch (error) {
            console.error('Erreur lors de la récupération du pokemon :', error);
            throw error;
        }
    }

    return { pokemons, getAllPokemon, getPokemonById };
});
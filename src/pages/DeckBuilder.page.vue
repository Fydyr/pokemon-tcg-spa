<template>
  <div class="deck-builder-container">
    <div class="deck-section">
      <deck-header :is-authenticated="userStore.isAuthenticated" :user-email="userStore.currentUserEmail"
        :deck-name="deckName" @update:deck-name="deckName = $event" :deck-size="deckPokemon.length"
        :types-count="uniqueTypesCount" @login="goToLogin" @save="saveDeck" />

      <deck-cards :pokemon-list="deckPokemon" @remove="removePokemonFromDeck" />
    </div>

    <pokemon-collection :pokemons="pokemonList" :search-query="searchQuery" @update:search-query="searchQuery = $event"
      :is-loading="isLoading" @add="addPokemonToDeck" @view-details="openPokemonDetails" />

    <pokemon-details-modal :model-value="showPokemonModal" @update:model-value="showPokemonModal = $event"
      :pokemon="selectedPokemon" @add="addPokemonToDeck" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { usePokemonStore } from '../stores/Pokemons.store';
import { useUserStore } from '../stores/Users.store';
import { useRouter } from 'vue-router';
import { postDeck } from '../apis/Pokemon.api';
import { type IPokemon } from '../types/Pokemon.type';
import { DECK_BUILDER_UI as UI } from '../constants';

// Import des composants
import DeckHeader from '../components/DeckHeader.component.vue';
import DeckCards from '../components/DeckCards.component.vue';
import PokemonCollection from '../components/PokemonCollection.component.vue';
import PokemonDetailsModal from '../components/PokemonDetailsModal.component.vue';

const pokemonStore = usePokemonStore();
const userStore = useUserStore();
const router = useRouter();
const message = useMessage();

const isLoading = ref(true);
const showPokemonModal = ref(false);
const selectedPokemon = ref<IPokemon | null>(null);
const searchQuery = ref('');
const deckName = ref('');
const deckPokemon = ref<IPokemon[]>([]);

const uniqueTypesCount = computed(() => {
  const typeSet = new Set();
  deckPokemon.value.forEach(pokemon => {
    typeSet.add(pokemon.type.name);
  });
  return typeSet.size;
});

const pokemonList = computed(() => pokemonStore.pokemons);

const addPokemonToDeck = (pokemon: IPokemon) => {
  const isPokemonInDeck = deckPokemon.value.some(p => p.id === pokemon.id);

  if (isPokemonInDeck) {
    message.warning(UI.ALREADY_IN_DECK(pokemon.name));
    return;
  }

  deckPokemon.value.push(pokemon);
  message.success(UI.ADDED_TO_DECK(pokemon.name));

  if (showPokemonModal.value && selectedPokemon.value && selectedPokemon.value.id === pokemon.id) {
    showPokemonModal.value = false;
  }
};

const removePokemonFromDeck = (index: number) => {
  const removedPokemon = deckPokemon.value[index];
  deckPokemon.value.splice(index, 1);
  message.info(UI.REMOVED_FROM_DECK(removedPokemon.name));
};

const openPokemonDetails = (pokemon: IPokemon) => {
  selectedPokemon.value = pokemon;
  showPokemonModal.value = true;
};

const goToLogin = () => {
  router.push('/login');
};

const saveDeck = async () => {
  if (deckName.value.trim() === '' || deckPokemon.value.length === 0) {
    message.warning(UI.MISSING_DECK_NAME);
    return;
  }

  if (!userStore.isAuthenticated) {
    message.warning(UI.MUST_BE_LOGGED_IN);
    return;
  }

  try {
    const deckData = {
      name: deckName.value,
      pokemonIds: deckPokemon.value.map(pokemon => pokemon.id)
    };

    const response = await postDeck(deckData);

    message.success(UI.DECK_SAVED_SUCCESS(deckName.value));
    deckName.value = '';
    deckPokemon.value = [];

  } catch (error) {
    message.error('Erreur lors de la sauvegarde du deck');
    console.error('Erreur de sauvegarde:', error);
  }
};

const loadPokemon = async () => {
  try {
    isLoading.value = true;
    await pokemonStore.getAllPokemon();
  } catch (error) {
    message.error(UI.POKEMON_LOADING_ERROR);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await loadPokemon();
});
</script>

<style scoped>
.deck-builder-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.deck-section {
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <div class="deck-collection-container">
    <!-- En-tête de page -->
    <header-section :title="UI_TEXT.PAGE_TITLE" :subtitle="UI_TEXT.PAGE_SUBTITLE" />

    <!-- Tableau des decks -->
    <deck-table :title="UI_TEXT.DECKS_CARD_TITLE" :decks="userDecks" @show-details="showDeckDetails"
      @delete-deck="openDeleteConfirmation">
      <template #empty-state>
        <empty-states :is-loading="isLoading" :is-authenticated="userStore.isAuthenticated"
          :loading-text="UI_TEXT.EMPTY_STATE_LOADING" :not-authenticated-text="UI_TEXT.EMPTY_STATE_NOT_AUTHENTICATED"
          :empty-text="UI_TEXT.EMPTY_STATE_NO_DECKS" :login-button-text="UI_TEXT.BUTTON_LOGIN"
          :create-button-text="UI_TEXT.BUTTON_CREATE_DECK" @login="navigateToLogin" @create="navigateToDeckBuilder" />
      </template>
    </deck-table>

    <!-- Modal de confirmation de suppression -->
    <delete-confirmation :model-value="showDeleteConfirmModal" @update:model-value="showDeleteConfirmModal = $event"
      :title="UI_TEXT.DELETE_CONFIRM_TITLE" :message="UI_TEXT.DELETE_CONFIRM_MESSAGE"
      :warning-text="UI_TEXT.DELETE_CONFIRM_WARNING" :confirm-text="UI_TEXT.DELETE_CONFIRM_ACCEPT"
      :cancel-text="UI_TEXT.DELETE_CONFIRM_CANCEL" @confirm="confirmDeleteDeck" @cancel="cancelDeleteDeck" />

    <!-- Modal de détails du deck -->
    <deck-details :model-value="showDeckDetailsModal" @update:model-value="showDeckDetailsModal = $event"
      :title="selectedDeckName" :pokemons="deckPokemons" :loading="loadingDeckDetails"
      :loading-text="LOADING_MESSAGES.DECK_DETAILS" :type-label="UI_TEXT.DECK_TYPES_LABEL"
      :height-label="UI_TEXT.POKEMON_STATS_HEIGHT" :weight-label="UI_TEXT.POKEMON_STATS_WEIGHT"
      :empty-text="UI_TEXT.EMPTY_STATE_NO_POKEMON" :close-text="UI_TEXT.BUTTON_CLOSE" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { getDeckList } from '../apis/Pokemon.api';
import { useUserStore } from '../stores/Users.store';
import { usePokemonStore } from '../stores/Pokemons.store';
import type { IPokemon } from '../types/Pokemon.type';
import { useRouter } from 'vue-router';

import HeaderSection from '../components/HeaderSection.component.vue';
import DeckTable from '../components/DeckTable.component.vue';
import EmptyStates from '../components/EmptyStates.component.vue';
import DeleteConfirmation from '../components/DeleteConfirmation.component.vue';
import DeckDetails from '../components/DeckDetails.component.vue';

import {
  UI_TEXT,
  MESSAGES,
  LOADING_MESSAGES,
  deleteDeck
} from '../constants';

const userStore = useUserStore();
const pokemonStore = usePokemonStore();
const message = useMessage();
const router = useRouter();

const decks = ref<any[]>([]);
const isLoading = ref(true);
const showDeleteConfirmModal = ref(false);
const showDeckDetailsModal = ref(false);
const selectedDeckId = ref<number | null>(null);
const selectedDeckName = ref<string>('');
const deckPokemons = ref<IPokemon[]>([]);
const loadingDeckDetails = ref(false);

const userDecks = computed(() => {
  if (!userStore.isAuthenticated) return [];
  return decks.value;
});

const loadDecks = async () => {
  try {
    isLoading.value = true;
    const response = await getDeckList();
    decks.value = response;
  } catch (error) {
    console.error('Erreur lors du chargement des decks:', error);
    message.error(MESSAGES.ERROR_LOAD_DECKS);
  } finally {
    isLoading.value = false;
  }
};

const openDeleteConfirmation = (deckId: number) => {
  selectedDeckId.value = deckId;

  const deck = decks.value.find(d => d.id === deckId);
  selectedDeckName.value = deck ? deck.name : 'ce deck';

  showDeleteConfirmModal.value = true;
};

const confirmDeleteDeck = async () => {
  if (selectedDeckId.value === null) return;

  try {
    await deleteDeck(selectedDeckId.value);
    message.success(MESSAGES.SUCCESS_DECK_DELETED(selectedDeckName.value));
    await loadDecks();
  } catch (error) {
    console.error('Erreur lors de la suppression du deck:', error);
    message.error(MESSAGES.ERROR_DELETE_DECK);
  } finally {
    showDeleteConfirmModal.value = false;
    selectedDeckId.value = null;
  }
};

const cancelDeleteDeck = () => {
  showDeleteConfirmModal.value = false;
  selectedDeckId.value = null;
};

const showDeckDetails = async (deck: any) => {
  selectedDeckName.value = deck.name || UI_TEXT.DECK_DETAILS_TITLE;
  loadingDeckDetails.value = true;
  showDeckDetailsModal.value = true;

  try {
    if (deck.pokemonIds && deck.pokemonIds.length > 0) {
      deckPokemons.value = [];

      const pokemons = [];
      for (const id of deck.pokemonIds) {
        try {
          const pokemon = await pokemonStore.getPokemonById(id);
          pokemons.push(pokemon);
        } catch (err) {
          console.error(MESSAGES.ERROR_POKEMON_LOAD(id), err);
        }
      }

      deckPokemons.value = pokemons;
    } else {
      deckPokemons.value = [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du deck:', error);
    message.error(MESSAGES.ERROR_LOAD_DECK_DETAILS);
  } finally {
    loadingDeckDetails.value = false;
  }
};

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToDeckBuilder = () => {
  router.push('/deck-builder');
};

onMounted(async () => {
  if (userStore.isAuthenticated) {
    await loadDecks();
  }
});
</script>

<style scoped>
.deck-collection-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>